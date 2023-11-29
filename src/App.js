import "./App.css";
import { Reset } from "styled-reset";
import { useRoutes } from "react-router-dom";
import ThemeRoutes from "./routes/Router";
import SurveyInfo from "./components/survey/surveyInfo/SurveyInfo";

import logo from "./logo.svg";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import SurveyPostContainer from "./components/common/SurveyPostContainer";
import Login from "./components/user/Login";

import QuestionComp from "./components/survey/surveyForm/QuestionComp";

import CreateSurveyPage from "./pages/survey/CreateSurveyPage";
import SurveyInfoPage from "./pages/survey/SurveyInfoPage";

const App = () => {
  // const routing = useRoutes(ThemeRoutes);
  return (
    <>
      {/* <Reset />
      <div>{routing}</div> */}

      {/* <CreateSurveyPage /> */}
      {/* <SurveyInfo /> */}
      <SurveyInfoPage />
    </>
  );
};

export default App;
