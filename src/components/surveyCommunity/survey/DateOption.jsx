import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DateOption({ setUserAnswer }) {
  const [value, setValue] = useState(dayjs());

  const handleChangeAnswer = (date) => {
    const parsedDate = dayjs(date);
    const year = parsedDate.year();
    const month = String(parsedDate.month() + 1).padStart(2, "0");
    const day = String(parsedDate.date()).padStart(2, "0");
    const result = year + "-" + month + "-" + day;
    setValue(parsedDate);
    setUserAnswer([result]);
  };

  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker
              value={value}
              onChange={(date) => handleChangeAnswer(date)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
    </>
  );
}
