import logo from './logo.svg';
import { Reset } from 'styled-reset'
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import SurveyPostContainer from './components/common/SurveyPostContainer';
import Login from './components/user/Login';
import Join from './components/user/Join';
import SurveyCard from './components/common/SurveyCard';
import { useRoutes } from 'react-router-dom';
import ThemeRoutes from './routes/Router';

const App = () => {
  const routing = useRoutes(ThemeRoutes);
  return (
    <>
      <Reset />
      <div >{routing}</div>
    </>
  );
}

export default App;
