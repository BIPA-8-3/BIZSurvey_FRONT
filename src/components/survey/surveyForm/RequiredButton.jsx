import * as React from "react";
import CheckIcon from "@mui/icons-material/Check";
import ToggleButton from "@mui/material/ToggleButton";
import { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";

export default function RequiredButton({ index, changeRequired }) {
  const [selected, setSelected] = React.useState(false);
  const [text, setText] = useState("필수 off");

  const RequiredStyle = {
    padding: "0 !important",
    width: "80px",
    height: "30px",
    border: "0",
    borderRadius: "30px",
  };

  const label = { inputProps: { "aria-label": "Switch demo" } };

  useEffect(() => {
    if (selected) {
      setText("필수 on");
    } else {
      setText("필수 off");
    }
    changeRequired(index);
  }, [selected]);

  return (
    <>
      <span style={{ fontSize: "13px" }}>필수</span> <Switch {...label} />
    </>
  );
}
