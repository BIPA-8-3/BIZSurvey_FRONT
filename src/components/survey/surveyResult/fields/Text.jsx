import { useState } from "react";
import { TextField } from "@mui/material/TextField";

export default function TextResult() {
  const [text, setText] = useState([""]);

  return (
    <>
      {text.map((text, index) => (
        <Text key={index} text={text} />
      ))}
    </>
  );
}

function Text({ value }) {
  return (
    <>
      <div
        style={{
          width: "600px",
          height: "40px",
          margin: "5px 0 5px 0",
          borderRadius: "3px",
          border: "1px solid #D6D6D6",
        }}
      >
        {value}
      </div>
    </>
  );
}
