import React from 'react';
import {Avatar, Tooltip} from 'antd';
import type {Poi, PoiType} from '../../../types';
import {POI_STYLES} from '../../../types';

interface MapPoiMarkerProps {
  type: PoiType;
  waypoint: Poi;
}


export default function MapPoiMarker({type, waypoint}: MapPoiMarkerProps) {
  const {color, label} = POI_STYLES[type];
  const markerStyle: React.CSSProperties = {
    left: waypoint.position.x,
    top: waypoint.position.y,
    backgroundColor: color
  };

  return (
      <Tooltip title={waypoint.note}>
        <Avatar className={'pointer-events-auto'} style={markerStyle}>{label}</Avatar>
      </Tooltip>
  );
}
