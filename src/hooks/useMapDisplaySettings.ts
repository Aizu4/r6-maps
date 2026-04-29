import {createContext, useContext} from 'react';

import type {PoiData} from "./useMapData.ts";

export interface MapDisplaySettings {
  currentFloor: number;
  selectedPoiCategories: PoiCategory[];
  selectedBombLocation: string | null;
  showSpawns: boolean;
  showRooms: boolean;
  showCoordinates: boolean;
  captureCoordinates: boolean;
}

export type PoiCategory = keyof PoiData;

export const defaultSettings: MapDisplaySettings = {
  currentFloor: 1,
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
