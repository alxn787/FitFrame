/* eslint-disable */
'use client';

import React, { useRef, useEffect, useState } from 'react';
import { drawPose } from '../lib/PoseUtils';
interface PoseDetectorProps {
  onPoseDetected: (pose: any | null) => void;
  isActive: boolean;
}

const PoseDetector: React.FC<PoseDetectorProps> = ({ onPoseDetected, isActive }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const detectorRef = useRef<any | null>(null);
  const requestAnimationFrameRef = useRef<number | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Initialize the TensorFlow.js and PoseDetection
  useEffect(() => {
    async function initializeDetector() {
      try {
        setIsLoading(true);
        console.log("Initializing TensorFlow and detector...");
        
        // Dynamically import TensorFlow.js and PoseDetection to avoid SSR issues
        const tf = await import('@tensorflow/tfjs');
        const poseDetection = await import('@tensorflow-models/pose-detection');
        
        // Load TensorFlow.js backends
        await tf.ready();
        await tf.setBackend('webgl');
        console.log("TensorFlow backend set:", tf.getBackend());
        
        // Create a detector using MoveNet
        detectorRef.current = await poseDetection.createDetector(
            poseDetection.SupportedModels.MoveNet, // ✅ Correct model reference
            {
              modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING, // ✅ Correct MoveNet model
              enableSmoothing: true, // ✅ Optional
            }
          );          
          
        
        console.log("Creating pose detector...");
        detectorRef.current = await poseDetection.createDetector(
          poseDetection.SupportedModels.MoveNet,
          detectorRef.current
        );
        
        console.log("Pose detector created successfully");
        setIsLoading(false);
      } catch (err) {
        console.error('Error initializing pose detector:', err);
        setError('Failed to initialize pose detection. Please try again or check console for details.');
        setIsLoading(false);
      }
    }
    
    initializeDetector();
    
    // Cleanup function
    return () => {
      if (requestAnimationFrameRef.current) {
        cancelAnimationFrame(requestAnimationFrameRef.current);
        requestAnimationFrameRef.current = null;
      }
    };
  }, []);
  
  // Start webcam
  useEffect(() => {
    async function setupCamera() {
      if (!videoRef.current) return;
      
      try {
        console.log("Requesting camera access...");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user',
            width: { ideal: 640 },
            height: { ideal: 480 },
          },
          audio: false,
        });
        
        console.log("Camera access granted");
        videoRef.current.srcObject = stream;
        
        // Make sure video metadata is loaded before proceeding
        if (videoRef.current.readyState < 2) {
          await new Promise<void>((resolve) => {
            if (videoRef.current) {
              videoRef.current.onloadedmetadata = () => {
                console.log("Video metadata loaded");
                resolve();
              };
            }
          });
        }
      } catch (err) {
        console.error('Error accessing webcam:', err);
        setError('Unable to access your camera. Please check permissions and try again.');
      }
    }
    
    setupCamera();
    
    // Cleanup function for webcam stream
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);
  
  // Setup canvas sizing to match video
  useEffect(() => {
    function resizeCanvas() {
      if (!videoRef.current || !canvasRef.current) return;
      
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas size to match video dimensions
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      console.log("Canvas resized to:", canvas.width, "x", canvas.height);
    }
    
    const video = videoRef.current;
    if (video) {
      video.addEventListener('loadeddata', resizeCanvas);
    }
    
    return () => {
      if (video) {
        video.removeEventListener('loadeddata', resizeCanvas);
      }
    };
  }, []);
  
  // Pose detection loop
  useEffect(() => {
    if (!isActive) {
      if (requestAnimationFrameRef.current) {
        cancelAnimationFrame(requestAnimationFrameRef.current);
        requestAnimationFrameRef.current = null;
      }
      return;
    }
    
    async function detectPose() {
      if (!detectorRef.current || !videoRef.current || !canvasRef.current) {
        requestAnimationFrameRef.current = requestAnimationFrame(detectPose);
        return;
      }
      
      try {
        // Only detect if video is playing and has loaded
        if (videoRef.current.readyState >= 2) {
          // Detect pose
          const poses = await detectorRef.current.estimatePoses(videoRef.current);
          const pose = poses.length > 0 ? poses[0] : null;
          
          // Draw the pose on canvas
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) {
            // Clear previous drawings
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            
            if (pose) {
              drawPose(pose, ctx);
            }
          }
          
          // Callback with detected pose
          onPoseDetected(pose);
        }
      } catch (err) {
        console.error('Error during pose detection:', err);
      }
      
      // Continue the detection loop
      requestAnimationFrameRef.current = requestAnimationFrame(detectPose);
    }
    
    // Start the detection loop
    if (!requestAnimationFrameRef.current) {
      console.log("Starting pose detection loop");
      requestAnimationFrameRef.current = requestAnimationFrame(detectPose);
    }
    
    return () => {
      if (requestAnimationFrameRef.current) {
        cancelAnimationFrame(requestAnimationFrameRef.current);
        requestAnimationFrameRef.current = null;
      }
    };
  }, [isActive, onPoseDetected]);
  
  return (
    <div className="relative w-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-10 rounded-lg">
          <div className="flex flex-col items-center space-y-4">
            <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            <p className="text-sm font-medium">Loading pose detection model...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-10 rounded-lg">
          <div className="bg-card p-4 rounded-lg shadow-lg max-w-xs text-center">
            <p className="text-destructive font-medium mb-2">Error</p>
            <p className="text-sm text-muted-foreground">{error}</p>
            <button 
              className="mt-3 px-3 py-1 bg-primary text-primary-foreground text-xs rounded-md"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>
      )}
      
      <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
        <video 
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          playsInline
          muted
          style={{transform: 'scaleX(-1)'}}
        />
        <canvas 
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
          style={{transform: 'scaleX(-1)'}}
        />
      </div>
    </div>
  );
};

export default PoseDetector;