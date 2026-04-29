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
  name: string;
  position: { x: number; y: number };
  note?: string;
}

export interface BombLocation {
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
  name: string;
  position: Position;
  angle?: number;
  perimeter?: {x: number, y: number}[];
}

export interface MapMetadata {
  slug: string;
  blueprint_url: string;
  blueprint_path: string;
  background_color: string;
  marker_size: number;
  highlight_color: string;
}

export interface MapDisplaySettings {
  current_floor: number;
  selected_poi_categories: PoiCategory[];
  selected_bomb_location: string | null;
  show_spawns: boolean;
  show_rooms: boolean;
  show_coordinates: boolean;
  capture_coordinates: boolean;
}

export type PoiCategory = keyof PoiData;

export interface Waypoint {
  type: WaypointType;
  position: Position;
  note?: string;
}

export type WaypointType = 'camera' | 'hatch' | 'spawn' | 'stairs' | 'fire_extinguisher' | 'pipe' | 'bomb_a' | 'bomb_b';

export interface WaypointProperty {
  name: string;
  label?: string;
  icon?: string;
  color: string;
  text_color: string;
  shape: 'circle' | 'square';
}
