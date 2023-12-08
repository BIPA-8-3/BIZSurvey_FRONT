import { useContext, useEffect, useState } from "react";
import style from "../../style/workspace/Modal.module.css";
import AdminItem from "./AdminItem";
import ReactDOM from "react-dom";
import { IoCloseSharp } from "react-icons/io5";
import ContactItem from "./ContactItem";
import { createContact, getContactList, removeContact } from "../../pages/workspace/api";
import { WorkspaceContext } from "../../pages/workspace/Main";

export default function ManagementModal({ isOpen, onClose, tab }) {
  // context에서 workspace id 추출
  const { selectedWorkspaceId } = useContext(WorkspaceContext);

  // context에서 contactList 추출
  const { contactList, setContactList } = useContext(WorkspaceContext);

  // 최초 로딩 useEffect
  useEffect(() => {
    if (isOpen) {
      let listRequest = {
        workspaceId: selectedWorkspaceId,
        keyword: "",
      };

      getContactList(listRequest)
        .then((data) => {
          setContactList(data);
        })
        .catch((error) => {
          console.error(error);
          console.log(error.response);
        });
    } else {
      setContactForm({
        name: "",
        email: "",
      });
    }
  }, [isOpen]);

  // 관리자 초대 및 검색 input
  const [email, setEmail] = useState("");
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  // 탭
  const [activeTab, setActiveTab] = useState(null);
  const chageTab = (value) => {
    setActiveTab(value);
  };

  // [contact] input state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
  });

  // 연락처 검색
  const [contactSearchEmailKeyword, setContactSearchEmailKeyword] = useState("");
  const [contactSearchNameKeyword, setContactSearchNameKeyword] = useState("");

  // 디바운싱 적용 [이메일]
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setContactSearchEmailKeyword(contactForm.email);
      setContactSearchNameKeyword(contactForm.name);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [contactForm.email, contactForm.name]);

  // contact save handler
  const handleChangeInput = (e, inputType) => {
    setContactForm((prevInput) => {
      return {
        ...prevInput,
        [inputType]: e.target.value,
      };
    });
  };

  // [admin] input state
  const [adminSearch, setAdminSearch] = useState("");

  useEffect(() => {
    if (isOpen) {
      chageTab(tab);
    }
  }, [tab]);

  if (!isOpen) {
    return null;
  }

  // 연락처 저장 요청 메소드
  const handleSaveContactSubmit = (e) => {
    e.preventDefault();
    let formData = { ...contactForm, workspaceId: selectedWorkspaceId };
    createContact(formData)
      .then((data) => {
        let copy = [...contactList];
        copy.push(data);
        setContactList(copy);
        setContactForm({ name: "", email: "" });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 연락처 삭제 요청 메소드
  const handleClickRemoveBtn = (id) => {
    removeContact(id)
      .then((data) => {
        console.log(data);
        let copy = contactList.filter((contact) => contact.id !== id);
        setContactList(copy);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
                  onChange={handleChangeEmail}
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
              {/* <div className={style.inputContactBox}> */}
              <div className={style.inputWrap}>
                <form
                  onSubmit={handleSaveContactSubmit}
                  style={{ margin: "0", padding: "0", display: "flex", alignItems: "center" }}
                >
                  <input
                    className={style.inputContact}
                    type="text"
                    id="name"
                    placeholder="이름"
                    value={contactForm.name}
                    onChange={(e) => handleChangeInput(e, "name")}
                    required
                  />
                  <input
                    className={style.inputContact}
                    type="email"
                    id="email"
                    placeholder="이메일"
                    value={contactForm.email}
                    onChange={(e) => handleChangeInput(e, "email")}
                    required
                  />
                  <button type="submit" className={style.button} style={{ marginLeft: "2px" }}>
                    저장
                  </button>
                </form>
              </div>

              <div className={style.contactBox}>
                {contactList.map((contact) => {
                  if (
                    (!contactSearchEmailKeyword ||
                      contactSearchEmailKeyword === "" ||
                      contact.email.includes(contactSearchEmailKeyword)) &&
                    (!contactSearchNameKeyword ||
                      contactSearchNameKeyword === "" ||
                      contact.name.includes(contactSearchNameKeyword))
                  ) {
                    return (
                      <ContactItem
                        key={contact.id}
                        email={contact.email}
                        name={contact.name}
                        id={contact.id}
                        handleClickRemoveBtn={handleClickRemoveBtn}
                      />
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
