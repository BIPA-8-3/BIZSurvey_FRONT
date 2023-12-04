import style from "../../style/workspace/ShareModal.module.css";
import { IoCloseSharp } from "react-icons/io5";
import ReactDOM from "react-dom";
import AdminItem from "./AdminItem";
import ContactItem from "./ContactItem";

export default function ShareModal({ isOpen, onClose, surveyId }) {
  if (!isOpen) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.ModalWrap} onClick={(e) => e.stopPropagation()}>
        <div className={style.modalHeader}>
          <span>이메일 공유</span>
          <div className={style.modalExitBtn}>
            <IoCloseSharp onClick={onClose} />
          </div>
        </div>
        {/* modalBody */}
        <div className={style.modalBody}>
          <div className={style.inputBox}>
            <span>선택된 설문지</span>
            <input
              className={style.surveyNameBox}
              type="email"
              id="email"
              placeholder="선택된 설문지 이름"
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
                        <span>이메일 목록</span>
                      </li>
                    </ul>
                  </div>
                  <div className={style.listBoxBody}>
                    <ContactItem btnVisible={false} />
                    <ContactItem btnVisible={false} />
                    <ContactItem btnVisible={false} />
                    <ContactItem btnVisible={false} />
                    <ContactItem btnVisible={false} />
                    <ContactItem btnVisible={false} />
                    <ContactItem btnVisible={false} />
                    <ContactItem btnVisible={false} />
                    <ContactItem btnVisible={false} />
                  </div>
                </div>
              </div>

              <div className={style.itemBox}>
                {/* <span>선택된 이메일</span> */}
                <div className={style.listBox}>
                  <div className={style.listBoxHeader}>
                    <ul>
                      <li>
                        <span>선택 목록</span>
                      </li>
                    </ul>
                  </div>
                  <div className={style.listBoxBody}>
                    <ContactItem />
                    <ContactItem />
                    <ContactItem />
                    <ContactItem />
                    <ContactItem />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={style.rightContainer}>
            <button className={`${style.button} ${style.right}`}>전송</button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
