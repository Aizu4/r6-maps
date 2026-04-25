export interface MapData {
  display_name: string;
  floors: Record<string, string>;
  spawn_locations: SpawnLocation[];
  bomb_locations: BombLocation[];
  poi: PoiData;
  metadata: Metadata;
}

export interface SpawnLocation {
  name: string;
  position: Position;
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

export type PoiType = keyof PoiData;

export interface Position {
  x: number;
  y: number;
  floors: string[];
}

export interface Metadata {
  slug: string;
  blueprint_url: string;
  blueprint_path: string;
  background_color: string;
}


export interface PoiStyle {
  color: string;
  label: string;
  name: string;
}

export const POI_STYLES: Record<PoiType, PoiStyle> = {
  cameras: {color: '#3b82f6', label: 'C', name: 'Cameras'},
  fire_extinguishers: {color: '#f97316', label: 'F', name: 'Extinguishers'},
  pipes: {color: '#94a3b8', label: 'P', name: 'Pipes'},
  stairs: {color: '#a855f7', label: 'St', name: 'Stairs'},
  hatches: {color: '#eab308', label: 'H', name: 'Hatches'},
};
