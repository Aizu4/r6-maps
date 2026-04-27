export interface MapData {
  display_name: string;
  floors: Floor[];
  spawn_locations: SpawnLocation[];
  bomb_locations: BombLocation[];
  poi: PoiData;
  rooms: Room[];
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

export interface Position {
  x: number;
  y: number;
  floors: number[];
}

export interface Room {
  id: number;
  name: string;
  position: Position;
  perimeter?: PolygonPerimeter;
}

export interface PolygonPerimeter {
  points: {x: number, y: number}[];
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
