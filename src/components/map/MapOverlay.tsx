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
  const {current_floor, selected_poi_categories, selected_bomb_location, show_spawns, show_rooms} = displaySettings;
  const {imgSize} = props;

  const poiMarkers = selected_poi_categories.flatMap(type =>
      (poi[type] ?? [])
          .filter(p => p.position.floors.includes(current_floor) ||
              (type === 'hatches' && p.position.floors.some(f => f === current_floor + 1)))
          .map((p, i) => (
              <MapMarker
                  key={`${type}-${i}`}
                  waypoint={{type: POI_METADATA[type].waypoint_type, ...p}}
                  imgSize={imgSize}
              />
          ))
  );

  const spawnMarkers = show_spawns && spawn_locations
      .map((s, i) => (
          <MapMarker
              key={`spawn-${i}`}
              waypoint={{type: 'spawn', position: {...s.position, floors: []}, note: s.name}}
              imgSize={imgSize}
          />
      ));

  const activeBomb = bomb_locations.find(b => b.name === selected_bomb_location);
  const bombMarkers = activeBomb && [
    <MapMarker key="bomb_a" waypoint={{type: 'bomb_a', position: activeBomb.position_a}} imgSize={imgSize}/>,
    <MapMarker key="bomb_b" waypoint={{type: 'bomb_b', position: activeBomb.position_b}} imgSize={imgSize}/>,
  ];

  const roomMarkers = show_rooms && rooms
      .filter(r => r.position.floors.includes(current_floor))
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
