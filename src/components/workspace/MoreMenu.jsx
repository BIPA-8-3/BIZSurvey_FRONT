import { BiDotsHorizontalRounded } from "react-icons/bi";
import style from "../../style/workspace/MoreMenu.module.css";
import { useRef, useEffect, useState, useContext } from "react";
import ManagementModal from "./ManagementModal";
import { removeWorkspace } from "../../pages/workspace/api.js";
import { useWorkspaceContext } from "../../pages/workspace/WorkspaceContext";

const MoreMenu = ({ setWorkspaceModalState, setWorkspaceModalNum, managedValues }) => {
  // 더보기 메뉴
  const cotainerRef = useRef(null);

  ////////////////////////////////////////////////////////////////
  ////////////////////////// useContext //////////////////////////
  ////////////////////////////////////////////////////////////////
  // active workspace
  let { workspaceList, setWorkspaceList, selectedWorkspaceId, setSelectedWorkspaceId, isPersonal } =
    useWorkspaceContext();

  ////////////////////////////////////////////////////////////////
  /////////////////////////// useState ///////////////////////////
  ////////////////////////////////////////////////////////////////
  let [moreMenu, setMoreMenu] = useState(false);

  // 관리 모달
  let [managementModal, setManagementModal] = useState(false);

  // menu
  let [menu, setMenu] = useState("tab1");

  ///////////////////////////////////////////////////////////////
  ////////////////////////// useEffect //////////////////////////
  ///////////////////////////////////////////////////////////////
  useEffect(() => {
    // 컴포넌트가 마운트된 경우에만 이벤트 리스너 추가
    document.addEventListener("click", handleDocumentClick);

    // 컴포넌트가 언마운트되면 이벤트 리스너 제거
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [moreMenu]);

  ////////////////////////////////////////////////////////////////
  ///////////////////////// event Method /////////////////////////
  ////////////////////////////////////////////////////////////////
  const closeManagementModal = () => {
    setManagementModal(false);
  };

  // 삭제 메소드
  const handleRemoveClick = () => {
    removeWorkspace(selectedWorkspaceId)
      .then((data) => {
        let copy = workspaceList.filter((workspace) => workspace.id !== selectedWorkspaceId);
        setWorkspaceList(copy);
        setSelectedWorkspaceId(null);
        toggleMenu();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // open Workspace Modal
  const openWorkspaceModal = (num) => {
    toggleMenu();
    setWorkspaceModalNum(1);
    setWorkspaceModalState(true);
  };

  // MoreMenu
  const toggleMenu = () => {
    setMoreMenu(!moreMenu);
  };

  const handleDocumentClick = (event) => {
    if (cotainerRef.current && !cotainerRef.current.contains(event.target) && moreMenu) {
      toggleMenu();
    }
  };

  return (
    <div ref={cotainerRef} className={style.menuContainer}>
      <ManagementModal
        isOpen={managementModal}
        onClose={closeManagementModal}
        tab={menu}
        managedValues={managedValues}
      />
      <BiDotsHorizontalRounded
        onClick={() => {
          toggleMenu();
        }}
        className={style.callMoreMenuBtn}
      />
      {/* {moreMenu && ( */}
      <div className={`${style.menu} ${moreMenu ? style.visible : ""}`}>
        <ul>
          <li
            onClick={async () => {
              await setMenu("tab2");
              toggleMenu();
              setManagementModal(true);
            }}
          >
            연락처 관리
          </li>
          <li
            onClick={async () => {
              await setMenu("tab1");
              toggleMenu();
              setManagementModal(true);
            }}
            className={isPersonal() ? style.disabled : ""}
          >
            관리자 관리
          </li>
          <li
            onClick={() => {
              openWorkspaceModal(1);
            }}
            className={isPersonal() ? style.disabled : ""}
          >
            이름 바꾸기
          </li>
          <li
            onClick={() => {
              handleRemoveClick();
            }}
            className={isPersonal() ? style.disabled : ""}
          >
            삭제
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MoreMenu;
