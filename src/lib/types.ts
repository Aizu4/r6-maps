export interface Position {
  x: number;
  y: number;
  floors?: number[];
}

export interface Waypoint {
  position: Position;
  note?: string;
}

export interface NamedWaypoint extends Waypoint {
  name: string;
}

export interface Room extends NamedWaypoint {
  poly: Position[]
}

// Map JSON layout

export interface MapData {
  display_name: string;
  floors: { id: number; name: string }[];
  spawn_locations: { id: number, name: string, position: Position }[];
  bomb_locations: { id: number, name: string, position_a: Position, position_b: Position }[];
  waypoints: {
    cameras?: Waypoint[];
    fire_extinguishers?: Waypoint[];
    gas_pipes?: Waypoint[];
    hatches?: Waypoint[];
    stairs?: Waypoint[];
    ladders?: Waypoint[];
  };
  rooms: Room[];
  metadata: MapMetadata;
}

export interface MapMetadata {
  slug: string;
  blueprint_url?: string;
  blueprint_path: string;
  background_color?: string;
  waypoint_size: number;
  highlight_color?: string;
}

export interface Option<T> {
  label: string;
  value: T;
  children?: Option<T>[];
}

