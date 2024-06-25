// PatternLockComponent.tsx
import React, { useEffect, useRef } from 'react';

const PatternComponent = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const patternLock = new (window as any).ReactCanvasPatternLock(canvasRef.current, {
        width: 300,
        height: 300,
        grid: 3,
      });

      patternLock.on('complete', (pattern: any) => {
        console.log('Pattern completed:', pattern);
        // 패턴 완료 후 처리할 작업
      });
    }
  }, []);

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default PatternComponent;
