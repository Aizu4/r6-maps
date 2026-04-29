import {useState} from 'react';
import {useMapData} from "../../../hooks/useMapData.ts";
import type {Room} from "../../../lib/types.ts";

interface MapRoomMarkerProps {
  roomData: Room;
  imgSize?: { width: number; height: number };
}

export default function RoomMarker({roomData, imgSize}: MapRoomMarkerProps) {
  return (
      <>
        {roomData.poly && <RoomPerimeter roomData={roomData} imgSize={imgSize}/>}
        <RoomLabel roomData={roomData} imgSize={imgSize}/>
      </>
  );
}

function RoomPerimeter({roomData, imgSize}: MapRoomMarkerProps) {
  const {mapMetadata} = useMapData();

  const [hovered, setHovered] = useState(false);

  const points = roomData.poly.map(p => `${p.x},${p.y}`).join(' ');

  return (
      <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={imgSize ? `0 0 ${imgSize.width} ${imgSize.height}` : undefined}
          preserveAspectRatio="none"
      >
        <polygon
            points={points}
            fill={hovered ? `rgb(from ${mapMetadata.highlight_color} r g b / 0.3)` : 'rgba(0,0,0,0)'}
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="1"
            style={{pointerEvents: 'auto'}}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        />
      </svg>
  );
}

function RoomLabel({roomData, imgSize}: MapRoomMarkerProps) {
  const baseStyle = {
    left: imgSize ? `${(roomData.position.x / imgSize.width) * 100}%` : roomData.position.x,
    top: imgSize ? `${(roomData.position.y / imgSize.height) * 100}%` : roomData.position.y,
    fontFamily: '"Anton", sans-serif'
  };

  return (
      <>
        <div
            aria-hidden="true"
            className="absolute text-xs text-white pointer-events-none select-none whitespace-nowrap -translate-x-1/2 translate-y-[-49%] z-2"
            style={{...baseStyle, WebkitTextStroke: '4px black'}}
        >{roomData.name}</div>
        <div
            className="absolute text-xs text-white pointer-events-none select-none whitespace-nowrap -translate-x-1/2 -translate-y-1/2 z-3"
            style={baseStyle}
        >{roomData.name}</div>
      </>
  );
}