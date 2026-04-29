import {useRef, useState} from 'react';
import {TransformComponent, TransformWrapper} from 'react-zoom-pan-pinch';
import MapOverlay from './overlay/MapOverlay';
import {useMapDisplaySettings} from "../../hooks/useMapDisplaySettings.ts";
import {useMapData} from "../../hooks/useMapData.ts";

export default function MapViewer() {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgSize, setImgSize] = useState<{ width: number; height: number } | undefined>(undefined);

  const {mapData} = useMapData();
  const {displaySettings} = useMapDisplaySettings();

  return (
      <TransformWrapper minScale={1} maxScale={5} centerOnInit>
        <TransformComponent
            wrapperStyle={{width: '100%', height: '100%', backgroundColor: mapData.metadata.background_color}}>
          <div className="relative">
            <img
                ref={imgRef}
                src={'/' + mapData.metadata.blueprint_path.replace('{}', String(displaySettings.selectedFloor))}
                alt={`${mapData.display_name} - ${displaySettings.selectedFloor}`}
                onLoad={e => setImgSize({width: e.currentTarget.naturalWidth, height: e.currentTarget.naturalHeight})}
            />
            <MapOverlay imgSize={imgSize}/>
          </div>
        </TransformComponent>
      </TransformWrapper>
  );
}
