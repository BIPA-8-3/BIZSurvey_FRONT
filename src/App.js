import "./App.css";
import { Reset } from "styled-reset";

import { useRoutes } from "react-router-dom";
import ThemeRoutes from "./routes/Router";
import VoteResult from "./components/community/VoteResult";
import BizModal from "./components/common/BizModal";
import SurveyListModal from "./components/community/SurveyListModal";

const App = () => {
  const routing = useRoutes(ThemeRoutes);
  return (
    <>
      <Reset />
      <div>{routing}</div>
      <SurveyListModal />
    </>
  );
};

export default App;
