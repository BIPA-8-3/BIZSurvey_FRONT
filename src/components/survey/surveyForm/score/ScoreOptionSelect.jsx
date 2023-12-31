import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import * as React from "react";
import { FaListOl } from "react-icons/fa";
import "../../../../style/Common.css";
import style from "../../../../style/survey/OptionSelect.module.css";
import IconWithText from "../../../common/IconWithText";

export default function ScoreOptionSelect({ option, setOption, idx, isScore }) {
  const handleChange = (event, type) => {
    setOption(idx, type);
  };

  const menuItemStyle = {
    padding: "5px 0 5px 10px !important",
    width: "150px",
    height: "37px",
    backgroundColor: "white",
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 100, height: 35, padding: 0 }}>
      <Select
        value={isScore ? "MULTIPLE_CHOICE" : option}
        onChange={(e) => handleChange(e, e.target.value)}
        displayEmpty
        defaultValue={option}
        inputProps={{ "aria-label": "Without label" }}
        sx={menuItemStyle}
      >
        <MenuItem value={"MULTIPLE_CHOICE"} sx={{ width: 150, padding: 1.5 }}>
          <div className={style.singleChoiceIcon}>
            <IconWithText
              text={"객관식"}
              fontsize={"10.5px"}
              fontweight={"bold"}
              fontcolor={"#304eb9"}
            >
              <FaListOl />
            </IconWithText>
          </div>
        </MenuItem>
      </Select>
    </FormControl>
  );
}
