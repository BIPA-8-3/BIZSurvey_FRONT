import style from "../../style/workspace/ShareModal.module.css";
import { IoCloseSharp } from "react-icons/io5";
import ReactDOM from "react-dom";
import { useContext, useEffect, useState } from "react";
import { WorkspaceContext } from "../../pages/workspace/Main";
import ShareItem from "./ShareItem";
import { shareSurvey, getSharedSurveyHistory } from "../../pages/workspace/api";
import SharedHistoryItem from "./SharedHistoryItem";
import { getSharedContactList } from "../../pages/workspace/api";

export default function ShareModal({ isOpen, onClose, survey }) {
  const modalTitle = ["연락처 공유", "공유 히스토리"];
  const leftBoxTitle = ["이메일 목록", "공유 내역"];
  const rightBoxTitle = ["선택 목록", "공유 상세 내역"];

  /////////////////////////////////////////////////////////////////
  /////////////////////////// State 설정 ///////////////////////////
  /////////////////////////////////////////////////////////////////
  // share
  const [shareContactList, setShareContactList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const { contactList } = useContext(WorkspaceContext);
  const { setLoader } = useContext(WorkspaceContext);

  // history
  const [sharedHistory, setSharedHistory] = useState([]);
  const [sharedContactDetails, setSharedContactDetails] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState(null);

  /////////////////////////////////////////////////////////////
  ///////////////////////// useEffect /////////////////////////
  /////////////////////////////////////////////////////////////
  useEffect(() => {
    setSelectedList([]);
    if (isOpen && survey.menuNum != null) {
      // 공유
      if (survey.menuNum === 0) {
        console.log(survey);
        setShareContactList([...contactList]);
      }
      // 공유 히스토리
      else if (survey.menuNum === 1) {
        console.log("@", survey);
        getSharedSurveyHistory(survey.surveyId)
          .then((data) => {
            console.log(data);
            setSharedHistory(data);
          })
          .catch((error) => {
            console.log(error);
            console.log(error.response);
            setSharedHistory([]);
          });
      }
    } else {
      setShareContactList([]);
      setSelectedHistory([]);
      setSelectedList([]);
      setSharedHistory([]);
      setSharedContactDetails([]);
      setSelectedHistory(null);
    }
  }, [isOpen, survey.menuNum]);

  // 공유이력 변경 시 조회
  useEffect(() => {
    if (selectedHistory) {
      handleClickHistoryItem(selectedHistory);
    }
  }, [selectedHistory]);
  ////////////////////////////////////////////////////////////
  /////////////////////// event method ///////////////////////
  ////////////////////////////////////////////////////////////
  // 공유 대상 선택
  const handleClickShareItem = (id, type) => {
    if (type) {
      let target = { ...selectedList.find((item) => item.id === id) };
      setSelectedList([...selectedList.filter((share) => share.id !== id)]);
      shareContactList.push(target);
    } else {
      let target = { ...shareContactList.find((item) => item.id === id) };
      setShareContactList([...shareContactList.filter((share) => share.id !== id)]);
      selectedList.push(target);
    }
  };

  if (!isOpen) {
    return null;
  }

  // 초대 메소드
  const handleClickShareBtn = () => {
    setLoader(true);

    let sharedRequest = {
      surveyId: survey.surveyId,
      deadline: 7,
      contactList: selectedList,
    };

    shareSurvey(sharedRequest)
      .then((data) => {
        console.log(data);
        alert("공유가 완료되었습니다.");
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        alert("공유에 실패하셨습니다.");
      })
      .finally((data) => {
        setLoader(false);
        onClose();
      });
  };

  // 공유 상세 내역 조회 메소드
  const handleClickHistoryItem = () => {
    getSharedContactList(selectedHistory)
      .then((data) => {
        console.log("여기여기", data);
        setSharedContactDetails(data);
      })
      .catch((error) => {
        setSharedContactDetails([]);
      });
  };

  return ReactDOM.createPortal(
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.ModalWrap} onClick={(e) => e.stopPropagation()}>
        <div className={style.modalHeader}>
          <span>{modalTitle[survey.menuNum]}</span>
          <div className={style.modalExitBtn}>
            <IoCloseSharp onClick={onClose} />
          </div>
        </div>
        {/* modalBody */}
        <div className={style.modalBody}>
          <div className={style.inputBox}>
            <span style={{ marginRight: "10px" }}>선택된 설문지</span>
            <input
              className={style.surveyNameBox}
              type="email"
              id="email"
              placeholder="선택된 설문지 이름"
              value={survey.title}
              readOnly
            />
          </div>
          <div>
            <div className={style.contactBox}>
              <div className={style.itemBox} style={{ marginRight: "10px" }}>
                {/* <span>이메일을 선택해주세요</span> */}
                <div className={style.listBox}>
                  <div className={style.listBoxHeader}>
                    <ul>
                      <li>
                        <span>{leftBoxTitle[survey.menuNum]}</span>
                      </li>
                    </ul>
                  </div>
                  <div className={style.listBoxBody}>
                    {(() => {
                      if (survey.menuNum === 0) {
                        return shareContactList.map((contact) => (
                          <ShareItem
                            key={contact.id}
                            btnVisible={false}
                            info={contact}
                            handleClickShareItem={handleClickShareItem}
                          />
                        ));
                      } else {
                        return sharedHistory.map((history) => (
                          <SharedHistoryItem
                            key={history.id}
                            info={history}
                            setSelectedHistory={setSelectedHistory}
                          />
                        ));
                      }
                    })()}
                  </div>
                </div>
              </div>

              <div className={style.itemBox}>
                {/* <span>선택된 이메일</span> */}
                <div className={style.listBox}>
                  <div className={style.listBoxHeader}>
                    <ul>
                      <li>
                        <span>{rightBoxTitle[survey.menuNum]}</span>
                      </li>
                    </ul>
                  </div>
                  <div className={style.listBoxBody} style={{ marginRight: "5px" }}>
                    {(() => {
                      if (survey.menuNum === 0) {
                        return selectedList.map((share) => (
                          <ShareItem
                            key={share.id}
                            btnVisible={false}
                            info={share}
                            handleClickShareItem={handleClickShareItem}
                          />
                        ));
                      } else {
                        return sharedContactDetails.map((contact) => (
                          <ShareItem
                            key={contact.id}
                            btnVisible={false}
                            info={contact}
                            handleClickShareItem={handleClickShareItem}
                          />
                        ));
                      }
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={style.rightContainer}>
            <button
              className={`${style.button} ${style.right}`}
              onClick={(e) => {
                handleClickShareBtn();
              }}
            >
              전송
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
