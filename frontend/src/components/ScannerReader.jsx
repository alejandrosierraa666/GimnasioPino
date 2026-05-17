import { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const requestCameraPermission = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true
        });

        stream.getTracks().forEach(track => track.stop());
        return true;

    } catch (error) {
        console.error("Camera permission denied:", error);
        return false;
    }
};

const QRScannerButton = () => {

    const [showScanner, setShowScanner] = useState(false);
    const scannerRef = useRef(null);

    const startScanner = async () => {

        const hasPermission = await requestCameraPermission();

        if (!hasPermission) {
            alert("Necesitas permitir el acceso a la cámara");
            return;
        }

        setShowScanner(true);
    };

    useEffect(() => {

        if (!showScanner) return;
        if (scannerRef.current) return;

        let scanner;

        const timeout = setTimeout(() => {

            scanner = new Html5QrcodeScanner(
                "qr-reader",
                {
                    fps: 10,
                    qrbox: 250,
                    facingMode: "environment"
                }
            );

            scannerRef.current = scanner;

            scanner.render(
                (decodedText) => {

                    console.log("QR:", decodedText);

                    scanner.clear();
                    scannerRef.current = null;
                    setShowScanner(false);
                },
                () => { }
            );

        }, 300);

        return () => {
            clearTimeout(timeout);

            if (scannerRef.current) {
                scannerRef.current.clear().catch(() => { });
                scannerRef.current = null;
            }
        };

    }, [showScanner]);

    return (
        <div>

            {!showScanner && (
                <button onClick={startScanner}>
                    Escanear QR
                </button>
            )}

            {showScanner && (
                <div>
                    <div id="qr-reader" />

                    <button onClick={() => setShowScanner(false)}>
                        Cerrar
                    </button>
                </div>
            )}

        </div>
    );
};

export default QRScannerButton;