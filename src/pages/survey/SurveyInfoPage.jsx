import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import * as React from "react";
import CreateSurveyPage from "./CreateSurveyPage";

export default function SurveyInfoPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {value === 0 && <SurveyInfoPage />}
      {value === 1 && <CreateSurveyPage />}
    </>
  );
}
