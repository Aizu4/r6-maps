import React from 'react';
import type {BombLocation, PoiData, PoiType, SpawnLocation} from '../../types';
import MapPoiMarker from './markers/MapPoiMarker';
import MapSpawnMarker from './markers/MapSpawnMarker';
import MapBombMarker from './markers/MapBombMarker';

interface MapOverlayProps {
  poi: PoiData;
  spawnLocations: SpawnLocation[];
  activeBomb: BombLocation | null;
  visiblePoiTypes: PoiType[];
  showSpawns: boolean;
  currentFloor: string;
  floors: Record<string, string>;
}

const containerStyle: React.CSSProperties = {
  position: 'absolute', top: 0, left: 0, width: 0, height: 0, pointerEvents: 'none',
};

export default function MapOverlay({
                                     poi,
                                     spawnLocations,
                                     activeBomb,
                                     visiblePoiTypes,
                                     showSpawns,
                                     currentFloor,
                                     floors
                                   }: MapOverlayProps) {
  const floorKeys = Object.keys(floors).sort((a, b) => Number(a) - Number(b));
  const poiMarkers = visiblePoiTypes.flatMap(type =>
      (poi[type] ?? [])
          .filter(wp => wp.position.floors.includes(currentFloor))
          .map((wp, i) => <MapPoiMarker key={`${type}-${i}`} type={type} waypoint={wp}/>)
  );

  const spawnMarkers = showSpawns
      ? spawnLocations
          .filter(s => s.position.floors.includes(currentFloor))
          .map((s, i) => <MapSpawnMarker key={`spawn-${i}`} spawn={s}/>)
      : [];

  return (
      <div style={containerStyle}>
        {poiMarkers}
        {spawnMarkers}
        {activeBomb && <MapBombMarker bomb={activeBomb} currentFloor={currentFloor} allFloors={floorKeys}/>}
      </div>
  );
}
