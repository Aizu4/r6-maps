import {Tooltip} from 'antd';
import type {Position} from "../../../lib/types.ts";
import * as React from "react";

export interface MapMarkerProps {
  position: Position;
  backgroundColor: string;
  foregroundColor: string;
  opacity: number;
  shape: 'circle' | 'square';
  size: number;
  icon?: string;
  label?: string;
  hoverText?: string;
  imgSize?: { width: number; height: number };
}

export default function Marker(props: MapMarkerProps) {
  const {position, imgSize} = props;

  const style: React.CSSProperties = {
    left: imgSize ? `${(position.x / imgSize.width) * 100}%` : position.x,
    top: imgSize ? `${(position.y / imgSize.height) * 100}%` : position.y,
    width: props.size,
    height: props.size,
    color: props.foregroundColor,
    backgroundColor: props.backgroundColor,
    opacity: props.opacity,
    fontSize: props.size * 0.43
  }

  const content = props.icon
      ? <img className="h-[60%] w-[60%]" src={`/icons/${props.icon}.svg`} alt={props.hoverText}/>
      : props.label

  return (
      <Tooltip title={props.hoverText}>
        <div
            className={`absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-semibold cursor-default shrink-0 ${props.shape === 'circle' ? 'rounded-full' : 'rounded'}`}
            style={style}
        >{content}
        </div>
      </Tooltip>
  );
}
