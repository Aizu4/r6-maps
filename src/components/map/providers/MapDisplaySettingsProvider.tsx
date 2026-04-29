import {type ReactNode, useState} from 'react';
import {
  defaultSettings,
  type MapDisplaySettings,
  MapDisplaySettingsContext
} from "../../../hooks/useMapDisplaySettings.ts";

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
