import { IoClose } from "react-icons/io5";
import style from "../../style/workspace/SharingMethodModal.module.css";
import { IconButton } from "@mui/material";
import { TfiEmail } from "react-icons/tfi";
import { IoIosLink } from "react-icons/io";
import { useState } from "react";

export default function SharingMethodModal({ isOpen, toggleMethodModal, setShareModal }) {
  if (!isOpen) {
    return null;
  }

  const onClose = () => {
    toggleMethodModal();
    return;
  };

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.modalWrap}>
        <div className={style.header}>
          <div className={style.title}>공유방식 선택</div>
          <div className={style.close}>
            <IconButton size="small" onClick={onClose} sx={{ color: "black" }}>
              <IoClose />
            </IconButton>
          </div>
        </div>
        <div className={style.body}>
          <div
            className={style.item}
            onClick={(e) => {
              e.stopPropagation();
              toggleMethodModal();
              setShareModal(true);
              return;
            }}
          >
            <div className={style.element}>
              <TfiEmail className={style.img} />
            </div>
            <div className={style.element}>
              <div className={style.subjectFont}>이메일 공유</div>
            </div>
            <div className={style.element}>
              <div className={style.font}>등록된 연락처로 공유할 수 있습니다.</div>
            </div>
          </div>
          <div
            className={style.item}
            onClick={(e) => {
              e.stopPropagation();
              alert("추후 오픈 예정입니댜.");
              return;
            }}
          >
            <div className={style.element}>
              <IoIosLink className={style.img} />
            </div>
            <div className={style.element}>
              <div className={style.subjectFont}>링크 공유</div>
            </div>
            <div className={style.element}>
              <div className={style.font}>설문지 링크를 발급합니다.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
