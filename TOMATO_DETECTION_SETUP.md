# 🍅 Tomato Detection Setup Guide

## Current Status

✅ **Completed:**
- Python virtual environment (mmdet-env) with Python 3.10
- All dependencies installed (PyTorch 2.1.0, mmcv 2.1.0, mmdet 3.3.0)
- Next.js frontend with tomato detection page
- API endpoint configured
- Python inference script ready

⚠️ **Pending:**
- Model checkpoint file (~170 MB) needs to be downloaded

---

## Quick Start

### 1. Download the Model File

The model file is currently blocked by network firewall. You need to:

**Option A: Different Network**
1. Download from another network (home WiFi, mobile hotspot, etc.)
2. URL: `http://assets.laboro.ai.s3.amazonaws.com/laborotomato/laboro_tomato_48ep.pth`
3. Save to: `LaboroTomato\models\laboro_tomato_48ep.pth`
4. File size should be ~170 MB

**Option B: Contact IT**
1. Ask your network administrator to whitelist:
   - Domain: `assets.laboro.ai.s3.amazonaws.com`
   - URL: `http://assets.laboro.ai.s3.amazonaws.com/laborotomato/laboro_tomato_48ep.pth`

**Option C: Alternative Source**
1. Visit https://laboro.ai
2. Request model file access through their contact form
3. Check if they have Google Drive or alternative hosting

### 2. Verify Model File

Once downloaded, verify:
```powershell
Get-Item "LaboroTomato\models\laboro_tomato_48ep.pth" | Select-Object Name, Length
```

Should show: ~170,000,000 bytes (170 MB)

### 3. Start the Application

The Next.js server should already be running. If not:
```powershell
npm run dev
```

### 4. Access Tomato Detection

Open your browser:
```
http://localhost:3000/dashboard/tomatoes
```

### 5. Upload an Image

1. Click the upload area or "Upload Image" button
2. Select a tomato image
3. Wait for processing
4. View results:
   - Bounding boxes on image
   - Classification (ripe/unripe)
   - Tomato types (desi, hybrid, cherry, labro)
   - Summary statistics

---

## Testing the System

### Test Python Script Directly

```powershell
# Activate virtual environment
.\mmdet-env\Scripts\Activate.ps1

# Test with an image
python LaboroTomato\tomato_inference.py --image "path\to\tomato.jpg"
```

Expected output:
```json
{
  "detections": [...],
  "summary": {
    "total": 5,
    "ripe": 3,
    "unripe": 2,
    "types": {...}
  }
}
```

---

## Troubleshooting

### Model Download Fails

**Error:** "403 Forbidden" or "Connection reset"
- **Cause:** Network firewall blocking download
- **Solution:** Use different network or contact IT

**Error:** "Incomplete download"
- **Cause:** Connection interrupted
- **Solution:** Script will auto-retry 5 times

**Error:** "Model file corrupted"
- **Cause:** Previous incomplete download
- **Solution:** Delete the file and re-download

### Python Import Errors

**Error:** "ModuleNotFoundError: No module named 'mmdet'"
- **Cause:** Virtual environment not activated
- **Solution:**
  ```powershell
  .\mmdet-env\Scripts\Activate.ps1
  ```

**Error:** "ImportError: DLL load failed"
- **Cause:** Incompatible package versions
- **Solution:** Packages already configured correctly, restart terminal

### API Errors

**Error:** "Python executable not found"
- **Cause:** Path issue in API route
- **Solution:** Code already configured with absolute paths

**Error:** "Inference failed"
- **Cause:** Model file missing or corrupted
- **Solution:** Download valid model file

---

## System Architecture

```
User Browser
    ↓
Next.js Frontend (React)
    ↓
API Route (/api/tomatoes/detect)
    ↓
Python Subprocess
    ↓
MMDetection + PyTorch
    ↓
Mask R-CNN Model
    ↓
JSON Results
    ↓
Frontend Display
```

---

## Technical Details

### Model Information
- **Architecture:** Mask R-CNN with ResNet-50 FPN backbone
- **Training:** 48 epochs on Laboro Tomato dataset
- **Performance:** 64.3 bbox AP, 65.7 mask AP
- **Classes:** 6 (b_fully_ripened, b_half_ripened, b_green, l_fully_ripened, l_half_ripened, l_green)

### Classification Mapping
```
b_fully_ripened → desi, ripe
b_half_ripened  → desi, unripe
b_green         → hybrid, unripe
l_fully_ripened → cherry, ripe
l_half_ripened  → labro, unripe
l_green         → labro, unripe
```

### Dependencies
- **Python:** 3.10
- **PyTorch:** 2.1.0 (CPU)
- **mmcv:** 2.1.0 (with compiled extensions)
- **mmdet:** 3.3.0
- **numpy:** 1.26.4

---

## File Locations

```
CHIP TO CROP/
├── mmdet-env/                          # Python virtual environment
├── mmdetection/                        # MMDetection library
├── LaboroTomato/
│   ├── models/
│   │   └── laboro_tomato_48ep.pth     # ⚠️ NEEDS TO BE DOWNLOADED
│   ├── config_example/                 # Model configuration
│   └── tomato_inference.py             # Inference script
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   └── tomatoes/
│   │   │       └── page.tsx            # Frontend page
│   │   └── api/
│   │       └── tomatoes/
│   │           └── detect/
│   │               └── route.ts        # API endpoint
│   └── components/
│       └── tomato-detection.tsx        # React component
└── TOMATO_DETECTION_SETUP.md          # This file
```

---

## Manual Model Download Methods

### Method 1: PowerShell (if not blocked)
```powershell
$url = "http://assets.laboro.ai.s3.amazonaws.com/laborotomato/laboro_tomato_48ep.pth"
$output = "LaboroTomato\models\laboro_tomato_48ep.pth"
Invoke-WebRequest -Uri $url -OutFile $output
```

### Method 2: Browser
1. Open: http://assets.laboro.ai.s3.amazonaws.com/laborotomato/laboro_tomato_48ep.pth
2. Save as: `laboro_tomato_48ep.pth`
3. Move to: `LaboroTomato\models\`

### Method 3: wget (Git Bash)
```bash
wget http://assets.laboro.ai.s3.amazonaws.com/laborotomato/laboro_tomato_48ep.pth -O LaboroTomato/models/laboro_tomato_48ep.pth
```

---

## Support

- **Laboro.AI:** https://laboro.ai
- **MMDetection:** https://github.com/open-mmlab/mmdetection
- **Dataset Info:** https://github.com/laboroai/LaboroTomato

---

## Next Steps

1. ✅ Download model file (~170 MB)
2. ✅ Verify file size and location
3. ✅ Test Python script directly
4. ✅ Test via web interface
5. ✅ Upload tomato images
6. ✅ Review detection results

**Once the model file is in place, everything else is ready to work!**
