import React from 'react';
import {Avatar, Tooltip} from 'antd';
import type {BombLocation, Position} from '../../../types';

interface MapBombMarkerProps {
  bomb: BombLocation;
  currentFloor: string;
  allFloors: string[];
}

const color = '#eab308';

function BombPosition({position, label, name, currentFloor, allFloors}: {
  position: Position;
  label: string;
  name: string;
  currentFloor: string;
  allFloors: string[];
}) {
  const isOnFloor = position.floors.includes(currentFloor);
  const bombIdx = allFloors.indexOf(position.floors[0]);
  const currentIdx = allFloors.indexOf(currentFloor);
  const arrow = bombIdx > currentIdx ? '▲' : '▼';

  const markerStyle: React.CSSProperties = {left: position.x, top: position.y, backgroundColor: color};
  const className = `pointer-events-auto ${isOnFloor ? '' : ' opacity-40'}`;

  return (
      <Tooltip title={`${name} – ${label}`}>
        <Avatar shape="square" className={className} style={markerStyle}>{isOnFloor ? label : arrow}</Avatar>
      </Tooltip>
  );
}

export default function MapBombMarker({bomb, currentFloor, allFloors}: MapBombMarkerProps) {
  return (
      <>
        <BombPosition position={bomb.position_a} label="A" name={bomb.name} currentFloor={currentFloor}
                      allFloors={allFloors}/>
        <BombPosition position={bomb.position_b} label="B" name={bomb.name} currentFloor={currentFloor}
                      allFloors={allFloors}/>
      </>
  );
}
