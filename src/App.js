import "./App.css";
import { Reset } from "styled-reset";

import { useRoutes } from "react-router-dom";
import ThemeRoutes from "./routes/Router";
import VoteResult from "./components/community/VoteResult";

const App = () => {
  const routing = useRoutes(ThemeRoutes);
  return (
    <>
      <Reset />
      <div>{routing}</div>
      <VoteResult></VoteResult>
    </>
  );
};

export default App;
