import "./App.css";
import { Reset } from "styled-reset";

import { useRoutes } from "react-router-dom";
import ThemeRoutes from "./routes/Router";

const App = () => {
  const routing = useRoutes(ThemeRoutes);
  return (
    <>
      <Reset />
      <div>{routing}</div>
    </>
  );
};

export default App;
