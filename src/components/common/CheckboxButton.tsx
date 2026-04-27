import {Button} from "antd";
import {type ReactNode, useState} from "react";
import {CheckSquareOutlined, CloseSquareOutlined} from "@ant-design/icons";

interface CheckboxButtonProps {
  children: ReactNode;
  toggled?: boolean;
  disabled?: boolean;
  onToggle?: (value: boolean) => boolean | void;
}

export default function CheckboxButton(props: CheckboxButtonProps) {
  const [checked, setChecked] = useState(props.toggled ?? false);

  return (
      <Button
          type={checked ? 'primary' : 'default'}
          icon={checked ? <CheckSquareOutlined/> : <CloseSquareOutlined/>}
          onClick={() => {
            if (!props.onToggle?.(!checked)) setChecked(!checked);
          }}
          disabled={props.disabled}
      >{props.children}</Button>
  );
}
