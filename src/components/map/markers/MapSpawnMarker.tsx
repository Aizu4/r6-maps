import React from 'react';
import {Tooltip} from 'antd';
import type {SpawnLocation} from '../../../types';

interface MapSpawnMarkerProps {
  spawn: SpawnLocation;
}

const className = 'absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer pointer-events-auto';
const color = '#22c55e';

export default function MapSpawnMarker({spawn}: MapSpawnMarkerProps) {
  const markerStyle: React.CSSProperties = {left: spawn.position.x, top: spawn.position.y, backgroundColor: color};

  return (
    <Tooltip title={spawn.name}>
      <div className={className} style={markerStyle}>S</div>
    </Tooltip>
  );
}
