export interface MapData {
  displayName: string;
  floors: Floor[];
  spawnLocations: SpawnLocation[];
  bombLocations: BombLocation[];
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
  fireExtinguishers?: Poi[];
  pipes?: Poi[];
  stairs?: Poi[];
  hatches?: Poi[];
}

export interface Poi {
  position: Position;
  note?: string;
}

export interface PoiMetadata {
  friendlyName: string;
  waypointType: WaypointType;
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
  blueprintUrl: string;
  blueprintPath: string;
  backgroundColor: string;
  markerSize: number;
  highlightColor: string;
}

export interface MapDisplaySettings {
  currentFloor: number;
  selectedPoiCategories: PoiCategory[];
  selectedBombLocation: string | null;
  showSpawns: boolean;
  showRooms: boolean;
  showCoordinates: boolean;
  captureCoordinates: boolean;
}

export type PoiCategory = keyof PoiData;

export interface Waypoint {
  type: WaypointType;
  position: Position;
  note?: string;
}

export type WaypointType = 'camera' | 'hatch' | 'spawn' | 'stairs' | 'fireExtinguisher' | 'pipe' | 'bombA' | 'bombB';

export interface WaypointProperty {
  name: string;
  label?: string;
  icon?: string;
  color: string;
  textColor: string;
  shape: 'circle' | 'square';
}
