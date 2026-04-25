import {TransformComponent, TransformWrapper} from 'react-zoom-pan-pinch';
import type {BombLocation, MapData, PoiType} from '../../types';
import MapOverlay from './MapOverlay';

interface MapViewerProps {
  data: MapData;
  currentFloor: string;
  visiblePoiTypes: PoiType[];
  showSpawns: boolean;
  activeBomb: BombLocation | null;
}

export default function MapViewer({data, currentFloor, visiblePoiTypes, showSpawns, activeBomb}: MapViewerProps) {
  return (
    <TransformWrapper minScale={1} maxScale={5} centerOnInit>
      <TransformComponent wrapperStyle={{width: '100%', height: '100%', backgroundColor: data.metadata.background_color}}>
        <div style={{position: 'relative'}}>
          <img
            src={'/' + data.metadata.blueprint_path.replace('{}', currentFloor)}
            alt={`${data.display_name} - ${currentFloor}`}
          />
          <MapOverlay
            poi={data.poi}
            spawnLocations={data.spawn_locations}
            activeBomb={activeBomb}
            visiblePoiTypes={visiblePoiTypes}
            showSpawns={showSpawns}
            currentFloor={currentFloor}
            floors={data.floors}
          />
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
}
