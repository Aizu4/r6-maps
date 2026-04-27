export interface MapData {
  display_name: string;
  floors: Floor[];
  spawn_locations: SpawnLocation[];
  bomb_locations: BombLocation[];
  poi: PoiData;
  metadata: MapMetadata;
}

export interface Floor {
  id: number;
  name: string;
}

export interface SpawnLocation {
  id: number;
  name: string;
  position: Position;
  note?: string;
}

export interface BombLocation {
  id: number;
  name: string;
  position_a: Position;
  position_b: Position;
}

export interface PoiData {
  cameras?: Poi[];
  fire_extinguishers?: Poi[];
  pipes?: Poi[];
  stairs?: Poi[];
  hatches?: Poi[];
}

export interface Poi {
  position: Position;
  note?: string;
}

export interface PoiMetadata {
  friendly_name: string;
  waypoint_type: WaypointType;
}

export const POI_METADATA: Record<keyof PoiData, PoiMetadata> = {
  cameras: {friendly_name: 'Cameras [C]', waypoint_type: 'camera'},
  fire_extinguishers: {friendly_name: 'Fire Extinguishers [E]', waypoint_type: 'fire_extinguisher'},
  pipes: {friendly_name: 'Pipes [P]', waypoint_type: 'pipe'},
  stairs: {friendly_name: 'Stairs/Ladders [L]', waypoint_type: 'stairs'},
  hatches: {friendly_name: 'Hatches [H]', waypoint_type: 'hatch'},
};

export interface Position {
  x: number;
  y: number;
  floors: number[];
}

export interface MapMetadata {
  slug: string;
  blueprint_url: string;
  blueprint_path: string;
  background_color: string;
  marker_size: number;
}

export interface MapDisplaySettings {
  currentFloor: number;
  selectedDisplay: string[][];
  showSpawns: boolean;
  selectedBomb: string[];
  show_coordinates: boolean;
}

export interface Waypoint {
  type: WaypointType;
  position: Position;
  note?: string;
}

export type WaypointType = 'camera' | 'hatch' | 'spawn' | 'stairs' | 'fire_extinguisher' | 'pipe' | 'bomb_a' | 'bomb_b';

export interface WaypointProperty {
  label: string;
  name: string;
  color: string;
  textColor: string;
  shape: 'circle' | 'square';
}

export const WAYPOINT_PROPERTIES: Record<WaypointType, WaypointProperty> = {
  camera: {label: 'C', name: 'Camera', color: '#a855f7', textColor: '#ffffff', shape: 'circle'},
  hatch: {label: 'H', name: 'Hatch', color: '#f97316', textColor: '#ffffff', shape: 'circle'},
  spawn: {label: 'S', name: 'Spawn', color: '#22c55e', textColor: '#ffffff', shape: 'circle'},
  stairs: {label: 'L', name: 'Stairs', color: '#22c55e', textColor: '#ffffff', shape: 'circle'},
  fire_extinguisher: {
    label: 'E',
    name: 'Fire Extinguisher',
    color: '#ef4444',
    textColor: '#ffffff',
    shape: 'circle'
  },
  pipe: {label: 'P', name: 'Pipe', color: '#92400e', textColor: '#ffffff', shape: 'circle'},
  bomb_a: {label: 'A', name: 'Bomb A', color: '#eab308', textColor: '#000000', shape: 'square'},
  bomb_b: {label: 'B', name: 'Bomb B', color: '#eab308', textColor: '#000000', shape: 'square'},
};
