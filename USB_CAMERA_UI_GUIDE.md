# 🎥 USB Camera Feature - Visual Guide

## **New Interface Overview**

```
┌─────────────────────────────────────────────────────────────────────┐
│  USB CAMERA DETECTION                                               │
│  Real-time tomato and fruit detection using USB camera             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  📷 Camera Device                              🔄 Refresh          │
│  ┌──────────────────────────────────────────────────────┐          │
│  │ USB Camera (046d:0825) ▼                             │          │
│  └──────────────────────────────────────────────────────┘          │
│  2 cameras detected                                                │
│                                                                     │
│  🎯 Detection Mode                                                 │
│  ┌──────────────────────────────────────────────────────┐          │
│  │ 🍅 Tomato (Specialized) ▼                            │          │
│  └──────────────────────────────────────────────────────┘          │
│                                                                     │
│  📹 Camera Feed                                                    │
│  ┌──────────────────────────────────────────────────────┐          │
│  │ 🔴 LIVE                          🟢 ANALYZING        │          │
│  │                                                       │          │
│  │                                                       │          │
│  │              [VIDEO STREAM]                          │          │
│  │                                                       │          │
│  │                                                       │          │
│  └──────────────────────────────────────────────────────┘          │
│                                                                     │
│  ☑ Enable Real-time Analysis              [⏹ Stop]                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## **Camera Selection Dropdown**

```
┌────────────────────────────────────────┐
│ Camera Device                     ▼    │
├────────────────────────────────────────┤
│ ✓ USB Camera (046d:0825)               │  ← Selected (USB camera)
│   Integrated Camera                    │  ← Built-in webcam
│   Logitech HD Pro C920                 │  ← Another USB camera
│   USB Video Capture Device             │  ← Capture card
└────────────────────────────────────────┘
```

---

## **Status Indicators**

### **1. Live Streaming**
```
┌─────────────────────────────────────┐
│ 🔴 LIVE                             │  ← Top-left badge
│                                     │
│         [VIDEO STREAM]              │
│                                     │
└─────────────────────────────────────┘
```

### **2. Analyzing**
```
┌─────────────────────────────────────┐
│ 🔴 LIVE        🟢 ANALYZING         │  ← Both badges shown
│                                     │
│         [VIDEO STREAM]              │
│                                     │
└─────────────────────────────────────┘
```

### **3. Processing**
```
┌─────────────────────────────────────┐
│                                     │
│      ⏳ Analyzing Frame...          │  ← Overlay during processing
│      Processing detections          │
│                                     │
└─────────────────────────────────────┘
```

### **4. Camera Stopped**
```
┌─────────────────────────────────────┐
│                                     │
│      📷 Camera Stopped              │
│      [▶️ Start Camera]              │  ← Button to restart
│                                     │
└─────────────────────────────────────┘
```

### **5. Permission Denied**
```
┌─────────────────────────────────────┐
│      ❌ Camera Access Required      │
│                                     │
│   Please enable camera permissions  │
│   in your browser settings          │
│                                     │
│      [🔄 Retry Permission]          │
└─────────────────────────────────────┘
```

---

## **Control Buttons**

### **Footer Controls**
```
┌─────────────────────────────────────────────────────────┐
│  ☑ Enable Real-time Analysis          [⏹ Stop]         │
│                                                          │
│  🟢 Analysis enabled • 🔴 Camera streaming              │
└─────────────────────────────────────────────────────────┘
```

### **Refresh Button**
```
┌──────────────────────────────────────────────┐
│ Camera Device                  [🔄 Refresh]  │  ← Rescan devices
└──────────────────────────────────────────────┘
```

---

## **Detection Results Panel**

```
┌─────────────────────────────────────────────────────────────┐
│  DETECTION RESULTS                                          │
│  Successfully detected 5 tomatoes                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                  │
│  │  5   │  │  3   │  │  2   │  │  2   │                  │
│  │Total │  │ Ripe │  │Unripe│  │Types │                  │
│  └──────┘  └──────┘  └──────┘  └──────┘                  │
│                                                             │
│  Detailed Analysis                                          │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ b_fully_ripened                    95.3% │ │  │  │  │  │
│  │ Type: Tomato • Ripe                                  │  │
│  └─────────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ b_half_ripened                     87.1% │ │  │  │  │  │
│  │ Type: Tomato • Unripe                                │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  CAPTURED FRAME                                             │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐  │
│  │                                                       │  │
│  │            [ANALYZED IMAGE]                          │  │
│  │                                                       │  │
│  └─────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## **User Flow Diagram**

```
START
  │
  ├─► Connect USB Camera
  │
  ├─► Browser requests permission
  │    │
  │    ├─► [ALLOW] ─────► Camera detected
  │    │                   │
  │    └─► [DENY] ──────► Error message + Retry button
  │
  ├─► Select camera from dropdown
  │    │
  │    └─► Camera stream starts automatically
  │
  ├─► Select detection mode (Tomato/Fruits)
  │
  ├─► Enable real-time analysis toggle
  │    │
  │    └─► Analysis runs every 5 seconds
  │         │
  │         ├─► Capture frame
  │         ├─► Send to API
  │         ├─► Display results
  │         └─► Loop
  │
  ├─► View detection results in real-time
  │
  └─► Stop camera or disable analysis
       │
       └─► Stream cleanup automatically
```

---

## **Error States**

### **No Cameras Detected**
```
┌─────────────────────────────────────┐
│ Camera Device                  ▼    │
├─────────────────────────────────────┤
│ ⚠️ No cameras detected             │
└─────────────────────────────────────┘

💡 Check USB connection
💡 Install camera drivers
💡 Click Refresh button
```

### **Camera In Use**
```
┌─────────────────────────────────────────────────────┐
│ ⚠️ Camera error: Device in use                     │
│                                                      │
│ The camera may be in use by another application.   │
│ Close other apps and try again.                    │
└─────────────────────────────────────────────────────┘
```

### **Permission Required**
```
┌─────────────────────────────────────────────────────┐
│ 🔐 Camera access is required                        │
│                                                      │
│ Please enable camera permissions in your browser    │
│ settings and refresh the page.                      │
│                                                      │
│           [🔄 Retry Permission]                     │
└─────────────────────────────────────────────────────┘
```

---

## **Mobile View (Responsive)**

```
┌─────────────────────────────┐
│  USB CAMERA DETECTION       │
├─────────────────────────────┤
│                             │
│  📷 Camera Device      🔄   │
│  [USB Camera ▼]             │
│                             │
│  🎯 Detection Mode          │
│  [🍅 Tomato ▼]              │
│                             │
│  📹 Camera Feed             │
│  ┌─────────────────────┐   │
│  │ 🔴 LIVE             │   │
│  │                     │   │
│  │   [VIDEO STREAM]    │   │
│  │                     │   │
│  └─────────────────────┘   │
│                             │
│  ☑ Enable Analysis          │
│  [⏹ Stop]                   │
│                             │
├─────────────────────────────┤
│  DETECTION RESULTS          │
├─────────────────────────────┤
│  [Results panel]            │
└─────────────────────────────┘
```

---

## **Color Coding**

### **Status Colors**
- 🔴 **Red**: Live streaming indicator
- 🟢 **Green**: Analyzing/active detection
- 🔵 **Blue**: Info/statistics
- 🟡 **Amber**: Warning states
- ⚫ **Gray**: Inactive/disabled

### **Detection Quality**
- 🟢 **Green border**: Excellent (Fully ripened)
- 🟡 **Amber border**: Good (Half ripened)
- 🔴 **Red border**: Fair (Green/Unripe)

---

## **Interactive Elements**

### **Clickable**
- Camera device dropdown
- Detection mode dropdown
- Analysis toggle switch
- Refresh button
- Stop button
- Start camera button
- Retry permission button

### **Hover States**
- Buttons: Scale + color change
- Dropdowns: Border highlight
- Cards: Shadow lift

### **Disabled States**
- Dropdowns: Gray + no interaction
- Buttons: Reduced opacity
- Toggle: Gray + locked

---

## **Animation & Feedback**

### **Loading Animations**
```
⏳ Spinning loader during:
- Permission request
- Camera initialization
- Frame analysis
```

### **Live Animations**
```
🔴 Pulsing dot in Live badge
   (breathe animation)
```

### **Transition Effects**
```
✨ Smooth transitions:
- Panel slides
- Button hovers
- Status changes
- Error displays
```

---

## **Keyboard Shortcuts** (Future Enhancement)

```
Space    : Toggle analysis on/off
S        : Stop/Start camera
R        : Refresh devices
C        : Capture frame manually
Esc      : Stop camera and analysis
```

---

## **Accessibility Features**

```
✅ ARIA labels on all controls
✅ Keyboard navigation support
✅ Screen reader friendly
✅ High contrast indicators
✅ Clear focus states
✅ Descriptive error messages
```

---

**🎨 Professional, intuitive, and user-friendly interface!**

*The USB camera integration provides a seamless experience with clear visual feedback at every step.*
