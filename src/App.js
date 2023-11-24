import logo from './logo.svg';
import { Reset } from 'styled-reset'
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Container from './components/common/Container';



function App() {
  return (
    <div className="App">
      <Reset />
      <Header></Header>
      <Container></Container>
      <Footer></Footer>
    </div>
  );
}

export default App;
