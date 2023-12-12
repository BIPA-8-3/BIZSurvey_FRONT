import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import WorkspaceHeader from "../components/workspace/WorkspaceHeader";
import "../style/Common.css";

const Layout = () => {
  const location = useLocation();

  const isWorkspace = location.pathname === "/workspace";
  const isMyPage =
    location.pathname === "/mypage" ||
    location.pathname === "/login/oauth2/kakao" ||
    location.pathname.startsWith("/emailValidation/");

  return (
    <div>
      {isWorkspace || isMyPage ? (
        <>
          {isWorkspace && <WorkspaceHeader />}
          {isWorkspace && (
            <div className="custom-container">
              <Outlet />
            </div>
          )}
          {isMyPage && (
            <div className="container">
              <Outlet />
            </div>
          )}
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
