import {type ReactNode, useState} from 'react';
import type {MapDisplaySettings} from "../../types.ts";
import {MapDisplaySettingsContext} from "../../hooks/useMapDisplaySettings.ts";

const defaultSettings: MapDisplaySettings = {
  current_floor: 1,
  selected_poi_categories: [],
  selected_bomb_location: null,
  show_spawns: false,
  show_rooms: false,
  show_coordinates: false,
  capture_coordinates: false,
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
