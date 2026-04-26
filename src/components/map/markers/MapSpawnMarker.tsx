import React from 'react';
import {Avatar, Tooltip} from 'antd';
import type {SpawnLocation} from '../../../types';

interface MapSpawnMarkerProps {
  spawn: SpawnLocation;
}

const color = '#22c55e';

export default function MapSpawnMarker({spawn}: MapSpawnMarkerProps) {
  const markerStyle: React.CSSProperties = {left: spawn.position.x, top: spawn.position.y, backgroundColor: color};

  return (
      <Tooltip title={spawn.name}>
        <Avatar className={'pointer-events-auto'} style={markerStyle}>S</Avatar>
      </Tooltip>
  );
}
