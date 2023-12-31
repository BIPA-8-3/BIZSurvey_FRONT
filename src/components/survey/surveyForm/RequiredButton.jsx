import Switch from "@mui/material/Switch";
import * as React from "react";

export default function RequiredButton({ required, index, changeRequired }) {
  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <>
      <span style={{ fontSize: "13px" }}>필수</span>{" "}
      <Switch
        {...label}
        checked={required}
        onChange={() => changeRequired(index)}
      />
    </>
  );
}
