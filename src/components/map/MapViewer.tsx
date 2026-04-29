import React, {useEffect, useRef, useState} from 'react';
import {message} from 'antd';
import {TransformComponent, TransformWrapper} from 'react-zoom-pan-pinch';
import MapOverlay from './MapOverlay';
import {useMapDisplaySettings} from "../../hooks/useMapDisplaySettings.ts";
import {useMapData} from "../../hooks/useMapData.ts";


export default function MapViewer() {
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgSize, setImgSize] = useState<{ width: number; height: number } | undefined>(undefined);
  const capturedPoints = useRef<string[]>([]);

  const {mapData} = useMapData();
  const {displaySettings} = useMapDisplaySettings();

  useEffect(() => {
    if (!displaySettings.captureCoordinates) capturedPoints.current = [];
  }, [displaySettings.captureCoordinates]);

  function getImageCoords(e: React.MouseEvent<HTMLDivElement>) {
    const rect = imgRef.current!.getBoundingClientRect();
    const scale = rect.width / imgRef.current!.naturalWidth;
    return {
      x: Math.round((e.clientX - rect.left) / scale),
      y: Math.round((e.clientY - rect.top) / scale),
    };
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!imgRef.current) return;
    setMousePos(getImageCoords(e));
  }

  function handleMapClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!imgRef.current) return;
    capturedPoints.current = [...capturedPoints.current, JSON.stringify(getImageCoords(e))];
    navigator.clipboard.writeText(capturedPoints.current.join(', '));
    const n = capturedPoints.current.length;
    message.success(`Copied ${n} point${n === 1 ? '' : 's'} to clipboard`, 1);
  }

  return (
      <div
          style={{position: 'relative', width: '100%', height: '100%'}}
          onMouseMove={displaySettings.showCoordinates ? handleMouseMove : undefined}
          onMouseLeave={displaySettings.showCoordinates ? () => setMousePos(null) : undefined}
          onClick={displaySettings.captureCoordinates ? handleMapClick : undefined}
      >
        <TransformWrapper minScale={1} maxScale={5} centerOnInit>
          <TransformComponent
              wrapperStyle={{width: '100%', height: '100%', backgroundColor: mapData.metadata.background_color}}>
            <div style={{position: 'relative'}}>
              <img
                  ref={imgRef}
                  src={'/' + mapData.metadata.blueprint_path.replace('{}', String(displaySettings.currentFloor))}
                  alt={`${mapData.display_name} - ${displaySettings.currentFloor}`}
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
              x: {mousePos.x}, y: {mousePos.y}
            </div>
        )}
      </div>
  );
}
