import React, {useMemo} from 'react';
import {Tooltip} from 'antd';
import type {Waypoint} from '../../types';
import {useMapDisplaySettings} from "../../hooks/useMapDisplaySettings.ts";
import {useMapData} from "../../hooks/useMapData.ts";
import {WAYPOINT_PROPERTIES} from "../../constants.ts";

interface MapMarkerProps {
  waypoint: Waypoint;
  imgSize?: { width: number; height: number };
}

export default function MapMarker({waypoint, imgSize}: MapMarkerProps) {
  const {displaySettings} = useMapDisplaySettings();
  const {mapData} = useMapData();
  const markerSize = mapData.metadata.marker_size;

  const {label, icon, color, text_color, shape, opacity} = useMemo(() => {
    const props = WAYPOINT_PROPERTIES[waypoint.type];
    if (waypoint.position.floors.length === 0) {
      return {...props, opacity: 1};
    }
    if (['bomb_a', 'bomb_b'].includes(waypoint.type)) {
      if (displaySettings.current_floor < Math.min(...waypoint.position.floors)) {
        return {...props, label: '▲', opacity: 0.4};
      } else if (displaySettings.current_floor > Math.max(...waypoint.position.floors)) {
        return {...props, label: '▼', opacity: 0.4};
      }
    }
    if (waypoint.type === 'hatch' && !waypoint.position.floors.includes(displaySettings.current_floor)) {
      return {...props, opacity: 0.4};
    }
    if (waypoint.type === 'stairs' && waypoint.position.floors.length > 1) {
      if (displaySettings.current_floor === Math.min(...waypoint.position.floors)) {
        return {...props, icon: 'stairs_up', opacity: 1};
      } else if (displaySettings.current_floor === Math.max(...waypoint.position.floors)) {
        return {...props, icon: 'stairs_down', opacity: 1};
      }
    }
    return {...props, opacity: 1};
  }, [waypoint.type, waypoint.position.floors, displaySettings.current_floor]);

  const left = imgSize ? `${(waypoint.position.x / imgSize.width) * 100}%` : waypoint.position.x;
  const top = imgSize ? `${(waypoint.position.y / imgSize.height) * 100}%` : waypoint.position.y;

  const divStyle: React.CSSProperties = {
    position: 'absolute',
    pointerEvents: 'auto',
    left,
    top,
    transform: 'translate(-50%, -50%)',
    width: markerSize,
    height: markerSize,
    borderRadius: shape === 'circle' ? '50%' : 4,
    backgroundColor: color,
    color: text_color,
    opacity,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: markerSize * 0.43,
    fontWeight: 600,
    cursor: 'default',
    flexShrink: 0,
  };

  const imgStyle: React.CSSProperties = {
    height: '60%',
    width: '60%',
  }

  return (
      <Tooltip title={waypoint.note}>
        <div style={divStyle}>
          {!icon && label}
          {icon && <img style={imgStyle} src={`/icons/${icon}.svg`} alt={waypoint.note}/>}
        </div>
      </Tooltip>
  );
}
