import {Button, Cascader, Flex, Radio} from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';
import type {PoiCategory, PoiData} from "../../types.ts";
import {type ReactNode, useMemo} from "react";
import CheckboxButton from "../common/CheckboxButton.tsx";
import {useMapDisplaySettings} from "../../hooks/useMapDisplaySettings.ts";
import {useMapData} from "../../hooks/useMapData.ts";
import {POI_METADATA} from "../../constants.ts";

interface Option {
  value: string;
  label: string;
}

interface ToolbarProps {
  onBack: () => void;
  debugEnabled: boolean;
}


export default function MapToolbar(props: ToolbarProps) {
  return (
      <Flex wrap gap="small" className="absolute z-10 top-3 left-3 right-3">
        <BackButton onBack={props.onBack}/>
        <FloorSelect/>
        <PoiSelect/>
        <BombSiteSelect/>
        <SpawnPointToggle/>
        <RoomToggle/>
        {props.debugEnabled && <div style={{flex: 1}}/>}
        {props.debugEnabled && <DebugOptions/>}
      </Flex>
  );
}

function BackButton({onBack}: Partial<ToolbarProps>): ReactNode {
  return (
      <Button
          icon={<ArrowLeftOutlined/>}
          onClick={onBack}
      >Back</Button>
  );
}

function FloorSelect() {
  const {mapData} = useMapData();
  const {displaySettings, updateDisplaySettings} = useMapDisplaySettings();

  return (
      <Radio.Group
          buttonStyle="solid"
          value={displaySettings.current_floor}
          onChange={e => updateDisplaySettings({current_floor: Number(e.target.value)})}
      >
        {mapData.floors.map(({id, name}) => (
            <Radio.Button key={id} value={id}>{name}</Radio.Button>
        ))}
      </Radio.Group>
  );
}

function PoiSelect() {
  const {mapData} = useMapData();
  const {displaySettings, updateDisplaySettings} = useMapDisplaySettings();

  const displayOptions = useMemo<Option[]>(() => {
    return (Object.keys(mapData.poi) as (keyof PoiData)[]).map(key => ({
      value: key as PoiCategory,
      label: POI_METADATA[key].friendly_name,
    }))
  }, [mapData.poi]);

  return (
      <Cascader
          placeholder="Points of Interest"
          options={displayOptions}
          value={displaySettings.selected_poi_categories.map(cat => [cat])}
          onChange={val => updateDisplaySettings({selected_poi_categories: (val as string[][]).map(v => v[0] as PoiCategory)})}
          multiple
          maxTagCount={0}
          maxTagPlaceholder={() => `${displaySettings.selected_poi_categories.length} selected`}
      />
  );
}

function BombSiteSelect() {
  const {mapData} = useMapData();
  const {displaySettings, updateDisplaySettings} = useMapDisplaySettings();

  const bombOptions = useMemo<Option[]>(() => {
    return mapData.bomb_locations.map(b => ({value: b.name, label: b.name}))
  }, [mapData.bomb_locations]);

  return (
      <Cascader
          placeholder="Bomb Site"
          options={bombOptions}
          value={displaySettings.selected_bomb_location != null ? [displaySettings.selected_bomb_location] : undefined}
          onChange={val => updateDisplaySettings({selected_bomb_location: (val as string[]).length > 0 ? (val as string[])[0] : null})}
      />
  );
}

function SpawnPointToggle() {
  const {updateDisplaySettings} = useMapDisplaySettings();

  return (
      <CheckboxButton
          onToggle={v => updateDisplaySettings({show_spawns: v})}
      >Spawn Points</CheckboxButton>
  );
}

function RoomToggle() {
  const {updateDisplaySettings} = useMapDisplaySettings();

  return (
      <CheckboxButton
          onToggle={v => updateDisplaySettings({show_rooms: v})}
      >Rooms</CheckboxButton>
  );
}

function DebugOptions() {
  const {displaySettings, updateDisplaySettings} = useMapDisplaySettings();

  const debugOptions = [
    {
      value: 'show_coordinates',
      label: 'Show Coordinates'
    },
    {
      value: 'capture_coordinates',
      label: 'Capture Coordinates on Click'
    },
  ]

  const value = [
    ...(displaySettings.show_coordinates    ? [['show_coordinates']]    : []),
    ...(displaySettings.capture_coordinates ? [['capture_coordinates']] : []),
  ];

  return (
      <Cascader
          placeholder="Debug Options"
          options={debugOptions}
          value={value}
          onChange={val => updateDisplaySettings({
            show_coordinates:    (val as string[][]).some(v => v[0] === 'show_coordinates'),
            capture_coordinates: (val as string[][]).some(v => v[0] === 'capture_coordinates'),
          })}
          multiple
      />
  );
}
