import { useEffect, useState } from "react";
import style from "../../style/workspace/Modal.module.css";
import AdminItem from "./AdminItem";
import ReactDOM from "react-dom";
import { IoCloseSharp } from "react-icons/io5";
import ContactItem from "./ContactItem";

export default function Modal({ isOpen, onClose, tab }) {
  // 관리자 초대 및 검색 input
  const [email, setEmail] = useState("");
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // 탭
  const [activeTab, setActiveTab] = useState(null);
  const chageTab = (value) => {
    setActiveTab(value);
  };

  useEffect(() => {
    chageTab(tab);
  }, [tab]);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    // modal
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.ModalWrap} onClick={(e) => e.stopPropagation()}>
        <div className={style.modalHeader}>
          <ul className={style.tabContainer}>
            <li
              className={`${style.tab} ${activeTab === "tab1" ? style.activeTab : ""}`}
              onClick={() => chageTab("tab1")}
            >
              관리자 관리
            </li>
            <li
              className={`${style.tab} ${activeTab === "tab2" ? style.activeTab : ""}`}
              onClick={() => chageTab("tab2")}
            >
              연락처 관리
            </li>
          </ul>
          <div className={style.modalExitBtn}>
            <IoCloseSharp onClick={onClose} />
          </div>
        </div>
        {/* modalBody */}
        <div className={style.modalBody}>
          {/* 관리자 관리 */}
          <div className={`${style.tabContentWrap} ${activeTab === "tab1" ? style.active : ""}`}>
            <div className={style.tabContent}>
              <div className={style.inputBox}>
                <input
                  className={style.inputEmail}
                  type="email"
                  id="email"
                  placeholder="사용자, 그룹, 이메일 추가"
                  value={email}
                  onChange={handleChange}
                  required
                />
                <button className={style.button}>초대</button>
              </div>
              <div className={style.itemBox}>
                {/* admin Component */}
                <AdminItem />
                <AdminItem />
                <AdminItem />
                <AdminItem />
                <AdminItem />
                <AdminItem />
                <AdminItem />
                <AdminItem />
                <AdminItem />
                <AdminItem />
                <AdminItem />
              </div>
            </div>
          </div>

          {/* 연락처 관리 */}
          <div className={`${style.tabContentWrap} ${activeTab === "tab2" ? style.active : ""}`}>
            <div className={style.tabContent}>
              <div className={style.inputContactBox}>
                <div className={style.inputWrap}>
                  <input
                    className={style.inputContact}
                    type="text"
                    id="name"
                    placeholder="이름"
                    required
                  />
                  <input
                    className={style.inputContact}
                    type="email"
                    id="email"
                    placeholder="이메일"
                    required
                  />
                  <button className={style.button}>저장</button>
                </div>
                {/* <div className={style.inputWrap} style={{ borderBottom: "1px solid #eee" }}> */}
                <div className={style.inputWrap}>
                  <input
                    className={style.inputEmail}
                    type="email"
                    id="email"
                    placeholder="사용자, 그룹, 이메일 추가"
                    value={email}
                    onChange={handleChange}
                    required
                  />
                  <button className={style.button}>조회</button>
                </div>
              </div>
              <div className={style.contactBox}>
                <ContactItem />
                <ContactItem />
                <ContactItem />
                <ContactItem />
                <ContactItem />
                <ContactItem />
                <ContactItem />
                <ContactItem />
                <ContactItem />
                <ContactItem />
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
    </div>,
    document.body
  );
}
