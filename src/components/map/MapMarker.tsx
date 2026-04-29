import {useMemo} from 'react';
import {Tooltip} from 'antd';
import {useMapDisplaySettings} from "../../hooks/useMapDisplaySettings.ts";
import {useMapData, type Waypoint} from "../../hooks/useMapData.ts";
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
    const {floors} = waypoint.position;
    if (floors.length === 0) {
      return {...props, opacity: 1};
    }
    const minFloor = Math.min(...floors);
    const maxFloor = Math.max(...floors);
    if (['bomb_a', 'bomb_b'].includes(waypoint.type)) {
      if (displaySettings.currentFloor < minFloor) {
        return {...props, label: '▲', opacity: 0.4};
      } else if (displaySettings.currentFloor > maxFloor) {
        return {...props, label: '▼', opacity: 0.4};
      }
    }
    if (waypoint.type === 'hatch' && !floors.includes(displaySettings.currentFloor)) {
      return {...props, opacity: 0.4};
    }
    if (waypoint.type === 'stairs' && floors.length > 1) {
      if (displaySettings.currentFloor === minFloor) {
        return {...props, icon: 'stairs_up', opacity: 1};
      } else if (displaySettings.currentFloor === maxFloor) {
        return {...props, icon: 'stairs_down', opacity: 1};
      }
    }
    return {...props, opacity: 1};
  }, [waypoint.type, waypoint.position, displaySettings.currentFloor]);

  const left = imgSize ? `${(waypoint.position.x / imgSize.width) * 100}%` : waypoint.position.x;
  const top = imgSize ? `${(waypoint.position.y / imgSize.height) * 100}%` : waypoint.position.y;

  return (
      <Tooltip title={waypoint.note}>
        <div
            className={`absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-semibold cursor-default shrink-0 ${shape === 'circle' ? 'rounded-full' : 'rounded'}`}
            style={{left, top, width: markerSize, height: markerSize, backgroundColor: color, color: text_color, opacity, fontSize: markerSize * 0.43}}
        >
          {!icon && label}
          {icon && <img className="h-[60%] w-[60%]" src={`/icons/${icon}.svg`} alt={waypoint.note}/>}
        </div>
      </Tooltip>
  );
}
