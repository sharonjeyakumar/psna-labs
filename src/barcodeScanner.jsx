import { useEffect, useRef, useState } from "react";
import Quagga from "quagga";

const BarcodeScanner = () => {
  const videoRef = useRef(null);
  const [barcode, setBarcode] = useState("No barcode scanned yet.");
  const [isQuaggaRunning, setIsQuaggaRunning] = useState(false);

  useEffect(() => {
 
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } }) 
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          startScanner();
        }
      })
      .catch((error) => console.error("Error accessing webcam:", error));

    return () => {
      if (isQuaggaRunning) {
        Quagga.stop();
        setIsQuaggaRunning(false);
      }
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startScanner = () => {
    if (!videoRef.current) {
      console.error("Video element not available");
      return;
    }

    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: videoRef.current, 
          constraints: {
            facingMode: "environment",
          },
        },
        decoder: {
          readers: ["code_128_reader", "code_39_reader"], 
        },
        locator: {
          patchSize: "medium",
          halfSample: true,
        },
        locate: true,
      },
      (err) => {
        if (err) {
          console.error("Error initializing Quagga:", err);
          return;
        }
        Quagga.start();
        setIsQuaggaRunning(true);
      }
    );

   
    Quagga.onDetected((result) => {
      if (result?.codeResult?.code) {
        setBarcode(result.codeResult.code);
      }
    });
  };

  return (
    <div className="scanner">
        <h2>Scan your ID card</h2>
      <video  ref={videoRef} width="640" height="480" autoPlay />
      <h2>Scanned Barcode:</h2>
      <p>{barcode}</p>
    </div>
  );
};

export default BarcodeScanner;
