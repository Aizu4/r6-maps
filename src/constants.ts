import type {PoiData, PoiMetadata, WaypointProperty, WaypointType} from "./types.ts";

export const POI_METADATA: Record<keyof PoiData, PoiMetadata> = {
  cameras: {
    friendlyName: 'Cameras',
    waypointType: 'camera'
  },
  fireExtinguishers: {
    friendlyName: 'Fire Extinguishers',
    waypointType: 'fireExtinguisher'
  },
  pipes: {
    friendlyName: 'Pipes',
    waypointType: 'pipe'
  },
  stairs: {
    friendlyName: 'Stairs/Ladders',
    waypointType: 'stairs'
  },
  hatches: {
    friendlyName: 'Hatches',
    waypointType: 'hatch'
  },
};

export const WAYPOINT_PROPERTIES: Record<WaypointType, WaypointProperty> = {
  camera: {label: 'C', icon: 'camera', name: 'Camera', color: '#650fb3', textColor: '#fff', shape: 'circle'},
  hatch: {label: 'H', icon: 'hatch', name: 'Hatch', color: '#ff6b00', textColor: '#fff', shape: 'circle'},
  spawn: {label: 'S', name: 'Spawn', color: '#2243c5', textColor: '#fff', shape: 'circle'},
  stairs: {label: 'L', icon: 'stairs', name: 'Stairs', color: '#008a34', textColor: '#fff', shape: 'circle'},
  fireExtinguisher: {
    label: 'E',
    icon: 'fire_extinguisher',
    name: 'Fire Extinguisher',
    color: '#ea0000',
    textColor: '#fff',
    shape: 'circle'
  },
  pipe: {label: 'P', icon: 'pipe', name: 'Pipe', color: '#7a0808', textColor: '#fff', shape: 'circle'},
  bombA: {label: 'A', name: 'Bomb A', color: '#eab308', textColor: '#000', shape: 'square'},
  bombB: {label: 'B', name: 'Bomb B', color: '#eab308', textColor: '#000', shape: 'square'},
};