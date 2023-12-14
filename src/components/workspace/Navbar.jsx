import AddIcon from "@mui/icons-material/Add";
import Item from "./Item";
import ButtonItem from "./ButtonItem";
import style from "../../style/workspace/Navbar.module.css";
import { useContext, useEffect, useState } from "react";
import { getWorkspaceList } from "../../pages/workspace/api.js";
import { WorkspaceContext } from "../../pages/workspace/Main";
import { Link } from "react-router-dom";

function Navbar({ setWorkspaceModalState, setWorkspaceModalNum }) {
  // workspaceList
  const { workspaceList, setWorkspaceList, userInfo } = useContext(WorkspaceContext);

  // workspace List 불러옴
  useEffect(() => {
    getWorkspaceList()
      .then((data) => {
        setWorkspaceList(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // 모달 오픈
  const openModal = () => {
    setWorkspaceModalNum(0);
    setWorkspaceModalState(true);
  };

  // 클릭한 workspace id 저장
  let { selectedWorkspaceId, setSelectedWorkspaceId } = useContext(WorkspaceContext);

  const changeWorkspace = (workspaceId) => {
    setSelectedWorkspaceId(workspaceId);
  };

  useEffect(() => {
    // 선택한 워크스페이스 ID가 없을 경우, 첫 번째 워크스페이스의 ID를 선택
    if (!selectedWorkspaceId && workspaceList.length > 0) {
      setSelectedWorkspaceId(workspaceList[0].id);
    }
  }, [selectedWorkspaceId, workspaceList.length]); // workspaceList.length를 직접 의존성 배열에 추가

  return (
    <div id={style.Navbar}>
      {/* header start */}
      <div className={style.NavbarHeader}>
        <div className={style.HeaderProfile}>
          <img src="https://via.placeholder.com/45X45" className={style.profileRadius}></img>
          <div className={style.profileInfo}>
            <span className={style.profileName}>
              <span style={{ marginRight: "3px" }}>{userInfo.icon}</span>
              {userInfo.nickname}
            </span>
            <span className={style.profileEmail}> {userInfo.email}</span>
          </div>
        </div>

        <div className={style.headerWorkspace}>
          <span className={style.headerWorkspaceFont}>워크스페이스</span>
          <span>
            <AddIcon
              className={style.addIcon}
              onClick={() => {
                openModal();
              }}
            />
          </span>
        </div>
      </div>
      {/* header end */}

      {/* body start */}
      <div className={style.NavbarBody}>
        {workspaceList.map((workspace) => {
          return (
            <Item
              key={workspace.id}
              id={workspace.id}
              workspaceName={workspace.workspaceName}
              workspaceType={workspace.workspaceType}
              changeWorkspace={changeWorkspace}
              selectable={selectedWorkspaceId === workspace.id ? true : false}
            />
          );
        })}
        <div
          onClick={() => {
            openModal();
          }}
        >
          <ButtonItem />
        </div>
      </div>
      {/* body end */}

      {/* footer */}
      <div className={style.NavbarFooter}>
        {/* <div className={style.planBox}>
          <p>😁 일반 플랜</p>
        </div> */}
        <div>
          <Link className={style.planText} to="/plan">
            플랜 변경하기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
