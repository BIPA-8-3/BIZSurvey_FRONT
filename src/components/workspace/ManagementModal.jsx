import { useContext, useEffect, useMemo, useState } from "react";
import style from "../../style/workspace/Modal.module.css";
import AdminItem from "./AdminItem";
import ReactDOM from "react-dom";
import { IoCloseSharp } from "react-icons/io5";
import ContactItem from "./ContactItem";
import { createContact, removeContact, inviteAdmin, removeAdmin } from "../../pages/workspace/api";
import { useWorkspaceContext } from "../../pages/workspace/WorkspaceContext";

export default function ManagementModal({ isOpen, onClose, tab, managedValues }) {
  ////////////////////////////////////////////////////////////////
  ////////////////////////// useContext //////////////////////////
  ////////////////////////////////////////////////////////////////
  // context에서 workspace id 추출
  const { selectedWorkspaceId } = useWorkspaceContext();

  // 관리정보 추출
  const {
    owner,
    adminList,
    setAdminList,
    adminWaitList,
    setAdminWaitList,
    contactList,
    setContactList,
  } = managedValues;

  ////////////////////////////////////////////////////////////////
  /////////////////////////// useState ///////////////////////////
  ////////////////////////////////////////////////////////////////
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

  // 관리자 검색
  const [adminSearchKeyword, setAdminSearchKeyword] = useState("");

  // [admin] input state
  const [adminSearchList, setAdminSearchList] = useState([]);

  ///////////////////////////////////////////////////////////////
  ////////////////////////// useEffect //////////////////////////
  ///////////////////////////////////////////////////////////////
  // 모달 on/off Effeuct
  useEffect(() => {
    if (isOpen) {
      chageTab(tab);
    }
  }, [tab]);

  // 최초 로딩 useEffect
  useEffect(() => {
    if (!isOpen) {
      setContactForm({
        name: "",
        email: "",
      });
    }
    chageTab(tab);
    setEmail("");
    setContactSearchEmailKeyword("");
    setContactSearchNameKeyword("");
  }, [isOpen]);

  // 디바운싱 적용 [연락처]
  useEffect(() => {
    const timeoutId = setTimeout(
      () => {
        setContactSearchEmailKeyword(contactForm.email);
        setContactSearchNameKeyword(contactForm.name);
      },
      !contactForm.email && !contactForm.name ? 0 : 300
    );

    return () => {
      clearTimeout(timeoutId);
    };
  }, [contactForm.email, contactForm.name]);

  // 디바운싱 적용 [관리자]
  useEffect(() => {
    const timeoutId = setTimeout(
      () => {
        setAdminSearchKeyword(email);
      },
      !email ? 0 : 300
    );

    return () => {
      clearTimeout(timeoutId);
    };
  }, [email]);

  // 모달이 열려있지 않으면
  if (!isOpen) {
    return null;
  }

  ////////////////////////////////////////////////////////////////
  ///////////////////////// event Method /////////////////////////
  ////////////////////////////////////////////////////////////////
  // contact save handler
  const handleChangeInput = (e, inputType) => {
    setContactForm((prevInput) => {
      return {
        ...prevInput,
        [inputType]: e.target.value,
      };
    });
  };

  // 관리자 초대 메소드
  const handleClickInviteBtn = (e) => {
    e.preventDefault();

    if (adminList.length + adminWaitList.length > 3) {
      alert("최대 4명까지 초대 가능합니다.");
      return;
    }

    let adminCheck = false;

    if (owner.email === email) {
      adminCheck = true;
    } else if (adminList.filter((admin) => admin.email === email).length > 0) {
      adminCheck = true;
    } else if (adminWaitList.filter((admin) => admin.email === email).length > 0) {
      adminCheck = true;
    }

    if (adminCheck) {
      alert("이미 초대된 회원입니다.");
      return null;
    }

    let inviteRequest = {
      workspaceId: selectedWorkspaceId,
      email: email,
      adminType: "INVITED",
    };

    setEmail("");
    setAdminSearchKeyword("");

    const temp = {
      nickName: email,
      id: -1,
      email: email,
    };
    setAdminWaitList([...adminWaitList, temp]);
    inviteAdmin(inviteRequest)
      .then((data) => {
        console.log(data);
        // temp.id = data.id;
        setAdminWaitList([...adminWaitList.filter((a) => a.id !== -1), data]);
      })
      .catch((error) => {
        console.error(error);
        setAdminWaitList(adminWaitList.filter((admin) => admin.email !== email));
        alert("초대에 실패하였습니다.");
      });
  };

  // 연락처 저장 요청 메소드
  const handleSaveContactSubmit = (e) => {
    e.preventDefault();
    let formData = { ...contactForm, workspaceId: selectedWorkspaceId };

    let contactCount = contactList.filter((contact) => {
      if (contact.email === contactSearchEmailKeyword) {
        return contact;
      }
    }).length;

    if (contactCount > 0) {
      alert("이미 등록된 연락처 입니다.");
      return null;
    }
    setContactForm({ name: "", email: "" });

    createContact(formData)
      .then((data) => {
        let copy = [...contactList];
        copy.push(data);
        setContactList(copy);
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

  // 관리자 삭제 메소드
  const handleClickRemoveAdminBtn = (id, inviteFlag) => {
    if (id === -1) {
      alert("초대메일 전송중 입니다. 잠시후에 다시 시도해주세요");
      return;
    }

    removeAdmin(id)
      .then((data) => {
        console.log(data);
        if (!inviteFlag) {
          let copy = adminWaitList.filter((admin) => admin.id !== id);
          setAdminWaitList(copy);
        } else {
          let copy = adminList.filter((admin) => admin.id !== id);
          setAdminList(copy);
        }
      })
      .catch((error) => {
        console.log(error);
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
                <form style={{ margin: "0", padding: "0", display: "flex", alignItems: "center" }}>
                  <input
                    className={style.inputEmail}
                    type="email"
                    id="email"
                    placeholder="사용자, 이메일 추가"
                    value={email}
                    onChange={handleChangeEmail}
                    required
                  />
                  <button className={style.button} onClick={(e) => handleClickInviteBtn(e)}>
                    초대
                  </button>
                </form>
              </div>
              <div className={style.itemBox}>
                {/* admin Component */}
                {owner.email.includes(adminSearchKeyword) ||
                owner.nickName.includes(adminSearchKeyword) ? (
                  <AdminItem key={owner.id} info={owner} />
                ) : null}

                {adminList.map((admin) => {
                  if (
                    admin.email.includes(adminSearchKeyword) ||
                    admin.nickName.includes(adminSearchKeyword)
                  ) {
                    return (
                      <AdminItem
                        key={admin.id}
                        info={admin}
                        handleClickRemoveAdminBtn={handleClickRemoveAdminBtn}
                      />
                    );
                  } else {
                    return null;
                  }
                })}

                {adminWaitList.map((admin) => {
                  if (
                    admin.email.includes(adminSearchKeyword) ||
                    admin.nickName.includes(adminSearchKeyword)
                  ) {
                    return (
                      <AdminItem
                        key={admin.id}
                        info={admin}
                        handleClickRemoveAdminBtn={handleClickRemoveAdminBtn}
                      />
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
          </div>

          {/* 연락처 관리 */}
          <div className={`${style.tabContentWrap} ${activeTab === "tab2" ? style.active : ""}`}>
            <div className={style.tabContent}>
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
                    (contactSearchEmailKeyword &&
                      contact.email.includes(contactSearchEmailKeyword)) ||
                    (contactSearchNameKeyword && contact.name.includes(contactSearchNameKeyword)) ||
                    (!contactSearchEmailKeyword && !contactSearchNameKeyword)
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
