import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import WorkspaceHeader from "../components/workspace/WorkspaceHeader";
import "../style/Common.css";

const Layout = () => {
  // 현재 경로 정보를 가져옵니다.
  const location = useLocation();
  // 현재 경로가 '/mypage'인 경우 Header를 숨깁니다.

  const shouldRenderCustomContainer = location.pathname == "/workspace";

  return (
    <div>
      {shouldRenderCustomContainer ? (
        <>
          <WorkspaceHeader></WorkspaceHeader>
          <div className="custom-container">
            <Outlet />
          </div>
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
