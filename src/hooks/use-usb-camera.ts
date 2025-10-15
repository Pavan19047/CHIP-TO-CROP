'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export interface CameraDevice {
  deviceId: string;
  label: string;
  kind: MediaDeviceKind;
}

export interface UseUSBCameraReturn {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  devices: CameraDevice[];
  selectedDevice: string | null;
  isStreaming: boolean;
  hasPermission: boolean | null;
  error: string | null;
  startCamera: (deviceId?: string) => Promise<void>;
  stopCamera: () => void;
  switchCamera: (deviceId: string) => Promise<void>;
  captureFrame: () => string | null;
  refreshDevices: () => Promise<void>;
}

export function useUSBCamera(): UseUSBCameraReturn {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [devices, setDevices] = useState<CameraDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Get list of available camera devices
  const refreshDevices = useCallback(async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        setError('Camera API not supported in this browser');
        setHasPermission(false);
        return;
      }

      // Request permission first to get device labels
      await navigator.mediaDevices.getUserMedia({ video: true });
      
      const allDevices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = allDevices.filter(
        (device) => device.kind === 'videoinput'
      ) as CameraDevice[];

      setDevices(videoDevices);
      setHasPermission(true);
      setError(null);

      // Auto-select first USB camera if available
      if (videoDevices.length > 0 && !selectedDevice) {
        // Prioritize USB cameras (usually have more descriptive labels)
        const usbCamera = videoDevices.find(
          (device) => 
            device.label.toLowerCase().includes('usb') ||
            device.label.toLowerCase().includes('camera') ||
            !device.label.toLowerCase().includes('integrated')
        );
        setSelectedDevice(usbCamera?.deviceId || videoDevices[0].deviceId);
      }
    } catch (err) {
      console.error('Error enumerating devices:', err);
      setError('Failed to access camera devices. Please grant camera permissions.');
      setHasPermission(false);
    }
  }, [selectedDevice]);

  // Start camera stream
  const startCamera = useCallback(async (deviceId?: string) => {
    try {
      // Stop any existing stream
      stopCamera();

      const targetDeviceId = deviceId || selectedDevice;
      if (!targetDeviceId) {
        await refreshDevices();
        return;
      }

      const constraints: MediaStreamConstraints = {
        video: {
          deviceId: { exact: targetDeviceId },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: { ideal: 30 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsStreaming(true);
        setError(null);
        setSelectedDevice(targetDeviceId);
      }
    } catch (err) {
      console.error('Error starting camera:', err);
      setError(
        err instanceof Error 
          ? `Camera error: ${err.message}` 
          : 'Failed to start camera. Please check if the camera is connected and not in use by another application.'
      );
      setIsStreaming(false);
    }
  }, [selectedDevice, refreshDevices]);

  // Stop camera stream
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
  }, []);

  // Switch to a different camera
  const switchCamera = useCallback(async (deviceId: string) => {
    await startCamera(deviceId);
  }, [startCamera]);

  // Capture current frame as base64 image
  const captureFrame = useCallback((): string | null => {
    if (!videoRef.current || !isStreaming) {
      return null;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current || document.createElement('canvas');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const context = canvas.getContext('2d');
    if (!context) {
      return null;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.95);
  }, [isStreaming]);

  // Initialize: get device list
  useEffect(() => {
    refreshDevices();

    // Listen for device changes (camera plugged/unplugged)
    const handleDeviceChange = () => {
      refreshDevices();
    };

    navigator.mediaDevices?.addEventListener('devicechange', handleDeviceChange);

    return () => {
      navigator.mediaDevices?.removeEventListener('devicechange', handleDeviceChange);
      stopCamera();
    };
  }, [refreshDevices, stopCamera]);

  return {
    videoRef,
    canvasRef,
    devices,
    selectedDevice,
    isStreaming,
    hasPermission,
    error,
    startCamera,
    stopCamera,
    switchCamera,
    captureFrame,
    refreshDevices
  };
}
