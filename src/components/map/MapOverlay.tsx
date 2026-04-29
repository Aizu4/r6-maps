import MapMarker from './MapMarker';
import MapRoomMarker from './MapRoomMarker';
import {POI_METADATA} from "../../constants.ts";
import {useMapData} from "../../hooks/useMapData.ts";
import {useMapDisplaySettings} from "../../hooks/useMapDisplaySettings.ts";

interface MapOverlayProps {
  imgSize?: { width: number; height: number };
}

export default function MapOverlay(props: MapOverlayProps) {
  const {mapData} = useMapData();
  const {displaySettings} = useMapDisplaySettings();

  const {poi, bomb_locations, spawn_locations, rooms} = mapData;
  const {currentFloor, selectedPoiCategories, selectedBombLocation, showSpawns, showRooms} = displaySettings;
  const {imgSize} = props;

  const poiMarkers = selectedPoiCategories.flatMap(type =>
      (poi[type] ?? [])
          .filter(p => p.position.floors.includes(currentFloor) ||
              (type === 'hatches' && p.position.floors.some(f => f === currentFloor + 1)))
          .map((p, i) => (
              <MapMarker
                  key={`${type}-${i}`}
                  waypoint={{type: POI_METADATA[type].waypoint_type, ...p}}
                  imgSize={imgSize}
              />
          ))
  );

  const spawnMarkers = showSpawns && spawn_locations
      .map((s, i) => (
          <MapMarker
              key={`spawn-${i}`}
              waypoint={{type: 'spawn', position: {...s.position, floors: []}, note: s.name}}
              imgSize={imgSize}
          />
      ));

  const activeBomb = bomb_locations.find(b => b.name === selectedBombLocation);
  const bombMarkers = activeBomb && [
    <MapMarker key="bomb_a" waypoint={{type: 'bomb_a', position: activeBomb.position_a}} imgSize={imgSize}/>,
    <MapMarker key="bomb_b" waypoint={{type: 'bomb_b', position: activeBomb.position_b}} imgSize={imgSize}/>,
  ];

  const roomMarkers = showRooms && rooms
      .filter(r => r.position.floors.includes(currentFloor))
      .map((r, i) => (
          <MapRoomMarker key={`room-${i}`} roomData={r} imgSize={imgSize}/>
      ));

  return (
      <div className="absolute inset-0 pointer-events-none">
        {roomMarkers}
        {poiMarkers}
        {spawnMarkers}
        {bombMarkers}
      </div>
  );
}
