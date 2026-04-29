import type {PoiData, PoiMetadata, WaypointProperty, WaypointType} from "./types.ts";

export const POI_METADATA: Record<keyof PoiData, PoiMetadata> = {
  cameras: {
    friendly_name: 'Cameras',
    waypoint_type: 'camera'
  },
  fire_extinguishers: {
    friendly_name: 'Fire Extinguishers',
    waypoint_type: 'fire_extinguisher'
  },
  pipes: {
    friendly_name: 'Pipes',
    waypoint_type: 'pipe'
  },
  stairs: {
    friendly_name: 'Stairs/Ladders',
    waypoint_type: 'stairs'
  },
  hatches: {
    friendly_name: 'Hatches',
    waypoint_type: 'hatch'
  },
};

export const WAYPOINT_PROPERTIES: Record<WaypointType, WaypointProperty> = {
  camera: {label: 'C', icon: 'camera', name: 'Camera', color: '#650fb3', text_color: '#fff', shape: 'circle'},
  hatch: {label: 'H', icon: 'hatch', name: 'Hatch', color: '#ff6b00', text_color: '#fff', shape: 'circle'},
  spawn: {label: 'S', name: 'Spawn', color: '#2243c5', text_color: '#fff', shape: 'circle'},
  stairs: {label: 'L', icon: 'stairs', name: 'Stairs', color: '#008a34', text_color: '#fff', shape: 'circle'},
  fire_extinguisher: {
    label: 'E',
    icon: 'fire_extinguisher',
    name: 'Fire Extinguisher',
    color: '#ea0000',
    text_color: '#fff',
    shape: 'circle'
  },
  pipe: {label: 'P', icon: 'pipe', name: 'Pipe', color: '#7a0808', text_color: '#fff', shape: 'circle'},
  bomb_a: {label: 'A', name: 'Bomb A', color: '#eab308', text_color: '#000', shape: 'square'},
  bomb_b: {label: 'B', name: 'Bomb B', color: '#eab308', text_color: '#000', shape: 'square'},
};
