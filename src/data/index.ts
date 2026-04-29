import type {MapData} from "../lib/types.ts";

const modules = import.meta.glob<{ default: MapData }>('./maps/*.json', { eager: true });

export const ALL_MAPS = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => [
    path.replace('./maps/', '').replace('.json', ''),
    mod.default,
  ])
) as Record<string, MapData>;
