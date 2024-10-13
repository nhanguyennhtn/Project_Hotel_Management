import React, { useEffect } from 'react';
import { QrReader } from '@blackbox-vision/react-qr-reader';

export default function QRCodeScanner({ setSothe, active }) {
  const handleResult = (result, error) => {
    if (!!result) {
      setSothe(result?.text);
    }

    if (!!error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!active) {
      setSothe(''); 
    }
  }, [active, setSothe]);

  return (
    <div>
      {active && (
        <QrReader
          onResult={handleResult}
          constraints={{ facingMode: 'environment' }}
          style={{ width: '100%' }}
        />
      )}
    </div>
  );
}
