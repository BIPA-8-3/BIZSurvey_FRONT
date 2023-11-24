import logo from './logo.svg';
import './App.css';
import BizCard from "./components/common/BizCard";
import BizCard2 from "./components/common/BizCard2";
import { Reset } from 'styled-reset'
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Container from './components/common/Container';
import Login from './components/user/Login';
import Join from './components/user/Join';


function App() {
  return (
    <>
          
          <Reset />
          <Header></Header>
          {/* <Container></Container> */}
          <Login></Login>
          {/* <Join></Join> */}
          <Footer></Footer>

      <BizCard data={{title: '21년 상반기 어쩌구asfsadfsadfasfsafsa', comment: 15, participant: 20, view : 10, date : '2020-03-13'}}></BizCard>
        <BizCard2 first></BizCard2>
        <BizCard2></BizCard2>
    </>


export default App;
