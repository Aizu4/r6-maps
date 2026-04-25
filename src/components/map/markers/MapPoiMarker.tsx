import React from 'react';
import {Tooltip} from 'antd';
import type {Poi, PoiType} from '../../../types';
import {POI_STYLES} from '../../../types';

interface MapPoiMarkerProps {
  type: PoiType;
  waypoint: Poi;
}

const className = 'absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer pointer-events-auto';

export default function MapPoiMarker({type, waypoint}: MapPoiMarkerProps) {
  const {color, label} = POI_STYLES[type];
  const markerStyle: React.CSSProperties = {left: waypoint.position.x, top: waypoint.position.y, backgroundColor: color};

  return (
    <Tooltip title={waypoint.note}>
      <div className={className} style={markerStyle}>{label}</div>
    </Tooltip>
  );
}
