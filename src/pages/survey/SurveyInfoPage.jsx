import * as React from "react";
import CreateSurveyPage from "./CreateSurveyPage";
import SurveyInfo from "../../components/survey/surveyInfo/SurveyInfo";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useEffect } from "react";
import SurveyResult from "../../components/survey/surveyResult/SurvePostSelect";

export default function SurveyInfoPage() {
  const [page, setPage] = useState(0);

  const [element, setElement] = useState(<></>);

  useEffect(() => {
    if (page) {
      setElement(<SurveyResult />);
    } else {
      setElement(<SurveyInfo />);
    }
    console.log(page);
  }, [page]);
  const handleChangePage = (e, num) => {
    e.preventDefault();
    console.log("num" + num);
    setPage(num);
  };

  return (
    <>
      <div>
        <div style={{ width: "700px", margin: "0 auto" }}>
          <ButtonGroup variant="text" aria-label="text button group">
            <Button
              sx={{
                width: 350,
                borderRadius: 0,
                backgroundColor: page === 0 ? "#154DCA" : "white",
                color: page === 0 ? "white" : "#154DCA",
                ":hover": {
                  backgroundColor:
                    page === 0 ? "rgba(21,77,202,0.8)" : "rgba(21,77,202,0.1)",
                },
              }}
              onClick={(e) => handleChangePage(e, 0)}
            >
              설문지 폼
            </Button>
            <Button
              onClick={(e) => handleChangePage(e, 1)}
              sx={{
                width: 350,
                borderRadius: 0,
                backgroundColor: page === 1 ? "#154DCA" : "white",
                color: page === 1 ? "white" : "#154DCA",
                ":hover": {
                  backgroundColor:
                    page === 1 ? "rgba(21,77,202,0.8)" : "rgba(21,77,202,0.1)",
                },
              }}
            >
              응답 결과
            </Button>
          </ButtonGroup>
        </div>

        <div>{element}</div>
      </div>
    </>
  );
}
