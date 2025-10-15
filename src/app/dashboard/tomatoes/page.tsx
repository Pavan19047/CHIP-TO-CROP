import { Metadata } from "next";
import { TomatoDetector } from "@/components/tomato/tomato-detector";

export const metadata: Metadata = {
  title: "Tomato Ripeness",
  description: "Detect tomato ripeness and cultivar types using the Laboro dataset model.",
};

export default function TomatoDetectionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Tomato Ripeness Detection</h1>
        <p className="text-muted-foreground">
          Upload a tomato image to identify ripeness stage and cultivar family (Desi, Hybrid, Cherry, Laboro).
        </p>
      </div>
      <TomatoDetector />
    </div>
  );
}
