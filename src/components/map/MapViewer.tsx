import {useRef, useState} from 'react';
import {TransformComponent, TransformWrapper} from 'react-zoom-pan-pinch';
import MapOverlay from './MapOverlay';
import {useMapDisplaySettings} from "../../hooks/useMapDisplaySettings.ts";
import {useMapData} from "../../hooks/useMapData.ts";


export default function MapViewer() {
  const [mousePos, setMousePos] = useState<{x: number; y: number} | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgSize, setImgSize] = useState<{width: number; height: number} | null>(null);

  const {mapData} = useMapData();
  const {displaySettings} = useMapDisplaySettings();

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const scale = rect.width / imgRef.current.naturalWidth;
    setMousePos({
      x: (e.clientX - rect.left) / scale,
      y: (e.clientY - rect.top) / scale,
    });
  }

  return (
    <div
      style={{position: 'relative', width: '100%', height: '100%'}}
      onMouseMove={displaySettings.show_coordinates ? handleMouseMove : undefined}
      onMouseLeave={displaySettings.show_coordinates ? () => setMousePos(null) : undefined}
    >
      <TransformWrapper minScale={1} maxScale={5} centerOnInit>
        <TransformComponent wrapperStyle={{width: '100%', height: '100%', backgroundColor: mapData.metadata.background_color}}>
          <div style={{position: 'relative'}}>
            <img
              ref={imgRef}
              src={'/' + mapData.metadata.blueprint_path.replace('{}', String(displaySettings.currentFloor))}
              alt={`${mapData.display_name} - ${displaySettings.currentFloor}`}
              onLoad={e => setImgSize({width: e.currentTarget.naturalWidth, height: e.currentTarget.naturalHeight})}
            />
            <MapOverlay data={mapData} settings={displaySettings} imgSize={imgSize}/>
          </div>
        </TransformComponent>
      </TransformWrapper>
      {displaySettings.show_coordinates && mousePos && (
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
