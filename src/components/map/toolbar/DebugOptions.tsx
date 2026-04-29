import {useMapDisplaySettings} from "../../../hooks/useMapDisplaySettings";
import {useMemo} from "react";
import {Cascader} from "antd";
import type {Option} from "../../../lib/types.ts";

const DEBUG_OPTIONS: Option<string>[] = [
  {value: 'show_coordinates', label: 'Show Coordinates'},
  {value: 'capture_coordinates', label: 'Capture Coordinates on Click'},
];

export function DebugOptions() {
  const {displaySettings, updateDisplaySettings} = useMapDisplaySettings();

  const value = useMemo(() => [
    ...(displaySettings.showCoordinates ? [['show_coordinates']] : []),
    ...(displaySettings.captureCoordinates ? [['capture_coordinates']] : []),
  ], [displaySettings.showCoordinates, displaySettings.captureCoordinates]);

  return (
      <Cascader
          placeholder="Debug Options"
          options={DEBUG_OPTIONS}
          value={value}
          onChange={val => updateDisplaySettings({
            showCoordinates: val.some(v => v[0] === 'show_coordinates'),
            captureCoordinates: val.some(v => v[0] === 'capture_coordinates'),
          })}
          multiple
      />
  );
}