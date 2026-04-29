import React, {useEffect, useRef, useState} from 'react';
import {message} from 'antd';
import {TransformComponent, TransformWrapper} from 'react-zoom-pan-pinch';
import MapOverlay from './MapOverlay';
import {useMapDisplaySettings} from "../../hooks/useMapDisplaySettings.ts";
import {useMapData} from "../../hooks/useMapData.ts";


export default function MapViewer() {
  const [mousePos, setMousePos] = useState<{x: number; y: number} | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgSize, setImgSize] = useState<{width: number; height: number} | undefined>(undefined);
  const [, setCapturedPoints] = useState<string[]>([]);

  const {mapData} = useMapData();
  const {displaySettings} = useMapDisplaySettings();

  useEffect(() => {
    if (!displaySettings.captureCoordinates) setCapturedPoints([]);
  }, [displaySettings.captureCoordinates]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const scale = rect.width / imgRef.current.naturalWidth;
    setMousePos({
      x: (e.clientX - rect.left) / scale,
      y: (e.clientY - rect.top) / scale,
    });
  }

  function handleMapClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const scale = rect.width / imgRef.current.naturalWidth;
    const x = Math.round((e.clientX - rect.left) / scale);
    const y = Math.round((e.clientY - rect.top) / scale);
    const point = {x, y};
    setCapturedPoints(prev => {
      const next = [...prev, JSON.stringify(point)];
      navigator.clipboard.writeText(next.join(', '));
      message.success(`Copied ${next.length} point${next.length === 1 ? '' : 's'} to clipboard`, 1);
      return next;
    });
  }

  return (
    <div
      style={{position: 'relative', width: '100%', height: '100%'}}
      onMouseMove={displaySettings.showCoordinates ? handleMouseMove : undefined}
      onMouseLeave={displaySettings.showCoordinates ? () => setMousePos(null) : undefined}
      onClick={displaySettings.captureCoordinates ? handleMapClick : undefined}
    >
      <TransformWrapper minScale={1} maxScale={5} centerOnInit>
        <TransformComponent wrapperStyle={{width: '100%', height: '100%', backgroundColor: mapData.metadata.backgroundColor}}>
          <div style={{position: 'relative'}}>
            <img
              ref={imgRef}
              src={'/' + mapData.metadata.blueprintPath.replace('{}', String(displaySettings.currentFloor))}
              alt={`${mapData.displayName} - ${displaySettings.currentFloor}`}
              onLoad={e => setImgSize({width: e.currentTarget.naturalWidth, height: e.currentTarget.naturalHeight})}
            />
            <MapOverlay imgSize={imgSize}/>
          </div>
        </TransformComponent>
      </TransformWrapper>
      {displaySettings.showCoordinates && mousePos && (
        <div style={{
          position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '2px 8px',
          borderRadius: 4, fontFamily: 'monospace', fontSize: 12, pointerEvents: 'none',
          zIndex: 10,
        }}>
          x: {Math.round(mousePos.x)}, y: {Math.round(mousePos.y)}
        </div>
      )}
    </div>
  );
}
