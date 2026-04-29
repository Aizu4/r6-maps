import {Button, Flex} from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';
import {DebugOptions} from "./DebugOptions";
import {WaypointSelect} from "./WaypointSelect";
import {BombSelect} from "./BombSelect";
import {FloorSelect} from "./FloorSelect";
import CheckboxButton from "../../common/CheckboxButton.tsx";
import {useMapDisplaySettings} from "../../../hooks/useMapDisplaySettings.ts";

interface ToolbarProps {
  onBack: () => void;
  debugEnabled: boolean;
}

export default function Toolbar({onBack, debugEnabled}: ToolbarProps) {
  const {updateDisplaySettings} = useMapDisplaySettings();

  return (
      <Flex wrap gap="small" className="absolute z-10 top-3 left-3 right-3">
        <Button
            icon={<ArrowLeftOutlined/>}
            onClick={onBack}
        >Back</Button>

        <FloorSelect/>

        <WaypointSelect/>

        <BombSelect/>

        <CheckboxButton
            onToggle={v => updateDisplaySettings({showSpawns: v})}
        >Spawn Points</CheckboxButton>

        <CheckboxButton
            onToggle={v => updateDisplaySettings({showRooms: v})}
        >Rooms</CheckboxButton>

        {debugEnabled && (
            <>
              <div className="flex-1"/>
              <DebugOptions/>
            </>)}
      </Flex>
  );
}


