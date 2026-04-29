import {useMapData} from "../../../hooks/useMapData";
import {useMapDisplaySettings} from "../../../hooks/useMapDisplaySettings";
import {useMemo} from "react";
import {Cascader} from "antd";
import type {Option} from "../../../lib/types.ts";

export function BombSelect() {
  const {mapData} = useMapData();
  const {displaySettings, updateDisplaySettings} = useMapDisplaySettings();

  const bombOptions = useMemo<Option<number>[]>(() => {
    return mapData.bomb_locations.map(b => ({value: b.id, label: b.name}))
  }, [mapData.bomb_locations]);

  return (
      <Cascader
          placeholder="Bomb Site"
          options={bombOptions}
          value={displaySettings.selectedBombLocation != null ? [displaySettings.selectedBombLocation] : undefined}
          onChange={val => updateDisplaySettings({selectedBombLocation: val[0]})}
      />
  );
}