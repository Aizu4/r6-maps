import {type ReactNode} from 'react';
import {ALL_MAPS} from "../../../data";
import {Navigate, useParams} from "react-router-dom";
import {MapDataContext} from "../../../hooks/useMapData.ts";

export default function MapDataProvider({children}: { children: ReactNode }) {
  const {mapSlug} = useParams<{ mapSlug: string }>();
  const mapData = mapSlug ? ALL_MAPS[mapSlug] : undefined;

  if (!mapData) return <Navigate to="/" replace/>;

  const mapMetadata = mapData.metadata;
  return <MapDataContext.Provider value={{mapData, mapMetadata}} children={children}/>;
}
