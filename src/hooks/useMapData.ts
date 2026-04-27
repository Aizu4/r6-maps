import {createContext, useContext} from 'react';
import type {MapData} from "../types.ts";

interface MapDataContextType {
  mapData: MapData;
}

export const MapDataContext = createContext<MapDataContextType | null>(null);

export function useMapData() {
  const context = useContext(MapDataContext);
  if (!context) throw new Error('useMapData must be used within a MapDataProvider');
  return context;
}
