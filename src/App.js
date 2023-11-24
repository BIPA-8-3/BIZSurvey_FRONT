import logo from './logo.svg';
import { Reset } from 'styled-reset'
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Container from './components/common/Container';
import Login from './components/user/Login';
import Join from './components/user/Join';



function App() {
  return (
    <div className="App">
      <Reset />
      <Header></Header>
      {/* <Container></Container> */}
      <Login></Login>
      {/* <Join></Join> */}
      <Footer></Footer>
    </div>
  );
}

export default App;
