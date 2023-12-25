import style from "../../style/workspace/WorkspaceModal.module.css";
import ReactDOM from "react-dom";
import { IoCloseSharp } from "react-icons/io5";

export const WorkspaceModal = ({
  isOpen,
  setWorkspaceModalState,
  pageNum,
  handleClickSubmitBtn,
}) => {
  let title = ["워크스페이스 생성", "워크스페이스 수정", "설문지 제목 수정", "마감일자 수정"];
  let explanation = [
    "워크스페이스 이름을 입력하세요",
    "새로운 이름을 입력하세요",
    "새로운 설문지 제목을 입력하세요",
    "새로운 마감날짜를 입력하세요",
  ];
  let buttonName = ["생성", "수정", "수정", "수정"];

  if (!isOpen) {
    return null;
  }

  const handleModifyBtnClick = () => {
    const workspaceName = document.getElementById("input_name").value;
    handleClickSubmitBtn(null, workspaceName);
  };

  const handleModifySurveyNameBtnClick = () => {
    const surveyTitle = document.getElementById("input_name").value;
    handleClickSubmitBtn(surveyTitle);
  };

  const handleModifyDeadlineDateBtnClick = () => {
    const deadlineDate = document.getElementById("input_name").value;
    return handleClickSubmitBtn(deadlineDate);
  };

  const onClose = () => {
    setWorkspaceModalState(false);
  };

  const handleSubmit = () => {
    switch (pageNum) {
      case 0:
        handleClickSubmitBtn();
        onClose();
        break;
      case 1:
        handleModifyBtnClick();
        onClose();
        break;
      case 2:
        handleModifySurveyNameBtnClick();
        onClose();
        break;
      case 3:
        handleModifyDeadlineDateBtnClick();
        break;
    }
  };

  return ReactDOM.createPortal(
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.ModalWrap} onClick={(e) => e.stopPropagation()}>
        <div className={style.modalHeader}>
          <span>{title[pageNum]}</span>
          <div className={style.modalExitBtn}>
            <IoCloseSharp onClick={onClose} />
          </div>
        </div>
        {/* modalBody */}
        <div className={style.modalBody}>
          <div className={style.inputBox}>
            {pageNum !== 3 ? (
              <input
                className={style.input}
                type="text"
                id="input_name"
                placeholder={explanation[pageNum]}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.stopPropagation();
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
            ) : (
              <input
                className={style.input}
                type="datetime-local"
                id="input_name"
                placeholder={explanation[pageNum]}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.stopPropagation();
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
            )}
            <button
              className={style.button}
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              {buttonName[pageNum]}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
