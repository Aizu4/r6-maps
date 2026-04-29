import {useMapData} from "../../../hooks/useMapData";
import {useMapDisplaySettings} from "../../../hooks/useMapDisplaySettings";
import {Radio} from "antd";

export function FloorSelect() {
  const {mapData} = useMapData();
  const {displaySettings, updateDisplaySettings} = useMapDisplaySettings();

  return (
      <Radio.Group
          buttonStyle="solid"
          value={displaySettings.selectedFloor}
          onChange={e => updateDisplaySettings({selectedFloor: Number(e.target.value)})}
      >
        {mapData.floors.map(({id, name}) => (
            <Radio.Button key={id} value={id}>{name}</Radio.Button>
        ))}
      </Radio.Group>
  );
}