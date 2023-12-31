import AddIcon from "@mui/icons-material/Add";
import Item from "./Item";
import ButtonItem from "./ButtonItem";
import style from "../../style/workspace/Navbar.module.css";
import { useContext, useEffect, useState } from "react";
import { createWorkspace, getWorkspaceList } from "../../pages/workspace/api.js";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useWorkspaceContext } from "../../pages/workspace/WorkspaceContext";
import { LoginContext } from "../../App";
import { WorkspaceModal } from "./WorkspaceModal";

function Navbar() {
  const navigate = useNavigate();
  // workspaceList
  const {
    workspaceList,
    setWorkspaceList,
    selectedWorkspaceId,
    setSelectedWorkspaceId,
    selectedWorkspaceType,
    setSelectedWorkspaceType,
    setSelectedSurveyId,
  } = useWorkspaceContext();
  const userInfo = useContext(LoginContext);
  const [workspaceModalState, setWorkspaceModalState] = useState(false);

  // workspace List 불러옴
  useEffect(() => {
    getWorkspaceList()
      .then((data) => {
        if (!data) {
          setWorkspaceList([]);
        } else {
          setWorkspaceList(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    navigate("/workspace");
    setSelectedSurveyId(0);
    if (selectedWorkspaceId) {
      setSelectedWorkspaceType(
        workspaceList.find((w) => w.id === selectedWorkspaceId).workspaceType
      );
    } else {
      setSelectedWorkspaceType(null);
    }
  }, [selectedWorkspaceId]);

  // 클릭한 workspace id 저장
  const changeWorkspace = (id, workspaceType) => {
    setSelectedWorkspaceId(id);
    setSelectedSurveyId(0);
  };

  const handleCreateWorkspaceBtnClick = () => {
    const workspaceName = document.getElementById("input_name").value;

    createWorkspace(workspaceName)
      .then((data) => {
        let copy = [...workspaceList];
        copy.push(data);
        setWorkspaceList(copy);
      })
      .catch((error) => {
        console.error(error);
        console.log("Response from server:", error.response);
      });
  };

  useEffect(() => {
    // 선택한 워크스페이스 ID가 없을 경우, 첫 번째 워크스페이스의 ID를 선택
    if (!selectedWorkspaceId && workspaceList.length > 0) {
      setSelectedWorkspaceId(workspaceList[0].id);
    }
  }, [selectedWorkspaceId, workspaceList.length]); // workspaceList.length를 직접 의존성 배열에 추가

  const isAuthority = () => {
    return userInfo.planSubscribe === "COMPANY_SUBSCRIBE";
  };

  return (
    <div id={style.Navbar}>
      <WorkspaceModal
        isOpen={workspaceModalState}
        setWorkspaceModalState={setWorkspaceModalState}
        pageNum={0}
        handleClickSubmitBtn={handleCreateWorkspaceBtnClick}
      />
      {/* header start */}
      <div className={style.NavbarHeader}>
        <div className={style.HeaderProfile}>
          <img
            src={
              "https://" +
              ((userInfo.profile && userInfo.profile) ||
                "ui-avatars.com/api/?name=" + userInfo.email + "&background=random")
            }
            className={style.profileRadius}
          ></img>
          <div className={style.profileInfo}>
            <span className={style.profileName}>
              <span style={{ marginRight: "3px" }}>{getIcon(userInfo.planSubscribe)}</span>
              {userInfo.nickname}
            </span>
            <span className={style.profileEmail}> {userInfo.email}</span>
          </div>
        </div>

        <div className={style.headerWorkspace}>
          <span className={style.headerWorkspaceFont}>워크스페이스</span>
          <span>
            <AddIcon
              className={`${style.addIcon} ${!isAuthority() ? style.disabled : ""}`}
              onClick={() => {
                setWorkspaceModalState(true);
              }}
            />
          </span>
        </div>
      </div>
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
            setWorkspaceModalState(true);
          }}
          className={!isAuthority() ? style.disabled : ""}
        >
          <ButtonItem />
        </div>
      </div>
      {/* body end */}

      {/* footer */}
      <div className={style.NavbarFooter}>
        <div>
          <Link className={style.planText} to="/mypagePlan">
            플랜 변경하기
          </Link>
        </div>
      </div>
    </div>
  );
}

function getIcon(planSubscribe) {
  switch (planSubscribe) {
    case "COMPANY_SUBSCRIBE":
      return "🎖️";
    case "NORMAL_SUBSCRIBE":
      return "🏅";
    default:
      return "🎟️";
  }
}
export default Navbar;
