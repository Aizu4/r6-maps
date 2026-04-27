import React, {useMemo} from 'react';
import {Avatar, Tooltip} from 'antd';
import {type Waypoint, WAYPOINT_PROPERTIES} from '../../types';
import {useMapDisplaySettings} from "./MapDisplaySettingsProvider.tsx";

interface MapMarkerProps {
  waypoint: Waypoint;
  imgSize?: { width: number; height: number };
}

export default function MapMarker({waypoint, imgSize}: MapMarkerProps) {
  const {displaySettings} = useMapDisplaySettings();

  const {label, color, textColor, shape, opacity} = useMemo(() => {
    const props = WAYPOINT_PROPERTIES[waypoint.type];
    if (['bomb_a', 'bomb_b'].includes(waypoint.type)) {
      if (Math.min(...waypoint.position.floors) > displaySettings.currentFloor) {
        return {...props, label: '▲', opacity: 0.5};
      } else if (Math.max(...waypoint.position.floors) < displaySettings.currentFloor) {
        return {...props, label: '▼', opacity: 0.5};
      }
    }
    return {...props, opacity: 1};
  }, [waypoint.type, waypoint.position.floors, displaySettings.currentFloor]);

  const left = imgSize ? `${(waypoint.position.x / imgSize.width) * 100}%` : waypoint.position.x;
  const top = imgSize ? `${(waypoint.position.y / imgSize.height) * 100}%` : waypoint.position.y;

  const style: React.CSSProperties = {
    position: 'absolute',
    pointerEvents: 'auto',
    left,
    top,
    backgroundColor: color,
    color: textColor,
    opacity,
  };

  return (
      <Tooltip title={waypoint.note}>
        <Avatar shape={shape} style={style}>{label}</Avatar>
      </Tooltip>
  );
}
