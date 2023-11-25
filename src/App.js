import './App.css';
import BizCard from "./components/common/BizCard";
import BizCard2 from "./components/common/BizCard2";
import {Reset} from 'styled-reset'
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Login from './components/user/Login';
import QuestionComp from "./components/survey/surveyForm/QuestionComp";
import SurveyFormPage from "./pages/survey/SurveyFormPage";


function App() {
  return (
    <>
        {/*<BizCard data={{title: '21년 상반기 어쩌구asfsadfsadfasfsafsa', comment: 15, participant: 20, view : 10, date : '2020-03-13'}}></BizCard>*/}
        {/*<BizCard2 first></BizCard2>*/}
        {/*<BizCard2></BizCard2>*/}

        <SurveyFormPage/>


    </>
  );
}
export default App;
