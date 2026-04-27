import {type ReactNode, useState} from 'react';
import type {MapDisplaySettings} from "../../types.ts";
import {MapDisplaySettingsContext} from "../../hooks/useMapDisplaySettings.ts";

const defaultSettings: MapDisplaySettings = {
  currentFloor: 1,
  selectedDisplay: [],
  selectedBomb: [],
  showSpawns: false,
  show_coordinates: false,
};

export default function MapDisplaySettingsProvider({children}: { children: ReactNode }) {
  const [displaySettings, setDisplaySettings] = useState<MapDisplaySettings>(defaultSettings);

  function updateDisplaySettings(updatedSettings: Partial<MapDisplaySettings>) {
    setDisplaySettings((prevSettings) => ({
      ...prevSettings,
      ...updatedSettings,
    }));
  }

  return <MapDisplaySettingsContext.Provider value={{displaySettings, updateDisplaySettings}} children={children}/>;
}
