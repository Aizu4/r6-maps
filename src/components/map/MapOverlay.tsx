import type {MapData, MapDisplaySettings, PoiData} from '../../types';
import {POI_METADATA} from '../../types';
import MapMarker from './MapMarker';

interface MapOverlayProps {
  data: MapData;
  settings: MapDisplaySettings;
  imgSize?: { width: number; height: number };
}

export default function MapOverlay(props: MapOverlayProps) {
  const {poi, bomb_locations, spawn_locations} = props.data;
  const {currentFloor, selectedDisplay, selectedBomb, showSpawns} = props.settings;
  const {imgSize} = props;

  const poiKeys = new Set(Object.keys(poi));

  const visiblePoiTypes = selectedDisplay
      .filter(path => poiKeys.has(path[0]))
      .map(path => path[0] as keyof PoiData);

  const poiMarkers = visiblePoiTypes.flatMap(type =>
      (poi[type] ?? [])
          .filter(wp => wp.position.floors.includes(currentFloor))
          .map((wp, i) => (
              <MapMarker
                  key={`${type}-${i}`}
                  waypoint={{type: POI_METADATA[type].waypoint_type, position: wp.position, note: wp.note}}
                  imgSize={imgSize}
              />
          ))
  );

  const spawnMarkers = showSpawns ? spawn_locations
      .filter(s => s.position.floors.includes(currentFloor))
      .map((s, i) => (
          <MapMarker
              key={`spawn-${i}`}
              waypoint={{type: 'spawn', position: s.position, note: s.name}}
              imgSize={imgSize}
          />
      )) : [];

  const activeBomb = bomb_locations.find(b => b.name === selectedBomb[0]) ?? null;
  const bombMarkers = activeBomb ? [
    <MapMarker key="bomb_a" waypoint={{type: 'bomb_a', position: activeBomb.position_a}} imgSize={imgSize}/>,
    <MapMarker key="bomb_b" waypoint={{type: 'bomb_b', position: activeBomb.position_b}} imgSize={imgSize}/>,
  ] : [];

  return (
      <div className="absolute inset-0 pointer-events-none">
        {poiMarkers}
        {spawnMarkers}
        {bombMarkers}
      </div>
  );
}
