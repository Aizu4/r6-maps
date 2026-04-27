import {createContext, useContext} from 'react';
import type {MapDisplaySettings} from "../types.ts";

interface MapDisplaySettingsContextType {
  displaySettings: MapDisplaySettings;
  updateDisplaySettings: (updatedSettings: Partial<MapDisplaySettings>) => void;
}

export const MapDisplaySettingsContext = createContext<MapDisplaySettingsContextType | null>(null);

export function useMapDisplaySettings() {
  const context = useContext(MapDisplaySettingsContext);
  if (!context) throw new Error('useMapDisplaySettings must be used within a MapDisplaySettingsProvider');
  return context;
}
