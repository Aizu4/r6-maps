import {useMapData} from "../../../hooks/useMapData";
import {useMapDisplaySettings} from "../../../hooks/useMapDisplaySettings";
import {useMemo} from "react";
import {Cascader} from "antd";
import type {MapData, Option} from "../../../lib/types.ts";

type WaypointCategory = keyof MapData['waypoints'];

const POI_FRIENDLY_NAMES: Record<WaypointCategory, string> = {
  cameras: 'Cameras',
  fire_extinguishers: 'Fire Extinguishers',
  gas_pipes: 'Gas Pipes',
  hatches: 'Hatches',
  stairs: 'Stairs',
  ladders: 'Ladders',
};

export function WaypointSelect() {
  const {mapData} = useMapData();
  const {displaySettings, updateDisplaySettings} = useMapDisplaySettings();

  const displayOptions = useMemo<Option<string>[]>(() => {
    return (Object.keys(mapData.waypoints) as WaypointCategory[])
        .map(key => ({
          value: key,
          label: POI_FRIENDLY_NAMES[key],
        }))
  }, [mapData.waypoints]);

  return (
      <Cascader
          placeholder="Points of Interest"
          options={displayOptions}
          value={displaySettings.selectedPoiCategories.map(cat => [cat])}
          onChange={val => updateDisplaySettings({selectedPoiCategories: val.map(v => v[0] as keyof MapData['waypoints'])})}
          multiple
          maxTagCount={0}
          maxTagPlaceholder={() => `${displaySettings.selectedPoiCategories.length} selected`}
      />
  );
}