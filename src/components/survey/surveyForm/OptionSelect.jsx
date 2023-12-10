import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import * as React from "react";
import { FaListOl } from "react-icons/fa";
import { GrTextAlignFull } from "react-icons/gr";
import { IoMdCloudUpload } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import "../../../style/Common.css";
import style from "../../../style/survey/OptionSelect.module.css";
import IconWithText from "../../common/IconWithText";

export default function OptionSelect({ option, setOption, idx }) {
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
        value={option}
        onChange={(e) => handleChange(e, e.target.value)}
        displayEmpty
        defaultValue={option}
        inputProps={{ "aria-label": "Without label" }}
        sx={menuItemStyle}
      >
        <MenuItem value="" sx={{ fontSize: 12 }}>
          <p style={{ fontSize: "13px" }}>옵션</p>
        </MenuItem>
        <MenuItem
          value={"객관식(택1)" || "SINGLE_CHOICE"}
          sx={{ width: 150, padding: 1.5 }}
        >
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
        <MenuItem value={"객관식(복수형)"} sx={{ width: 150, padding: 1.5 }}>
          <div className={style.multipleChoiceIcon}>
            <IconWithText
              text={"객관식(다중선택)"}
              fontsize={"10.5px"}
              fontweight={"bold"}
              fontcolor={"#304eb9"}
            >
              <FaListOl />
            </IconWithText>
          </div>
        </MenuItem>
        <MenuItem value={"주관식"} sx={{ width: 150, padding: 1.5 }}>
          <div className={style.textIcon}>
            <IconWithText
              text={"주관식"}
              fontsize={"10.5px"}
              fontweight={"bold"}
              fontcolor={"#48940c"}
            >
              <GrTextAlignFull />
            </IconWithText>
          </div>
        </MenuItem>
        <MenuItem value={"날짜"} sx={{ width: 150, padding: 1.5 }}>
          <div className={style.dateIcon}>
            <IconWithText
              text={"날짜"}
              fontsize={"10.5px"}
              fontweight={"bold"}
              fontcolor={"#7a33b0"}
            >
              <MdDateRange />
            </IconWithText>
          </div>
        </MenuItem>
        <MenuItem value={"파일"} sx={{ width: 150, padding: 1.5 }}>
          <div className={style.fileIcon}>
            <IconWithText
              text={"파일"}
              fontsize={"10.5px"}
              fontweight={"bold"}
              fontcolor={"#d02322"}
            >
              <IoMdCloudUpload />
            </IconWithText>
          </div>
        </MenuItem>
      </Select>
    </FormControl>
  );
}
