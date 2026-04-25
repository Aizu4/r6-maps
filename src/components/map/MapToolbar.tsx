import {Button, Cascader, Flex, Radio} from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';
import type {MapData, PoiType} from "../../types.ts";
import {POI_STYLES} from "../../types.ts";
import {useMemo} from "react";

interface ToolbarProps {
  mapData: MapData;
  currentFloor: string;
  onFloorChange: (floor: string) => void;
  onBack: () => void;
  selectedDisplay: string[][];
  onDisplayChange: (val: string[][]) => void;
  selectedBomb: string[];
  onBombChange: (val: string[]) => void;
}

interface Option {
  value: string;
  label: string;
}

export default function MapToolbar({mapData, currentFloor, onBack, onFloorChange, selectedDisplay, onDisplayChange, selectedBomb, onBombChange}: ToolbarProps) {
  const displayOptions = useMemo<Option[]>(() => [
    ...(Object.keys(mapData.poi) as PoiType[]).map(key => ({
      value: key,
      label: POI_STYLES[key].name,
    })),
    {value: 'spawn_locations', label: 'Spawn Locations'},
    {value: 'rooms', label: 'Room Names'},
  ], [mapData.poi]);

  const bombOptions = useMemo<Option[]>(() =>
    mapData.bomb_locations.map(b => ({value: b.name, label: b.name}))
  , [mapData.bomb_locations]);

  return (
      <Flex gap="small" className="absolute top-4 left-4 z-10">
        <Button icon={<ArrowLeftOutlined/>} onClick={onBack}>Back</Button>
        <Radio.Group value={currentFloor} onChange={e => onFloorChange(e.target.value)}>
          {Object.entries(mapData.floors).map(([key, label]) => (
              <Radio.Button key={key} value={key}>{label}</Radio.Button>
          ))}
        </Radio.Group>
        <Cascader
            placeholder="Filter Settings"
            options={displayOptions}
            value={selectedDisplay}
            onChange={val => onDisplayChange(val as string[][])}
            multiple
            maxTagCount={0}
            maxTagPlaceholder={() => `${selectedDisplay.length} selected`}
        />
        <Cascader
            placeholder="Bomb site"
            options={bombOptions}
            value={selectedBomb}
            onChange={val => onBombChange(val as string[])}
        />
      </Flex>
  );
}
