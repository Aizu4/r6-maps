import {useEffect, useRef, useState} from 'react';
import type {MouseEvent, MouseEventHandler, RefObject} from 'react';
import {message} from 'antd';
import {useMapDisplaySettings} from './useMapDisplaySettings.ts';

export function useMapInteraction(imgRef: RefObject<HTMLImageElement | null>): {
  mousePos: { x: number; y: number } | null;
  onMouseMove: MouseEventHandler<HTMLDivElement> | undefined;
  onMouseLeave: MouseEventHandler<HTMLDivElement> | undefined;
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
} {
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const capturedPoints = useRef<string[]>([]);
  const {displaySettings} = useMapDisplaySettings();

  useEffect(() => {
    if (!displaySettings.captureCoordinates) capturedPoints.current = [];
  }, [displaySettings.captureCoordinates]);

  function getImageCoords(e: MouseEvent<HTMLDivElement>) {
    const rect = imgRef.current!.getBoundingClientRect();
    const scale = rect.width / imgRef.current!.naturalWidth;
    return {
      x: Math.round((e.clientX - rect.left) / scale),
      y: Math.round((e.clientY - rect.top) / scale),
    };
  }

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!imgRef.current) return;
    setMousePos(getImageCoords(e));
  }

  function handleMapClick(e: MouseEvent<HTMLDivElement>) {
    if (!imgRef.current) return;
    capturedPoints.current = [...capturedPoints.current, JSON.stringify(getImageCoords(e))];
    navigator.clipboard.writeText(capturedPoints.current.join(', '));
    const n = capturedPoints.current.length;
    message.success(`Copied ${n} point${n === 1 ? '' : 's'} to clipboard`, 1);
  }

  return {
    mousePos,
    onMouseMove: displaySettings.showCoordinates ? handleMouseMove : undefined,
    onMouseLeave: displaySettings.showCoordinates ? () => setMousePos(null) : undefined,
    onClick: displaySettings.captureCoordinates ? handleMapClick : undefined,
  };
}
