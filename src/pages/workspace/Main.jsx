import Navbar from "../../components/workspace/Navbar";
import style from "../../style/workspace/Main.module.css";
import SurveyCard from "../../components/workspace/SurveyCard";
import DefaultCard from "../../components/workspace/DefaultCard";
import MoreMenu from "../../components/workspace/MoreMenu";
import { useEffect, useState, useMemo, createContext } from "react";
import ProfileContainer from "../../components/workspace/ProfileContainer";
import ShareModal from "../../components/workspace/ShareModal";
import Loader from "../../pages/loader/Loader";

import {
  login,
  getSurveyList,
  modifyWorkspace,
  getUserInfo,
  removeSurvey,
  getAdminList,
  getContactList,
} from "./api.js";
import { WorkspaceModal } from "../../components/workspace/WorkspaceModal";

export let WorkspaceContext = createContext();

export default function Main() {
  /////////////////////////////////////////////////////////////////
  /////////////////////////// State 설정 ///////////////////////////
  /////////////////////////////////////////////////////////////////
  // 유저 정보
  const [userInfo, setUserInfo] = useState({});

  // 워크스페이스 목록
  const [workspaceList, setWorkspaceList] = useState([]);

  // 선택된 워크스페이스 관리
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null);

  // 설문지 목록
  const [surveyList, setSurveyList] = useState([]);

  // 관리자 목록 (캐싱)
  const [owner, setOwner] = useState({});
  const [adminList, setAdminList] = useState([]);
  const [adminWaitList, setAdminWaitList] = useState([]);

  // 연락처 목록
  let [contactList, setContactList] = useState([]);

  // 공유 모달
  let [shareModal, setShareModal] = useState(false);

  // 선택된 설문 목록
  let [selectedSurvey, setSelectedSurvey] = useState({
    surveyId: null,
    title: null,
    menuNum: null,
  });

  // 워크스페이스 이름 값에 대한 상태
  const [originWorkspaceName, setOriginWorkspaceName] = useState("");

  // 워크스페이스 모달
  const [workspaceModalState, setWorkspaceModalState] = useState(false);
  const [workspaceModalNum, setWorkspaceModalNum] = useState(null);

  // Loader 상태
  const [loader, setLoader] = useState(false);

  // 워크스페이스 이름 변경 이벤트
  useEffect(() => {
    document.getElementById("workspaceName").value = originWorkspaceName;
  }, [originWorkspaceName]);

  //////////////////////////////////////////////////////////////////
  ///////////////////////// 초기 State 메소드 /////////////////////////
  //////////////////////////////////////////////////////////////////
  // 관리자 STATE 설정
  const getAdminState = () => {
    getAdminList(selectedWorkspaceId)
      .then((data) => {
        if (!data.owner) {
          setOwner({});
        } else {
          setOwner(data.owner);
        }
        if (!data.adminList) {
          setAdminList([]);
        } else {
          setAdminList([...data.adminList]);
        }

        if (!data.waitList) {
          setAdminWaitList([]);
        } else {
          setAdminWaitList([...data.waitList]);
        }
      })
      .catch((error) => {
        console.error(error);
        console.log(error.response);
      });
  };

  // 연락처 State 설정
  const getContactState = () => {
    let listRequest = {
      workspaceId: selectedWorkspaceId,
      keyword: "",
    };

    getContactList(listRequest)
      .then((data) => {
        setContactList(data);
      })
      .catch((error) => {
        console.error(error);
        console.log(error.response);
      });
  };

  // 설문지 State 설정
  const getSurveyState = () => {
    getSurveyList(selectedWorkspaceId)
      .then((data) => {
        if (data.length > 0) {
          setSurveyList([...data]);
        } else {
          setSurveyList([]);
        }
        let workspace = workspaceList.find((workspace) => workspace.id === selectedWorkspaceId);
        setOriginWorkspaceName(workspace.workspaceName);
        document.getElementById("workspaceName").value = workspace.workspaceName;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /////////////////////////////////////////////////////////////
  ///////////////////////// useEffect /////////////////////////
  /////////////////////////////////////////////////////////////
  // 폼 최초 로딩 시
  useEffect(() => {
    // 로그인 이후 계정정보 불러옴
    // login()
    //   .then((data) => {
    //     getUserInfo()
    //       .then((info) => {
    //         if (!info) {
    //           return;
    //         }
    //         switch (info.planSubscribe) {
    //           case "COMPANY_SUBSCRIBE":
    //             info.icon = "🏅";
    //             break;
    //           case "NORMAL_SUBSCRIBE":
    //             info.icon = "🏅";
    //             break;
    //           default:
    //             info.icon = "🎟️";
    //             break;
    //         }

    //         setUserInfo(info);
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //       });
    //   })
    //   .catch((error) => console.error(error));
    getUserInfo()
      .then((info) => {
        if (!info) {
          return;
        }
        switch (info.planSubscribe) {
          case "COMPANY_SUBSCRIBE":
            info.icon = "🏅";
            break;
          case "NORMAL_SUBSCRIBE":
            info.icon = "🏅";
            break;
          default:
            info.icon = "🎟️";
            break;
        }

        setUserInfo(info);
      })
      .catch((error) => {
        console.error(error);
        console.log(error);
      });
    // 관리자 목록 조회 및 저장
  }, []);

  // 공유 모달 설정
  useEffect(() => {
    if (!selectedSurvey.surveyId) {
      setShareModal(false);
    } else {
      setShareModal(true);
    }
  }, [selectedSurvey.surveyId]);

  // 선택한 워크스페이스가 변경되면
  useMemo(() => {
    if (!selectedWorkspaceId) {
      return;
    }
    getSurveyState();
    getAdminState();
    getContactState();
  }, [selectedWorkspaceId]);

  ////////////////////////////////////////////////////////////
  /////////////////////// event method ///////////////////////
  ////////////////////////////////////////////////////////////
  const handleRemoveBtnClick = (surveyId) => {
    removeSurvey(surveyId)
      .then((data) => {
        setSurveyList(surveyList.filter((survey) => survey.surveyId !== surveyId));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 워크스페이스 이름 엔터 이벤트
  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.target.blur();
    }
  };

  // 워크스페이스 모달
  const closeWorkspaceModal = () => {
    setWorkspaceModalState(false);
  };

  // open 공유 모달
  const openShareModal = (surveyId, title, menuNum) => {
    setSelectedSurvey({
      surveyId: surveyId,
      title: title,
      menuNum: menuNum,
    });
  };

  // close 공유 모달
  const closeShareModal = () => {
    setSelectedSurvey({
      surveyId: null,
      title: null,
      menuNum: null,
    });
  };

  // 워크스페이스 포커스 잃었을때 핸들러
  const handleChangeWorkspaceName = (event, changeName) => {
    let newName = "";
    if (event) {
      newName = event.target.value;
    } else {
      newName = changeName;
    }

    if (originWorkspaceName === newName) {
      return;
    }
    modifyWorkspace(selectedWorkspaceId, newName)
      .then((data) => {
        let copy = workspaceList.map((workspace) => {
          if (workspace.id === selectedWorkspaceId) {
            workspace.workspaceName = newName;
            setOriginWorkspaceName(newName);
          }
          return workspace;
        });
        setWorkspaceList(copy);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div id={style.SectionBody}>
      {/* Loader */}
      {loader ? <Loader /> : null}
      {/* modal */}
      <WorkspaceContext.Provider
        value={{
          selectedWorkspaceId,
          contactList,
          setLoader,
        }}
      >
        <ShareModal
          isOpen={shareModal}
          onClose={closeShareModal}
          survey={selectedSurvey}
          title={""}
        />
      </WorkspaceContext.Provider>
      <WorkspaceModal
        isOpen={workspaceModalState}
        onClose={closeWorkspaceModal}
        workspaceList={workspaceList}
        setWorkspaceList={setWorkspaceList}
        pageNum={workspaceModalNum}
        handleChangeWorkspaceName={handleChangeWorkspaceName}
      />
      {/* Navbar */}
      <WorkspaceContext.Provider
        value={{
          selectedWorkspaceId,
          setSelectedWorkspaceId,
          workspaceList,
          setWorkspaceList,
          userInfo,
        }}
      >
        <Navbar
          setWorkspaceModalState={setWorkspaceModalState}
          setWorkspaceModalNum={setWorkspaceModalNum}
        />
      </WorkspaceContext.Provider>
      <div className={style.sectionWrap}>
        {/* section */}
        <div className={style.section}>
          {/* title */}
          <div className={style.inputWrap}>
            <input
              className={style.inputTitle}
              onBlur={(e) => handleChangeWorkspaceName(e)}
              onKeyDown={handleInputKeyDown}
              id="workspaceName"
            />

            {/* group box */}
            <div className={style.groupBox}>
              {/* admin Box */}
              <ProfileContainer />
              <WorkspaceContext.Provider
                value={{
                  selectedWorkspaceId,
                  setSelectedWorkspaceId,
                  workspaceList,
                  setWorkspaceList,
                  contactList,
                  setContactList,
                  adminList,
                  setAdminList,
                  adminWaitList,
                  setAdminWaitList,
                  owner,
                  setOwner,
                }}
              >
                <MoreMenu
                  setWorkspaceModalState={setWorkspaceModalState}
                  setWorkspaceModalNum={setWorkspaceModalNum}
                />
              </WorkspaceContext.Provider>
            </div>
          </div>
          {/* cardContainer */}
          <div className={style.cardContainer}>
            <DefaultCard></DefaultCard>
            {surveyList.map((survey) => {
              return (
                <SurveyCard
                  key={survey.surveyId}
                  type={"🗒️"}
                  surveyId={survey.surveyId}
                  title={survey.title}
                  onOpenModal={openShareModal}
                  onClose={closeShareModal}
                  handleRemoveBtnClick={handleRemoveBtnClick}
                  className={style.cardItem}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
