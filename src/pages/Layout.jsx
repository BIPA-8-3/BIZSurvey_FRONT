import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import WorkspaceHeader from "../components/workspace/WorkspaceHeader";
import "../style/Common.css";
import Navbar from "../components/workspace/Navbar";
import { WorkspaceProvider } from "./workspace/WorkspaceContext";

const Layout = () => {
  // 현재 경로 정보를 가져옵니다.
  const location = useLocation();
  // 현재 경로가 '/mypage'인 경우 Header를 숨깁니다.

  const isWorkspace = location.pathname.startsWith("/workspace");
  const isMyPage =
    location.pathname === "/mypage" ||
    location.pathname === "/mypageSurveyCommunity" ||
    location.pathname === "/mypagePassword" ||
    location.pathname === "/mypagePlan" ||
    location.pathname === "/mypageCommunity" ||
    location.pathname === "/login/oauth2/kakao" ||
    location.pathname.startsWith("/emailValidation/");
  const isAuthorization = location.pathname.startsWith("/authorization/");
  const isExternal = location.pathname.startsWith("/survey/participate/external");
  const isAdmin = location.pathname.startsWith("/admin/");

  return (
    <div>
      {isWorkspace || isMyPage || isAuthorization || isAdmin || isExternal ? (
        <>
          {isWorkspace && (
            <WorkspaceProvider>
              <WorkspaceHeader />
              <Navbar />
              <div className="custom-container">
                <Outlet />
              </div>
            </WorkspaceProvider>
          )}
          {isMyPage && (
            <div className="container">
              <Outlet />
            </div>
          )}
          {isAuthorization && (
            <div>
              <Outlet />
            </div>
          )}
          {isExternal && (
            <div>
              <Outlet />
            </div>
          )}
          {isAdmin && (
            <div className="custom-container">
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
          <Footer></Footer>
        </>
      )}
    </div>
  );
};

export default Layout;
