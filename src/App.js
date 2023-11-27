import './App.css';
import {Reset} from 'styled-reset'
import {useRoutes} from 'react-router-dom';
import ThemeRoutes from './routes/Router';
import SurveyInfo from "./components/survey/surveyInfo/SurveyInfo";
import CreateSurveyPage from "./pages/survey/CreateSurveyPage";

const App = () => {
  // const routing = useRoutes(ThemeRoutes);
  return (
    <>

      {/*<Reset />*/}
      {/*<div >{routing}</div>*/}


        <SurveyInfo/>
        <CreateSurveyPage/>
    </>
  );
}
export default App;
