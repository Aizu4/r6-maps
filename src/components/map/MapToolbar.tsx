import {Button, Cascader, Flex, Radio} from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';
import type {PoiData} from "../../types.ts";
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
      value: key,
      label: POI_METADATA[key].friendly_name,
    }))
  }, [mapData.poi]);

  return (
      <Cascader
          placeholder="Points of Interest"
          options={displayOptions}
          value={displaySettings.selectedDisplay}
          onChange={val => updateDisplaySettings({selectedDisplay: val as string[][]})}
          multiple
          maxTagCount={0}
          maxTagPlaceholder={() => `${displaySettings.selectedDisplay.length} selected`}
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
          value={displaySettings.selectedBomb}
          onChange={val => updateDisplaySettings({selectedBomb: val as string[]})}
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

function DebugOptions() {
  const {displaySettings, updateDisplaySettings} = useMapDisplaySettings();

  const debugOptions = [{
    value: 'show_coordinates',
    label: 'Show Coordinates'
  }]

  const value = displaySettings.show_coordinates ? [['show_coordinates']] : [];

  return (
      <Cascader
          placeholder="Debug Options"
          options={debugOptions}
          value={value}
          onChange={val => updateDisplaySettings({show_coordinates: (val as string[][]).some(v => v[0] === 'show_coordinates')})}
          multiple
      />
  );
}
