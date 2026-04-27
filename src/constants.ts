import type {PoiData, PoiMetadata, WaypointProperty, WaypointType} from "./types.ts";

export const POI_METADATA: Record<keyof PoiData, PoiMetadata> = {
  cameras: {
    friendly_name: 'Cameras [C]',
    waypoint_type: 'camera'
  },
  fire_extinguishers: {
    friendly_name: 'Fire Extinguishers [E]',
    waypoint_type: 'fire_extinguisher'
  },
  pipes: {
    friendly_name: 'Pipes [P]',
    waypoint_type: 'pipe'
  },
  stairs: {
    friendly_name: 'Stairs/Ladders [L]',
    waypoint_type: 'stairs'
  },
  hatches: {
    friendly_name: 'Hatches [H]',
    waypoint_type: 'hatch'
  },
};

export const WAYPOINT_PROPERTIES: Record<WaypointType, WaypointProperty> = {
  camera: {label: 'C', name: 'Camera', color: '#a855f7', textColor: '#ffffff', shape: 'circle'},
  hatch: {label: 'H', name: 'Hatch', color: '#f97316', textColor: '#ffffff', shape: 'circle'},
  spawn: {label: 'S', name: 'Spawn', color: '#22c55e', textColor: '#ffffff', shape: 'circle'},
  stairs: {label: 'L', name: 'Stairs', color: '#22c55e', textColor: '#ffffff', shape: 'circle'},
  fire_extinguisher: {label: 'E', name: 'Fire Extinguisher', color: '#ef4444', textColor: '#ffffff', shape: 'circle'},
  pipe: {label: 'P', name: 'Pipe', color: '#92400e', textColor: '#ffffff', shape: 'circle'},
  bomb_a: {label: 'A', name: 'Bomb A', color: '#eab308', textColor: '#000000', shape: 'square'},
  bomb_b: {label: 'B', name: 'Bomb B', color: '#eab308', textColor: '#000000', shape: 'square'},
};