import { useState } from "react";
import style from "../../style/workspace/DefaultCard.module.css";
import { IoAddCircleSharp } from "react-icons/io5";
import SurveyCreateModal from "./SurveyCreateModal";

export default function DefaultCard() {
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  return (
    <>
      <div id={style.DefaultCard} onClick={handleOpenModal}>
        <IoAddCircleSharp className={style.addBtn}></IoAddCircleSharp>
      </div>

      <SurveyCreateModal
        isOpen={open}
        handleClose={handleCloseModal}
        title={"새로운 설문지 생성"}
      ></SurveyCreateModal>
    </>
  );
}
