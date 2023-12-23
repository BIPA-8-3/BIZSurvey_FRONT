import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";

export default function SurveyPostSelect({
  sharedUnit,
  sharedId,
  setSharedId,
  sharedType,
  setSharedType,
}) {
  const handleChange = (event) => {
    console.log("post선택!!!!!!!!!!!!!!1", event.target.value);
    setSharedId(event.target.value);
  };

  const handleSharedChange = (event) => {
    setSharedType(event.target.value);
  };

  return (
    <>
      {/* 게시물 선택 select  */}
      <div
        style={{
          width: "700px",
          margin: "0 auto",
          textAlign: "center",
          marginTop: "10px",
          marginBottom: "30px",
        }}
      >
        <FormControl>
          <RadioGroup row value={sharedType} onChange={handleSharedChange}>
            <FormControlLabel
              value="INTERNAL"
              control={<Radio />}
              label="커뮤니티 공유"
            />
            <FormControlLabel
              value="EXTERNAL"
              control={<Radio />}
              label="외부 공유"
            />
          </RadioGroup>
        </FormControl>
        <FormControl sx={{ minWidth: 700 }}>
          <Select
            value={sharedId}
            onChange={handleChange}
            displayEmpty
            inputProps={{
              "aria-label": "Without label",
            }}
          >
            <MenuItem value={0}>
              <em style={{ color: "grey" }}>== 게시물 선택 ==</em>
            </MenuItem>
            {sharedUnit.map((unit) => (
              <MenuItem key={unit.id} value={unit.id}>
                {sharedType === "EXTERNAL"
                  ? createExternalItem(unit)
                  : createInternalItem(unit)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
}

const formattedDate = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Seoul",
});

function createExternalItem(unit) {
  return (
    <>
      <span style={{ marginRight: "10px" }}>
        공유: {unit.regDate && formattedDate.format(new Date(unit.regDate))}
      </span>
      <span>
        마감: {unit.dueDate && formattedDate.format(new Date(unit.dueDate))}
      </span>
    </>
  );
}

function createInternalItem(unit) {
  return (
    <>
      <MenuItem key={unit.postId} value={unit.postId}>
        {unit.title}
      </MenuItem>
    </>
  );
}
