import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IoClose } from "react-icons/io5";
import Grid from "@mui/material/Grid";
import style from "../../style/BizModal.module.css";
import IconButton from "@mui/material/IconButton";

// 각자 사용할 페이지에 선언할 내용들(예시)
// const [open, setOpen] = useState(false);
// const handleOpenModal = () => setOpen(true);
// const handleCloseModal = () => setOpen(false);

// BizModal에 전달할 props
// 1. isOpen : 모달 상태 전달(open -> isOpen)
// 2. handleClose : 모달창 닫는 함수 전달 (handleCloseModal -> handleClose)
// 3. children : <BizModal> 태그 내부에 내용 작성
// 4. title : 제목 필요시 title에 문자열 전달(선택)

export default function BizModal({ isOpen, handleClose, children, title }) {
  return (
    <>
      <div>
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
                <IconButton
                  size="small"
                  onClick={handleClose}
                  sx={{ color: "white" }}
                >
                  <IoClose />
                </IconButton>
              </div>
            </div>
            <div className={style.content}>{children}</div>
          </div>
        </Modal>
      </div>
    </>
  );
}
