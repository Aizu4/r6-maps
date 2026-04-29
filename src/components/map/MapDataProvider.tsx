import {type ReactNode} from 'react';
import {ALL_MAPS} from "../../data";
import {useParams} from "react-router-dom";
import {MapDataContext} from "../../hooks/useMapData.ts";

export default function MapDataProvider({children}: { children: ReactNode }) {
  const {mapSlug} = useParams<{ mapSlug: string }>();
  const mapData = ALL_MAPS[mapSlug!];
  const mapMetadata = mapData.metadata;

  return <MapDataContext.Provider value={{mapData, mapMetadata}} children={children}/>;
}
