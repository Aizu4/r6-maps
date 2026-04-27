import {createContext, type ReactNode, useContext} from 'react';
import type {MapData} from "../../types.ts";
import {ALL_MAPS} from "../../data";
import {useParams} from "react-router-dom";

interface MapDataContextType {
  mapData: MapData;
}

const MapDataContext = createContext<MapDataContextType | null>(null);

export default function MapDataProvider({children}: { children: ReactNode }) {
  const {mapSlug} = useParams<{ mapSlug: string }>();
  const mapData = ALL_MAPS[mapSlug!];

  return <MapDataContext.Provider value={{mapData}} children={children}/>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMapData() {
  const context = useContext(MapDataContext);
  if (!context) throw new Error('useMapData must be used within a MapDataProvider');
  return context;
}