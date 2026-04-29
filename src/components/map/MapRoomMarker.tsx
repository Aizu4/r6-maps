import React, {useState} from 'react';
import type {Room} from '../../types.ts';
import {useMapData} from "../../hooks/useMapData.ts";

interface MapRoomMarkerProps {
  roomData: Room;
  imgSize?: { width: number; height: number };
}

export default function MapRoomMarker({roomData, imgSize}: MapRoomMarkerProps) {
  return (
      <>
        {roomData.perimeter && <RoomPerimeter roomData={roomData} imgSize={imgSize}/>}
        <RoomLabel roomData={roomData} imgSize={imgSize}/>
      </>
  );
}

function RoomPerimeter({roomData, imgSize}: MapRoomMarkerProps) {
  const {mapMetadata} = useMapData();

  const [hovered, setHovered] = useState(false);

  const points = roomData.perimeter!.map(p => `${p.x},${p.y}`).join(' ');

  const svgStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  };

  return (
      <svg
          style={svgStyle}
          viewBox={imgSize ? `0 0 ${imgSize.width} ${imgSize.height}` : undefined}
          preserveAspectRatio="none"
      >
        <polygon
            points={points}
            fill={hovered ? `rgb(from ${mapMetadata.highlightColor} r g b / 0.3)` : 'rgba(0,0,0,0)'}
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
  const left = imgSize ? `${(roomData.position.x / imgSize.width) * 100}%` : roomData.position.x;
  const top = imgSize ? `${(roomData.position.y / imgSize.height) * 100}%` : roomData.position.y;

  const style: React.CSSProperties = {
    position: 'absolute',
    left,
    top,
    fontSize: 14,
    fontFamily: '"Anton", sans-serif',
    color: 'rgba(255,255,255,0.85)',
    pointerEvents: 'none',
    userSelect: 'none',
    whiteSpace: 'nowrap',
  }

  const foregroundStyle: React.CSSProperties = {
    ...style,
    transform: 'translate(-50%, -50%)',
    zIndex: 3,
  };

  const backgroundStyle: React.CSSProperties = {
    ...style,
    transform: 'translate(-50%, -49%)',
    WebkitTextStroke: '4px black',
    zIndex: 2,
  };

  return (
      <>
        <div aria-hidden="true" style={backgroundStyle}>{roomData.name}</div>
        <div style={foregroundStyle}>{roomData.name}</div>
      </>
  );
}