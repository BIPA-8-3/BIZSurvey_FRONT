import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
// import Header from '../components/common/Header';
// import Footer from './components/common/Footer';
// import Container from './components/common/Container';
 import '../style/Common.css'

const Layout = () => {
    return(
     <div>
         <Header></Header>
            <div className="container">
                <Outlet />
            </div>
         <Footer></Footer>
     </div>
    )
 }
 
 export default Layout;