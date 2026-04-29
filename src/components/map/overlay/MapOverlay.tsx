import {useMapData} from "../../../hooks/useMapData.ts";
import {type MapDisplaySettings, useMapDisplaySettings} from "../../../hooks/useMapDisplaySettings.ts";
import {useMemo} from "react";
import type {MapData, Position} from "../../../lib/types.ts";
import Marker, {type MapMarkerProps} from "./Marker.tsx";
import RoomMarker from "./RoomMarker.tsx";

interface MapOverlayProps {
  imgSize?: { width: number; height: number };
}

export default function MapOverlay({imgSize}: MapOverlayProps) {
  const {mapData} = useMapData();
  const {displaySettings} = useMapDisplaySettings();

  const mapMarkerPropsArray = useMemo(() =>
      buildMapMarkerPropsArray(mapData, displaySettings), [mapData, displaySettings]);

  const roomMarkers = useMemo(() => {
    if (!displaySettings.showRooms) return [];
    return mapData.rooms.filter(r =>
        r.position.floors === undefined || r.position.floors.includes(displaySettings.selectedFloor)
    );
  }, [mapData.rooms, displaySettings.showRooms, displaySettings.selectedFloor]);

  return (
      <div className="absolute inset-0 pointer-events-none">
        {mapMarkerPropsArray.map((p, i) =>
            <Marker key={i} size={mapData.metadata.waypoint_size} imgSize={imgSize} {...p}/>
        )}
        {roomMarkers.map((r, i) =>
            <RoomMarker key={`room-${i}`} roomData={r} imgSize={imgSize}/>
        )}
      </div>
  );
}

const BASE_MARKER_PARAMS: Omit<MapMarkerProps, 'position' | 'size' | 'imgSize'> = {
  backgroundColor: "#000000",
  foregroundColor: "#ffffff",
  shape: 'circle',
  opacity: 1.0,
}

const MARKER_PARAMS_OVERRIDE: Record<string, Partial<MapMarkerProps>> = {
  cameras: {
    backgroundColor: "#2244bb",
    icon: 'camera',
  },
  fire_extinguishers: {
    backgroundColor: "#cc2211",
    icon: 'fire_extinguisher',
  },
  gas_pipes: {
    backgroundColor: "#882211",
    icon: 'pipe',
  },
  ladders: {
    backgroundColor: "#998800",
    icon: 'ladder',
  },
  stairs: {
    backgroundColor: "#228833",
    icon: 'stairs',
  },
  stairs_up: {
    backgroundColor: "#228833",
    icon: 'stairs_up',
  },
  stairs_down: {
    backgroundColor: "#228833",
    icon: 'stairs_down',
  },
  hatches: {
    backgroundColor: "#cc6611",
    icon: 'hatch',
  },
  ceil_hatches: {
    backgroundColor: "#cc6611",
    icon: 'hatch',
    opacity: 0.5,
  },
  bomb_a: {
    backgroundColor: "#ddaa00",
    foregroundColor: "#000000",
    label: 'A',
    shape: 'square',
  },
  bomb_b: {
    backgroundColor: "#ddaa00",
    foregroundColor: "#000000",
    label: 'B',
    shape: 'square',
  },
  bomb_above: {
    backgroundColor: "#ddaa00",
    foregroundColor: "#000000",
    shape: 'square',
    opacity: 0.5,
    label: '▲',
  },
  bomb_below: {
    backgroundColor: "#ddaa00",
    foregroundColor: "#000000",
    shape: 'square',
    opacity: 0.5,
    label: '▼',
  },
  spawn: {
    backgroundColor: "#6633aa",
    label: 'S',
  }
};

function buildMapMarkerPropsArray(mapData: MapData, displaySettings: MapDisplaySettings): Omit<MapMarkerProps, 'size' | 'imgSize'>[] {
  const markerPropsArray = [];
  const {selectedFloor, selectedPoiCategories, showSpawns, selectedBombLocation} = displaySettings;

  const filteredWaypoints = Object.entries(mapData.waypoints).filter(([cat]) => selectedPoiCategories.includes(cat as never));

  markerPropsArray.push(...filteredWaypoints.flatMap(([category, waypoints]) =>
      waypoints.map((w): Pick<MapMarkerProps, 'position'> | undefined => {
        const [position, floors] = [w.position, w.position.floors];
        const [minFloor, maxFloor] = floors ? [Math.min(...floors), Math.max(...floors)] : [];

        switch (category) {
          case 'cameras':
          case 'fire_extinguishers':
          case 'gas_pipes':
          case 'ladders':
            if (floors === undefined || floors.includes(selectedFloor))
              return {position, ...MARKER_PARAMS_OVERRIDE[category]};
            else break;

          case 'stairs':
            if (floors === undefined || floors.includes(selectedFloor)) {
              if (floors !== undefined && floors.length > 1) {
                if (selectedFloor === minFloor)
                  return {position, ...MARKER_PARAMS_OVERRIDE.stairs_up};
                else if (selectedFloor === maxFloor)
                  return {position, ...MARKER_PARAMS_OVERRIDE.stairs_down};
              }
              return {position, ...MARKER_PARAMS_OVERRIDE.stairs};
            } else break;

          case 'hatches':
            if (floors === undefined || floors.includes(selectedFloor))
              return {position, ...MARKER_PARAMS_OVERRIDE.hatches};
            else if (floors.includes(selectedFloor + 1))
              return {position, ...MARKER_PARAMS_OVERRIDE.ceil_hatches};
            else break;
        }
      })
  ))

  if (showSpawns) {
    markerPropsArray.push(...mapData.spawn_locations.map(({name, position}) =>
        ({position, hoverText: name, ...MARKER_PARAMS_OVERRIDE.spawn})
    ))
  }

  if (selectedBombLocation) {
    const activeBomb = mapData.bomb_locations.find(b => b.id === selectedBombLocation);
    if (activeBomb) {
      const getBombMarker = (position: Position, defaultOverride: Partial<MapMarkerProps>) => {
        const {floors} = position;
        const hoverText = `${activeBomb.name} - ${defaultOverride.label}`;

        if (!floors || floors.includes(selectedFloor))
          return {position, hoverText, ...defaultOverride};

        if (floors.includes(selectedFloor + 1))
          return {position, hoverText, ...MARKER_PARAMS_OVERRIDE.bomb_above};

        if (floors.includes(selectedFloor - 1))
          return {position, hoverText, ...MARKER_PARAMS_OVERRIDE.bomb_below};
      };

      markerPropsArray.push(getBombMarker(activeBomb.position_a, MARKER_PARAMS_OVERRIDE.bomb_a));
      markerPropsArray.push(getBombMarker(activeBomb.position_b, MARKER_PARAMS_OVERRIDE.bomb_b));
    }
  }

  return markerPropsArray
      .filter((p) => (p !== undefined))
      .map(p => ({...BASE_MARKER_PARAMS, ...p}));
}
