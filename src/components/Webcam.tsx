import axios from 'axios';
import { tr } from 'date-fns/locale';
import Image from 'next/image';
import React, { useRef, useCallback, useState, use } from 'react';
import Webcam from 'react-webcam';

type WebcamCaptureProps = {
    onCapture: (imageSrc: any) => void; 
};

const WebcamCapture = ({onCapture}: WebcamCaptureProps) => {
  const webcamRef = useRef<Webcam>(null);
  const dataURLToBlob = (dataURL: string) => {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  // Define the screenshot capture function
  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        // Convert base64 to Blob
        const blob = dataURLToBlob(imageSrc);

        // Create a File object with custom name and metadata
        const file = new File(
          [blob],
          `Screenshot-${new Date().toISOString()}.png`,
          {
            type: 'image/png',
            lastModified: Date.now(),
          }
        );

        // Pass the File object to the parent via onCapture
        onCapture(file);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Webcam feed */}
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-full h-auto"
      />
      
      {/* Button to capture image */}
      <button
        onClick={capture}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Capture Photo
      </button>
    </div>
  );
};

export default WebcamCapture;
