import logo from './logo.svg';
import { Reset } from 'styled-reset'
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Container from './components/common/Container';
import Login from './components/user/Login';
import Join from './components/user/Join';
import CommunityPost from './components/community/CommunityPost';
import Search from './components/common/Search';
import PostDetail from './components/community/PostCreateDetail';


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
