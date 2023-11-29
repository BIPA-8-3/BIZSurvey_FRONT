import logo from './logo.svg';
import { Reset } from 'styled-reset'
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import SurveyPostContainer from './components/common/SurveyPostContainer';
import Login from './components/user/Login';

import QuestionComp from "./components/survey/surveyForm/QuestionComp";
import CreateSurveyPage from "./pages/survey/CreateSurveyPage";

import Join from './components/user/Join';
import CommunityPost from './components/community/CommunityPost';
import Search from './components/common/Search';

import SurveyCard from './components/common/SurveyCard';
import { useRoutes } from 'react-router-dom';
import ThemeRoutes from './routes/Router';
import VoteResult from './components/community/VoteResult';


const App = () => {
  const routing = useRoutes(ThemeRoutes);
  return (
    <>
      <Reset />

      <Header></Header>
        <Container></Container>
      <Footer></Footer>

      <div >{routing}</div>
    </>
  );
}

export default App;
