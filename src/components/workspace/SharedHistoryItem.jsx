import { useState } from "react";
import style from "../../style/workspace/SharedHistoryItem.module.css";
import { WorkspaceModal } from "./WorkspaceModal";
import { modifyDatelineDate } from "../../pages/workspace/api";

export default function SharedHistoryItem({ info, selectedHistory, setSelectedHistory }) {
  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Seoul",
  });

  const extension = () => {
    setModal(true);
  };

  const [modal, setModal] = useState(false);
  const [updateCount, setUpdateCount] = useState(0);

  const modifySharedDate = (date) => {
    if (!isDateTimeInputValid(date)) {
      alert("유효한 날짜를 입력해 주세요.");
      return false;
    }
    if (isDateTimeEarlierThanNow(date)) {
      alert("마감일자는 현재날짜보다 빠를 수 없습니다.");
      return false;
    }

    modifyDatelineDate(info.id, date)
      .then((e) => {
        alert("수정이 완료되었습니다.");
        info.dueDate = date;
        setUpdateCount((prevCount) => prevCount + 1);
        setModal(false);
      })
      .catch((error) => {
        alert("수정에 실패하였습니다.");
        return false;
      });
  };
  console.log(info);
  if (!info.id) {
    return null;
  }
  return (
    <div className={`${style.container} ${selectedHistory === info.id ? style.hover : ""}`}>
      <WorkspaceModal
        isOpen={modal}
        pageNum={3}
        setWorkspaceModalState={setModal}
        handleClickSubmitBtn={modifySharedDate}
      />
      <div
        className={style.historyWrap}
        onClick={(e) => {
          setSelectedHistory(info.id);
        }}
      >
        <div style={{ width: "210px" }}>
          <span className={style.historyText}>
            공유날짜: {formattedDate.format(new Date(info.regDate))}
          </span>
          <span className={style.historyText}>
            마감날짜: {formattedDate.format(new Date(info.dueDate))}
          </span>
        </div>
        <div className={style.wrap}>
          {info.deadline ? (
            <div className={style.labelBox}>마감</div>
          ) : (
            <button className={style.button} onClick={extension}>
              수정
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function isDateTimeEarlierThanNow(dateTimeValue) {
  const inputDateTime = new Date(dateTimeValue);
  const now = new Date();

  return inputDateTime < now;
}

function isDateTimeInputValid(dateTimeValue) {
  const inputDate = new Date(dateTimeValue);

  // 모든 필드가 유효한지 확인 (0 또는 NaN이 아닌지)
  return !isNaN(inputDate);
}
