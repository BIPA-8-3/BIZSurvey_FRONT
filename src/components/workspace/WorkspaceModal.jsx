import style from "../../style/workspace/WorkspaceModal.module.css";
import ReactDOM from "react-dom";
import { IoCloseSharp } from "react-icons/io5";
import { createWorkspace, modifyWorkspace } from "../../pages/workspace/api";
import { useWorkspaceContext } from "../../pages/workspace/WorkspaceContext";

export const WorkspaceModal = ({
  isOpen,
  setWorkspaceModalState,
  pageNum,
  handleClickSubmitBtn,
}) => {
  const { workspaceList, setWorkspaceList } = useWorkspaceContext();

  let title = ["워크스페이스 생성", "워크스페이스 수정", "설문지 제목 수정"];
  let explanation = [
    "워크스페이스 이름을 입력하세요",
    "새로운 이름을 입력하세요",
    "새로운 설문지 제목을 입력하세요",
  ];
  let buttonName = ["생성", "수정", "수정"];

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

  const onClose = () => {
    setWorkspaceModalState(false);
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
            <input
              className={style.input}
              type="text"
              id="input_name"
              placeholder={explanation[pageNum]}
            />
            <button
              className={style.button}
              onClick={() => {
                if (pageNum === 0) {
                  handleClickSubmitBtn();
                } else if (pageNum === 1) {
                  handleModifyBtnClick();
                } else {
                  handleModifySurveyNameBtnClick();
                }
                onClose();
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
