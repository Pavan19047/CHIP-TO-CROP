import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import os from "os";
import { randomUUID } from "crypto";
import { spawn } from "child_process";

export const runtime = "nodejs";

interface PythonResult {
  stdout: string;
}

async function runPython(imagePath: string): Promise<PythonResult> {
  const projectRoot = process.cwd();
  let pythonExecutable = path.join(projectRoot, "mmdet-env", "Scripts", "python.exe");
  const scriptPath = path.join(projectRoot, "LaboroTomato", "tomato_inference.py");

  try {
    await fs.access(pythonExecutable);
  } catch {
    pythonExecutable = process.platform === "win32" ? "python.exe" : "python3";
  }

  try {
    await fs.access(scriptPath);
  } catch {
    throw new Error("tomato_inference.py script is missing");
  }

  const venvPath = path.join(projectRoot, "mmdet-env");
  const venvScripts = path.join(venvPath, "Scripts");
  const venvSitePackages = path.join(venvPath, "Lib", "site-packages");

  const env = {
    ...process.env,
    PYTHONPATH: [
      path.join(projectRoot, "mmdetection"),
      venvSitePackages,
      process.env.PYTHONPATH || "",
    ]
      .filter(Boolean)
      .join(path.delimiter),
    PATH: `${venvScripts}${path.delimiter}${process.env.PATH || ""}`,
    VIRTUAL_ENV: venvPath,
  };

  return new Promise((resolve, reject) => {
    // Create a bootstrap script that sets up sys.path and __file__ before importing
    // Escape backslashes for Python string literals
    const mmdetectionPath = path.join(projectRoot, "mmdetection").replace(/\\/g, "\\\\");
    const venvSitePackagesEscaped = venvSitePackages.replace(/\\/g, "\\\\");
    const scriptPathEscaped = scriptPath.replace(/\\/g, "\\\\");
    const imagePathEscaped = imagePath.replace(/\\/g, "\\\\");
    
    // Set up sys.path, sys.argv, and __file__ global before executing the script
    // Use UTF-8 encoding to avoid UnicodeDecodeError on Windows
    const pythonCode = `import sys; sys.path.insert(0, r"${mmdetectionPath}"); sys.path.insert(0, r"${venvSitePackagesEscaped}"); sys.argv = ["${scriptPathEscaped}", "--image", "${imagePathEscaped}"]; __file__ = "${scriptPathEscaped}"; exec(compile(open(r"${scriptPathEscaped}", encoding="utf-8").read(), "${scriptPathEscaped}", "exec"))`;
    
    const args = ["-c", pythonCode];
    const subprocess = spawn(pythonExecutable, args, { env });

    let stdout = "";
    let stderr = "";

    subprocess.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    subprocess.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    subprocess.on("close", (code) => {
      if (code === 0) {
        resolve({ stdout });
      } else {
        reject(new Error(stderr || `Python process exited with code ${code}`));
      }
    });

    subprocess.on("error", (error) => {
      reject(error);
    });
  });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "tomato-"));
  const safeName = `${randomUUID()}-${file.name.replace(/\s+/g, "_")}`;
  const tempPath = path.join(tempDir, safeName);

  try {
    await fs.writeFile(tempPath, buffer);
    const { stdout } = await runPython(tempPath);

    let payload: unknown;
    try {
      // Extract JSON from stdout (in case there are other messages)
      // Look for the JSON object starting with { and ending with }
      const jsonMatch = stdout.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error(`No JSON found in output: ${stdout}`);
      }
      payload = JSON.parse(jsonMatch[0]);
    } catch (error) {
      throw new Error(`Failed to parse Python output: ${stdout}`);
    }

    return NextResponse.json(payload);
  } catch (error) {
    console.error("Tomato detection error", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Inference failed" },
      { status: 500 }
    );
  } finally {
    try {
      await fs.rm(tempPath, { force: true });
      await fs.rm(tempDir, { recursive: true, force: true });
    } catch (cleanupError) {
      console.warn("Failed to clean temp files", cleanupError);
    }
  }
}
