import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import WorkspaceHeader from "../components/workspace/WorkspaceHeader";
import "../style/Common.css";

const Layout = () => {
  const location = useLocation();

  const isWorkspace = location.pathname === '/workspace';
  const isMyPage = location.pathname === '/mypage' || 
      location.pathname === '/mypageSurveyCommunity' || 
      location.pathname === '/mypagePassword' || 
      location.pathname === '/mypageCommunity' || 
      location.pathname === "/login/oauth2/kakao" || 
      location.pathname.startsWith("/emailValidation/");

      const isAdmin = location.pathname.startsWith("/admin/")

  return (
    <div>
      {isWorkspace || isMyPage || isAdmin? (
        <>
          {isWorkspace && <WorkspaceHeader />}
          {isWorkspace && <div className="custom-container"><Outlet /></div>}
          {isMyPage && <div className="container"><Outlet /></div>}
          {isAdmin && <div className="custom-container"><Outlet /></div>}
        </>
      ) : (
        <>
          <Header />
          <div className="container">
            <Outlet />
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Layout;
