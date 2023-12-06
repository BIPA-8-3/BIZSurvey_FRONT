import style from "../../style/workspace/WorkspaceModal.module.css";
import ReactDOM from "react-dom";
import { IoCloseSharp } from "react-icons/io5";
import { createWorkspace, modifyWorkspace } from "../../pages/workspace/api";

export const WorkspaceModal = ({
  isOpen,
  onClose,
  workspaceList,
  setWorkspaceList,
  pageNum,
  handleChaneWorkspaceName,
  // selectedWorkspaceId,
}) => {
  let title = ["워크스페이스 생성", "워크스페이스 수정"];
  let explanation = ["워크스페이스 이름을 입력하세요", "새로운 이름을 입력하세요"];
  let buttonName = ["생성", "수정"];

  console.log("pageNum: " + pageNum);
  if (!isOpen) {
    return null;
  }
  const handleCreateBtnClick = () => {
    const workspaceName = document.getElementById("workspace_name").value;

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

  const handleModifyBtnClick = () => {
    const workspaceName = document.getElementById("workspace_name").value;
    handleChaneWorkspaceName(null, workspaceName);
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
              id="workspace_name"
              placeholder={explanation[pageNum]}
            />
            <button
              className={style.button}
              onClick={() => {
                if (pageNum === 0) {
                  handleCreateBtnClick();
                } else {
                  handleModifyBtnClick();
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
