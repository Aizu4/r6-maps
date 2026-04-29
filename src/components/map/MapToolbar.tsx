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
          value={displaySettings.currentFloor}
          onChange={e => updateDisplaySettings({currentFloor: Number(e.target.value)})}
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
      label: POI_METADATA[key].friendlyName,
    }))
  }, [mapData.poi]);

  return (
      <Cascader
          placeholder="Points of Interest"
          options={displayOptions}
          value={displaySettings.selectedPoiCategories.map(cat => [cat])}
          onChange={val => updateDisplaySettings({selectedPoiCategories: (val as string[][]).map(v => v[0] as PoiCategory)})}
          multiple
          maxTagCount={0}
          maxTagPlaceholder={() => `${displaySettings.selectedPoiCategories.length} selected`}
      />
  );
}

function BombSiteSelect() {
  const {mapData} = useMapData();
  const {displaySettings, updateDisplaySettings} = useMapDisplaySettings();

  const bombOptions = useMemo<Option[]>(() => {
    return mapData.bombLocations.map(b => ({value: b.name, label: b.name}))
  }, [mapData.bombLocations]);

  return (
      <Cascader
          placeholder="Bomb Site"
          options={bombOptions}
          value={displaySettings.selectedBombLocation != null ? [displaySettings.selectedBombLocation] : undefined}
          onChange={val => updateDisplaySettings({selectedBombLocation: (val as string[]).length > 0 ? (val as string[])[0] : null})}
      />
  );
}

function SpawnPointToggle() {
  const {updateDisplaySettings} = useMapDisplaySettings();

  return (
      <CheckboxButton
          onToggle={v => updateDisplaySettings({showSpawns: v})}
      >Spawn Points</CheckboxButton>
  );
}

function RoomToggle() {
  const {updateDisplaySettings} = useMapDisplaySettings();

  return (
      <CheckboxButton
          onToggle={v => updateDisplaySettings({showRooms: v})}
      >Rooms</CheckboxButton>
  );
}

function DebugOptions() {
  const {displaySettings, updateDisplaySettings} = useMapDisplaySettings();

  const debugOptions = [
    {
      value: 'showCoordinates',
      label: 'Show Coordinates'
    },
    {
      value: 'captureCoordinates',
      label: 'Capture Coordinates on Click'
    },
  ]

  const value = [
    ...(displaySettings.showCoordinates    ? [['showCoordinates']]    : []),
    ...(displaySettings.captureCoordinates ? [['captureCoordinates']] : []),
  ];

  return (
      <Cascader
          placeholder="Debug Options"
          options={debugOptions}
          value={value}
          onChange={val => updateDisplaySettings({
            showCoordinates:    (val as string[][]).some(v => v[0] === 'showCoordinates'),
            captureCoordinates: (val as string[][]).some(v => v[0] === 'captureCoordinates'),
          })}
          multiple
      />
  );
}
