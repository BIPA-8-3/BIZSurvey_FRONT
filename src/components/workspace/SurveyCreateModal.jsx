import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import { IoClose, IoDocumentTextSharp } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import style from "../../style/workspace/SurveyModal.module.css";
import { useContext } from "react";
import { WorkspaceContext } from "../../pages/workspace/Main";

export default function SurveyCreateModal({ isOpen, handleClose, title }) {
  const { sectionNum, setSectionNum } = useContext(WorkspaceContext);
  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={style.container}>
          {/* 헤더 */}
          <div className={style.header}>
            <div className={style.title}>{title}</div>
            <div className={style.close}>
              <IconButton size="small" onClick={handleClose} sx={{ color: "black" }}>
                <IoClose />
              </IconButton>
            </div>
          </div>
          <div className={style.content}>
            <div className={style.buttonWrap}>
              <div
                className={style.first}
                onClick={(e) => {
                  console.log("sectionNum: " + sectionNum);
                  setSectionNum(1);
                  handleClose();
                }}
              >
                <div className={style.firstIconWrap}>
                  <span className={style.basicIcon}>
                    {/* <IoDocumentTextOutline /> */}
                    <IoDocumentTextSharp />
                  </span>
                </div>
                <div className={style.firstTextWrap}>
                  <p className={style.basicText}>기본 설문지</p>
                  <p className={style.basicText2}>다양한 옵션을 통해 설문지를 생성해 보세요.</p>
                </div>
              </div>
              <div
                className={style.second}
                onClick={(e) => {
                  console.log("sectionNum: " + sectionNum);
                  setSectionNum(2);
                  handleClose();
                }}
              >
                <div className={style.secondIconWrap}>
                  <span className={style.scoreIcon}>
                    <LuPencilLine />
                  </span>
                </div>
                <div className={style.secondTextWrap}>
                  <p className={style.scoreText}>퀴즈 만들기</p>
                  <p className={style.scoreText2}>질문에 점수를 추가하여 퀴즈를 생성해 보세요.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
