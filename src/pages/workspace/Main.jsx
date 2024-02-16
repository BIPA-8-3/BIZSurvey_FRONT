import style from "../../style/workspace/Main.module.css";
import SurveyCard from "../../components/workspace/SurveyCard";
import DefaultCard from "../../components/workspace/DefaultCard";
import MoreMenu from "../../components/workspace/MoreMenu";
import { useEffect, useState, useMemo, useRef, useContext } from "react";
import ProfileContainer from "../../components/workspace/ProfileContainer";
import ShareModal from "../../components/workspace/ShareModal";
import Loader from "../../pages/loader/Loader";
import _ from "lodash";

import {
  getSurveyList,
  removeSurvey,
  getAdminList,
  getContactList,
  modifySurveyName,
  modifyWorkspace,
  getURI,
} from "./api.js";
import { WorkspaceModal } from "../../components/workspace/WorkspaceModal";
import { useWorkspaceContext } from "./WorkspaceContext";
import { LoginContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { NativeEventSource, EventSourcePolyfill } from "event-source-polyfill";
import SharingMethodModal from "../../components/workspace/SharingMethodModal.jsx";

export default function Main() {
  /////////////////////////////////////////////////////////////////
  /////////////////////////// State 설정 ///////////////////////////
  /////////////////////////////////////////////////////////////////
  const navigate = useNavigate();

  const { workspaceList, setWorkspaceList, selectedWorkspaceId, setSelectedSurveyId, isPersonal } =
    useWorkspaceContext();

  const userInfo = useContext(LoginContext);

  // 관리자 목록 (캐싱)
  const [owner, setOwner] = useState({});
  const [adminList, setAdminList] = useState([]);
  const [adminWaitList, setAdminWaitList] = useState([]);

  // 연락처 목록
  let [contactList, setContactList] = useState([]);

  // 설문지 목록
  const [surveyList, setSurveyList] = useState([]);

  // 공유 모달
  let [shareModal, setShareModal] = useState(false);

  // 선택된 설문 목록
  let [selectedSurvey, setSelectedSurvey] = useState({
    surveyId: null,
    title: null,
    menuNum: null,
  });

  // 공유 방식 선택 모달 / 공유 프로세스 확인 상태값
  const [methodModal, setMethodModal] = useState(false);

  // 워크스페이스 이름 값에 대한 상태
  const [originWorkspaceName, setOriginWorkspaceName] = useState("");
  const [changeWorkspaceName, setChangeWorkspaceName] = useState("");

  // // 워크스페이스 모달
  const [workspaceModalState, setWorkspaceModalState] = useState(false);
  const [workspaceModalNum, setWorkspaceModalNum] = useState(1);

  // Loader 상태
  const [loader, setLoader] = useState(false);

  // 워크스페이스 이름 변경 이벤트
  useEffect(() => {
    setChangeWorkspaceName(originWorkspaceName);
  }, [originWorkspaceName]);

  // 설문지 이름변경
  const [changeModalSurveyId, setChageModalSurveyId] = useState(null);

  // 설문지 이름 변경 요청
  const handleChangeSurveyName = (title) => {
    modifySurveyName(changeModalSurveyId, title)
      .then((data) => {
        let copy = surveyList.map((survey) => {
          if (survey.surveyId === changeModalSurveyId) {
            survey.title = title;
          }
          return survey;
        });

        setSurveyList([...copy]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 워크스페이스 포커스 잃었을때 핸들러
  const handleChangeWorkspaceName = (event, changeName) => {
    if (event && !changeName && originWorkspaceName === changeWorkspaceName) {
      event.preventDefault();
      return;
    }
    if (!event && originWorkspaceName === changeName) {
      return;
    }

    let newName = changeName ? changeName : changeWorkspaceName;

    modifyWorkspace(selectedWorkspaceId, newName)
      .then((data) => {
        let copy = workspaceList.map((workspace) => {
          if (workspace.id === selectedWorkspaceId) {
            workspace.workspaceName = newName;
          }
          return workspace;
        });
        setOriginWorkspaceName(newName);
        setWorkspaceList(copy);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // // 뒤로가기 시 초기화
  useEffect(() => {
    setSelectedSurveyId(0);
  }, [navigate]);

  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////

  // SSE
  const newEventSourceRef = useRef(null);
  const EventSource = NativeEventSource || EventSourcePolyfill;

  const connectSSE = () => {
    newEventSourceRef.current = new EventSource(getURI() + "/sse/connect?userId=" + userInfo.id);

    newEventSourceRef.current.onopen = () => {
      // console.log("SSE 연결이 열렸습니다.");
    };

    newEventSourceRef.current.onerror = (event) => {
      if (event.eventPhase === EventSource.CLOSED) {
        console.error("SSE 연결이 닫혔습니다.");
        // newEventSourceRef.current.close();
        // newEventSourceRef.current = null;
      } else if (event.eventPhase === EventSource.error) {
        console.error("SSE 오류 발생");
      }
    };

    // newEventSourceRef.current.addEventListener("connect", function (event) {
    //   console.log(event.data);
    // });
  };

  const handleAdminEvent = (event) => {
    var data = JSON.parse(event.data);
    if (owner.id === userInfo.id) {
      return;
    }
    if (data && data.workspaceId && owner.workspaceId === data.workspaceId) {
      if (data.delFlag && userInfo.id === data.id) {
        // alert("접근 권한이 없습니다.");
        alert("워크스페이스에서 탈퇴 되었습니다.");
        window.location.reload();
      } else {
        getAdminState();
      }

      // else if (data.userId !== userInfo.id) {
      //   getAdminState();
      // }
    }
    return;
  };

  const handleContactEvent = (event) => {
    var data = JSON.parse(event.data);
    if (data && owner.workspaceId === data.workspaceId && data.id !== userInfo.id) {
      getContactState();
    }
    return;
  };

  useEffect(() => {
    connectSSE();

    return () => {
      newEventSourceRef.current.close();
      newEventSourceRef.current = null;
    };
  }, []);

  useEffect(() => {
    newEventSourceRef.current.removeEventListener("adminEvent", handleAdminEvent);
    newEventSourceRef.current.addEventListener("adminEvent", handleAdminEvent);
    newEventSourceRef.current.removeEventListener("contactEvent", handleContactEvent);
    newEventSourceRef.current.addEventListener("contactEvent", handleContactEvent);
  }, [owner]);

  //////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  ///////////////////////// 초기 State 메소드 /////////////////////////
  //////////////////////////////////////////////////////////////////

  // 관리자 STATE 설정
  const getAdminState = () => {
    getAdminList(selectedWorkspaceId)
      .then((data) => {
        if (!data) {
          return;
        }
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
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /////////////////////////////////////////////////////////////
  ///////////////////////// useEffect /////////////////////////
  /////////////////////////////////////////////////////////////
  // 공유 모달 설정
  // useEffect(() => {
  //   if (!selectedSurvey.surveyId) {
  //     setShareModal(false);
  //   } else {
  //     if (!methodModal) {
  //       setShareModal(true);
  //     }
  //   }
  // }, [selectedSurvey.surveyId, methodModal]);

  // useEffect(() => {
  //   if (process && !methodModal) {
  //     setShareModal(true);
  //   } else {
  //     setShareModal(false);
  //   }
  // }, [process]);

  // 선택한 워크스페이스가 변경되면
  useMemo(() => {
    if (!selectedWorkspaceId) {
      return;
    }
    setSurveyList([]);
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

  // 디바운싱된 handleChange 함수
  const debouncedHandleChange = _.debounce((event) => {
    if (event.key === "Enter") {
      event.target.blur();
    }
  }, 100);

  // 워크스페이스 이름 엔터 이벤트
  const handleInputKeyDown = (event) => {
    debouncedHandleChange(event);
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

    setShareModal(false);
  };

  // close 공유방식 선택 모달
  const toggleMethodModal = () => {
    setMethodModal(!methodModal);
  };

  const managedValues = {
    owner,
    setOwner,
    adminList,
    setAdminList,
    adminWaitList,
    setAdminWaitList,
    contactList,
    setContactList,
  };

  const isOwner = () => {
    return owner.email === userInfo.email;
  };

  return (
    <div id={style.SectionBody}>
      {/* Loader */}
      {loader ? <Loader /> : null}
      {/* modal */}
      <ShareModal
        isOpen={shareModal}
        onClose={closeShareModal}
        survey={selectedSurvey}
        contactList={contactList}
        setWorkspaceModalState={setWorkspaceModalState}
        setWorkspaceModalNum={setWorkspaceModalNum}
        setLoader={setLoader}
      />

      <SharingMethodModal
        isOpen={methodModal}
        toggleMethodModal={toggleMethodModal}
        closeShareModal={closeShareModal}
        setShareModal={setShareModal}
      />
      {
        <WorkspaceModal
          isOpen={workspaceModalState}
          setWorkspaceModalState={setWorkspaceModalState}
          pageNum={workspaceModalNum}
          handleClickSubmitBtn={
            workspaceModalNum === 1 ? handleChangeWorkspaceName : handleChangeSurveyName
          }
        />
      }
      <div className={style.sectionWrap}>
        <div className={style.section}>
          <div className={style.inputWrap}>
            <input
              className={style.inputTitle}
              onBlur={(e) => handleChangeWorkspaceName(e)}
              onKeyDown={handleInputKeyDown}
              value={changeWorkspaceName}
              onChange={(e) => {
                e.preventDefault();
                setChangeWorkspaceName(e.target.value);
              }}
              disabled={isPersonal()}
            />

            {/* group box */}
            <div className={style.groupBox}>
              {/* admin Box */}
              <ProfileContainer owner={owner} adminList={adminList} />
              <MoreMenu
                setWorkspaceModalState={setWorkspaceModalState}
                setWorkspaceModalNum={setWorkspaceModalNum}
                managedValues={managedValues}
                isOwner={isOwner}
              />
            </div>
          </div>
          <div className={style.cardContainer}>
            <DefaultCard />
            {surveyList.map((survey) => {
              return (
                <SurveyCard
                  key={survey.surveyId}
                  survey={survey}
                  onOpenModal={openShareModal}
                  onClose={closeShareModal}
                  handleRemoveBtnClick={handleRemoveBtnClick}
                  setWorkspaceModalState={setWorkspaceModalState}
                  setWorkspaceModalNum={setWorkspaceModalNum}
                  setChageModalSurveyId={setChageModalSurveyId}
                  setSelectedSurveyId={setSelectedSurveyId}
                  toggleMethodModal={toggleMethodModal}
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
