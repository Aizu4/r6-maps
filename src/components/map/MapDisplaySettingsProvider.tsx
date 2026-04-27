import {createContext, type ReactNode, useContext, useState} from 'react';
import type {MapDisplaySettings} from "../../types.ts";

interface MapDisplaySettingsContextType {
  displaySettings: MapDisplaySettings;
  updateDisplaySettings: (updatedSettings: Partial<MapDisplaySettings>) => void;
}

const defaultSettings: MapDisplaySettings = {
  currentFloor: 1,
  selectedDisplay: [],
  selectedBomb: [],
  showSpawns: false,
  show_coordinates: false,
};

const MapDisplaySettingsContext = createContext<MapDisplaySettingsContextType | null>(null);

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

// eslint-disable-next-line react-refresh/only-export-components
export function useMapDisplaySettings() {
  const context = useContext(MapDisplaySettingsContext);
  if (!context) throw new Error('useMapDisplaySettings must be used within a MapDisplaySettingsProvider');
  return context;
}