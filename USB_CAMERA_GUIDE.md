# 🎥 USB Camera Integration Guide

## **Overview**

The live feed analysis has been upgraded to support **USB cameras** with advanced device selection, real-time streaming, and automated detection capabilities.

---

## ✨ **New Features**

### 1. **USB Camera Detection**
- ✅ Automatically detects all connected USB cameras
- ✅ Lists available camera devices with labels
- ✅ Prioritizes USB cameras over built-in webcams
- ✅ Hot-plug support (detects when cameras are connected/disconnected)

### 2. **Camera Selection**
- ✅ Dropdown menu to select from multiple cameras
- ✅ Refresh button to scan for new devices
- ✅ Displays device count
- ✅ Shows camera labels/names

### 3. **Enhanced Streaming**
- ✅ HD video support (1920x1080 ideal resolution)
- ✅ 30 FPS frame rate
- ✅ Start/Stop camera controls
- ✅ Live indicator when streaming
- ✅ Switch between cameras without page reload

### 4. **Real-time Analysis**
- ✅ Automated detection every 5 seconds
- ✅ Toggle switch to enable/disable analysis
- ✅ Visual feedback during analysis
- ✅ Results display with statistics
- ✅ Frame capture and storage

### 5. **User Experience**
- ✅ Clear error messages
- ✅ Permission request handling
- ✅ Loading states and indicators
- ✅ Professional UI with status badges
- ✅ Responsive design

---

## 🛠️ **Technical Implementation**

### **New Hook: `useUSBCamera`**

Location: `src/hooks/use-usb-camera.ts`

#### Features:
```typescript
// Camera device management
- refreshDevices(): Scan for connected cameras
- devices: List of available camera devices
- selectedDevice: Currently active camera ID

// Camera streaming
- startCamera(deviceId?): Start video stream
- stopCamera(): Stop video stream
- switchCamera(deviceId): Change to different camera
- isStreaming: Current streaming status

// Frame capture
- captureFrame(): Capture current frame as base64 image
- videoRef: Reference to video element
- canvasRef: Reference to canvas (for drawing)

// Error handling
- hasPermission: Camera permission status
- error: Current error message
```

### **Updated Component: `LiveCameraAnalyzer`**

Location: `src/components/dashboard/live-camera-analyzer.tsx`

#### Improvements:
- Uses `useUSBCamera` hook for device management
- Camera selection dropdown with device list
- Refresh button to rescan devices
- Start/Stop camera controls
- Live status indicator
- Analysis status badge
- Enhanced error display
- Better loading states

---

## 📋 **How to Use**

### **1. Connect USB Camera**

1. **Plug in your USB camera** to the computer
2. **Open the application** in your browser
3. Navigate to **Live Camera** section

### **2. Grant Camera Permissions**

When prompted:
- Click **"Allow"** to grant camera access
- The application will scan for available cameras

### **3. Select Camera**

1. Open the **"Camera Device"** dropdown
2. Choose your USB camera from the list
3. Camera will start streaming automatically

### **4. Switch Cameras**

To switch between multiple cameras:
1. Click the camera dropdown
2. Select a different device
3. Stream switches immediately

### **5. Enable Real-time Analysis**

1. Select **"Detection Mode"** (Tomato or All Fruits)
2. Toggle **"Enable Real-time Analysis"** switch
3. Analysis runs every 5 seconds automatically
4. Results appear on the right panel

### **6. Stop Camera**

- Click the **"Stop"** button to stop streaming
- Or disable the analysis toggle
- Camera releases automatically when leaving page

---

## 🔧 **Troubleshooting**

### **"No cameras detected"**

**Possible causes:**
- USB camera not connected
- Camera drivers not installed
- Camera in use by another application
- Browser doesn't have camera access

**Solutions:**
1. Check USB connection
2. Install camera drivers
3. Close other apps using the camera
4. Grant browser camera permissions
5. Click **"Refresh"** button to rescan

### **"Camera access is required"**

**Solution:**
1. Check browser address bar for permission icon
2. Click and allow camera access
3. Refresh the page
4. Click **"Retry Permission"** button

### **"Camera error: Device in use"**

**Solution:**
- Close other applications using the camera
- Close other browser tabs with camera access
- Restart your browser
- Unplug and replug the USB camera

### **"Failed to access camera devices"**

**Solution:**
1. Check if camera is properly connected
2. Try a different USB port
3. Restart your computer
4. Check camera drivers in Device Manager (Windows)
5. Test camera in another application

### **Camera list shows but stream won't start**

**Solution:**
1. Try selecting a different camera
2. Click **"Refresh"** to rescan devices
3. Stop and restart the camera
4. Check camera resolution settings
5. Try a different browser (Chrome recommended)

---

## 🎯 **Best Practices**

### **Camera Quality**
- Use HD USB cameras for best detection results
- Ensure good lighting conditions
- Position camera to show tomatoes clearly
- Avoid reflections and glare

### **Performance**
- Close unnecessary applications
- Use Chrome or Edge for best compatibility
- Ensure stable USB connection
- Use USB 3.0 port for HD cameras

### **Detection Accuracy**
- Keep tomatoes in focus
- Maintain consistent lighting
- Position camera at appropriate distance
- Avoid camera shake

---

## 💻 **Browser Compatibility**

### **Fully Supported:**
✅ Chrome 80+ (Recommended)
✅ Edge 80+
✅ Firefox 75+
✅ Safari 14+
✅ Opera 67+

### **Features:**
- ✅ Multiple camera selection
- ✅ Device enumeration
- ✅ HD video streaming
- ✅ Hot-plug detection
- ✅ Permissions API

---

## 🔐 **Privacy & Security**

### **Data Handling:**
- Camera stream processes **locally in browser**
- Frames sent to **server only for detection**
- No video recording or storage
- Automatic stream cleanup on page leave

### **Permissions:**
- Browser requests camera permission
- User must explicitly allow access
- Permissions can be revoked anytime
- No background camera access

---

## 📊 **Technical Specifications**

### **Video Stream:**
```javascript
Constraints:
- Device: Specific USB camera (by ID)
- Resolution: 1920x1080 (ideal)
- Frame Rate: 30 FPS (ideal)
- Audio: Disabled
```

### **Detection:**
```javascript
Analysis Interval: 5 seconds
Image Format: JPEG (base64)
Quality: 95%
Processing: Server-side (Python backend)
```

### **Supported Cameras:**
- USB webcams (UVC compliant)
- External USB cameras
- Capture cards with camera input
- Professional USB cameras
- Built-in laptop cameras

---

## 🚀 **Advanced Features**

### **Multiple Camera Support**
The system can handle multiple USB cameras simultaneously:
- Switch between cameras in real-time
- Each camera has unique device ID
- No conflicts between devices
- Hot-swap support

### **Device Labels**
Camera devices show with descriptive names:
```
✅ "USB Camera (046d:0825)" - External USB camera
✅ "Integrated Camera" - Built-in laptop camera
✅ "Capture Card - USB Video" - HDMI capture device
```

### **Auto-Selection Logic**
Prioritizes devices in this order:
1. USB cameras (with "USB" in label)
2. External cameras
3. Non-integrated cameras
4. First available device

---

## 📈 **Performance Optimization**

### **Resource Management:**
- Automatic stream cleanup
- Canvas reuse for captures
- Efficient frame extraction
- Optimized interval timing

### **Memory Management:**
- Proper stream disposal
- Canvas cleanup
- Event listener removal
- Reference cleanup on unmount

---

## 🎨 **UI/UX Improvements**

### **Visual Indicators:**
- 🔴 **Live Badge** - Red indicator when streaming
- 🟢 **Analyzing Badge** - Green when analyzing
- ⏸️ **Stopped State** - Clear stopped message
- ⚠️ **Error Display** - User-friendly error messages

### **Status Messages:**
- "Requesting camera access..." - Initial permission
- "Live" - Active streaming
- "Analyzing Frame..." - Processing detection
- "Camera Stopped" - Stream not active
- "No cameras detected" - No devices found

---

## 📱 **Mobile Support**

While primarily designed for desktop USB cameras, the system also supports:
- Mobile device cameras (front/back)
- Tablet cameras
- Device camera switching
- Touch-friendly controls

---

## 🔄 **Updates & Changes**

### **Version 2.0 - USB Camera Support**

**New:**
- USB camera detection and selection
- Multiple camera support
- Device hot-plug detection
- Enhanced error handling
- Professional UI updates

**Improved:**
- Better permission handling
- Clearer status indicators
- Responsive camera controls
- Error message clarity
- Performance optimization

**Fixed:**
- Camera cleanup on unmount
- Memory leak issues
- Permission retry flow
- Device label display

---

## 📞 **Support**

### **Common Questions:**

**Q: Can I use multiple cameras at once?**
A: You can switch between cameras, but only one streams at a time for analysis.

**Q: Does this work with wireless cameras?**
A: Only cameras recognized as USB/media devices by the browser.

**Q: What resolution is recommended?**
A: 1920x1080 (Full HD) for best detection accuracy.

**Q: Can I record the video?**
A: Currently, only frame captures are stored for detection analysis.

**Q: Does this work offline?**
A: Camera streaming works offline, but detection requires server connection.

---

## 🎉 **Benefits**

### **For Users:**
- ✅ Professional USB camera support
- ✅ Easy camera switching
- ✅ Clear visual feedback
- ✅ Automatic detection
- ✅ Reliable performance

### **For Developers:**
- ✅ Reusable hook component
- ✅ Type-safe implementation
- ✅ Comprehensive error handling
- ✅ Clean resource management
- ✅ Well-documented code

---

**🎥 Your live feed analysis is now USB camera-ready!**

*For additional help, check the browser console for detailed error messages.*
