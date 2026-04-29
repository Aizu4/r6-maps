import {createContext, useContext} from 'react';
import type {MapData} from "../lib/types.ts";

export interface MapDisplaySettings {
  selectedFloor: number;
  selectedPoiCategories: (keyof MapData['waypoints'])[];
  selectedBombLocation: number | null;
  showSpawns: boolean;
  showRooms: boolean;
  showCoordinates: boolean;
  captureCoordinates: boolean;
}

export const defaultSettings: MapDisplaySettings = {
  selectedFloor: 1,
  selectedPoiCategories: [],
  selectedBombLocation: null,
  showSpawns: false,
  showRooms: false,
  showCoordinates: false,
  captureCoordinates: false,
};

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
