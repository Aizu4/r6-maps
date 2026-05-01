export interface Point {
    x: number;
    y: number;
}

export interface Position extends Point {
    floors: number[];
}

export interface NamedId {
    id: number;
    name: string;
}

export type NamedPoint = NamedId & Point;
export type NamedPosition = NamedId & Position;

export interface Room extends NamedPoint {
    poly: Point[];
}

export interface BombLocation extends NamedId {
    position_a: NamedPosition;
    position_b: NamedPosition;
}

// Map JSON layout

export interface MapData {
    display_name: string;
    floors: NamedId[];
    spawn_locations: NamedPoint[];
    bomb_locations: BombLocation[];
    waypoints: {
        cameras?: Position[];
        fire_extinguishers?: Position[];
        gas_pipes?: Position[];
        hatches?: Position[];
        stairs?: Position[];
        ladders?: Position[];
        drone_vents?: Position[];
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

