import {type ReactNode, useState} from 'react';
import type {MapDisplaySettings} from "../../types.ts";
import {MapDisplaySettingsContext} from "../../hooks/useMapDisplaySettings.ts";

const defaultSettings: MapDisplaySettings = {
  current_floor: 1,
  selectedPoiCategories: [],
  selectedBombLocation: null,
  showSpawns: false,
  showRooms: false,
  showCoordinates: false,
  captureCoordinates: false,
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
