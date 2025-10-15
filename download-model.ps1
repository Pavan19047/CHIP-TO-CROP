# Tomato Model Download Script
# Run this script from a network where the download is not blocked

$modelUrl = "http://assets.laboro.ai.s3.amazonaws.com/laborotomato/laboro_tomato_48ep.pth"
$modelPath = "LaboroTomato\models\laboro_tomato_48ep.pth"
$expectedSize = 170000000  # ~170 MB

Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  Tomato Detection Model Downloader" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Check if model already exists
if (Test-Path $modelPath) {
    $existingFile = Get-Item $modelPath
    $size = $existingFile.Length
    
    Write-Host "Model file already exists!" -ForegroundColor Yellow
    Write-Host "  Path: $modelPath" -ForegroundColor Gray
    Write-Host "  Size: $($size / 1MB) MB" -ForegroundColor Gray
    Write-Host ""
    
    if ($size -lt 100000000) {
        Write-Host "⚠️  Warning: File appears corrupted (too small)" -ForegroundColor Red
        $response = Read-Host "Delete and re-download? (y/n)"
        if ($response -eq 'y') {
            Remove-Item $modelPath -Force
            Write-Host "✓ Deleted corrupted file" -ForegroundColor Green
        } else {
            Write-Host "Exiting..." -ForegroundColor Gray
            exit
        }
    } else {
        Write-Host "✓ Model file looks good!" -ForegroundColor Green
        exit
    }
}

# Create directory if it doesn't exist
$modelDir = Split-Path $modelPath -Parent
if (-not (Test-Path $modelDir)) {
    New-Item -ItemType Directory -Path $modelDir -Force | Out-Null
    Write-Host "✓ Created directory: $modelDir" -ForegroundColor Green
}

Write-Host "Starting download..." -ForegroundColor Cyan
Write-Host "  From: $modelUrl" -ForegroundColor Gray
Write-Host "  To: $modelPath" -ForegroundColor Gray
Write-Host "  Expected size: ~170 MB" -ForegroundColor Gray
Write-Host ""

try {
    # Download with progress
    $ProgressPreference = 'Continue'
    
    Write-Host "Downloading... (this may take several minutes)" -ForegroundColor Yellow
    Invoke-WebRequest -Uri $modelUrl -OutFile $modelPath -UserAgent "Mozilla/5.0" -TimeoutSec 300
    
    # Verify download
    if (Test-Path $modelPath) {
        $downloadedFile = Get-Item $modelPath
        $downloadedSize = $downloadedFile.Length
        
        Write-Host ""
        Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Green
        Write-Host "  Download Complete!" -ForegroundColor Green
        Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Green
        Write-Host ""
        Write-Host "✓ Model saved to: $modelPath" -ForegroundColor Green
        Write-Host "✓ File size: $($downloadedSize / 1MB) MB" -ForegroundColor Green
        
        if ($downloadedSize -lt 100000000) {
            Write-Host ""
            Write-Host "⚠️  WARNING: File size is smaller than expected!" -ForegroundColor Red
            Write-Host "   Expected: ~170 MB" -ForegroundColor Red
            Write-Host "   Downloaded: $($downloadedSize / 1MB) MB" -ForegroundColor Red
            Write-Host "   The file may be corrupted or incomplete." -ForegroundColor Red
        } else {
            Write-Host ""
            Write-Host "Next steps:" -ForegroundColor Cyan
            Write-Host "  1. Start the Next.js server: npm run dev" -ForegroundColor White
            Write-Host "  2. Open: http://localhost:3000/dashboard/tomatoes" -ForegroundColor White
            Write-Host "  3. Upload a tomato image" -ForegroundColor White
        }
    }
    
} catch {
    Write-Host ""
    Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Red
    Write-Host "  Download Failed!" -ForegroundColor Red
    Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Red
    Write-Host ""
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    
    # Check for specific errors
    if ($_.Exception.Message -match "403|Forbidden") {
        Write-Host "❌ Access Denied (403 Forbidden)" -ForegroundColor Red
        Write-Host ""
        Write-Host "This is likely due to:" -ForegroundColor Yellow
        Write-Host "  • Corporate firewall blocking the download" -ForegroundColor White
        Write-Host "  • Network security restrictions" -ForegroundColor White
        Write-Host "  • Sophos or similar web filter" -ForegroundColor White
        Write-Host ""
        Write-Host "Solutions:" -ForegroundColor Cyan
        Write-Host "  1. Run this script from a different network (home, mobile hotspot)" -ForegroundColor White
        Write-Host "  2. Contact IT to whitelist: assets.laboro.ai.s3.amazonaws.com" -ForegroundColor White
        Write-Host "  3. Download on another device and transfer via USB" -ForegroundColor White
        Write-Host "  4. Visit https://laboro.ai for alternative download" -ForegroundColor White
    } elseif ($_.Exception.Message -match "timeout") {
        Write-Host "❌ Connection Timeout" -ForegroundColor Red
        Write-Host ""
        Write-Host "The download took too long. Try:" -ForegroundColor Yellow
        Write-Host "  • Check your internet connection" -ForegroundColor White
        Write-Host "  • Run the script again" -ForegroundColor White
        Write-Host "  • Use a faster network connection" -ForegroundColor White
    } else {
        Write-Host "❌ Unknown Error" -ForegroundColor Red
        Write-Host ""
        Write-Host "Try:" -ForegroundColor Yellow
        Write-Host "  • Check your internet connection" -ForegroundColor White
        Write-Host "  • Run the script again" -ForegroundColor White
        Write-Host "  • Download manually in browser" -ForegroundColor White
    }
    
    Write-Host ""
    Write-Host "Manual download URL:" -ForegroundColor Cyan
    Write-Host "  $modelUrl" -ForegroundColor White
    Write-Host ""
    Write-Host "Save to:" -ForegroundColor Cyan
    Write-Host "  $((Get-Location).Path)\$modelPath" -ForegroundColor White
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
