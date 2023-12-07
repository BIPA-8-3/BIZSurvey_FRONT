import { BiDotsHorizontalRounded } from "react-icons/bi";
import style from "../../style/workspace/MoreMenu.module.css";
import { useRef, useEffect, useState } from "react";
import Modal from "./Modal";

const MoreMenu = () => {
  // 더보기 메뉴

  const cotainerRef = useRef(null);

  // MoreMenu
  let [moreMenu, setMoreMenu] = useState(false);

  const toggleMenu = () => {
    setMoreMenu(!moreMenu);
  };

  const handleDocumentClick = (event) => {
    if (cotainerRef.current && !cotainerRef.current.contains(event.target) && moreMenu) {
      toggleMenu();
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트된 경우에만 이벤트 리스너 추가
    document.addEventListener("click", handleDocumentClick);

    // 컴포넌트가 언마운트되면 이벤트 리스너 제거
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [moreMenu]);

  // 모달
  let [modal, setModal] = useState(false);

  const closeModal = () => {
    setModal(false);
  };

  // menu
  let [menu, setMenu] = useState("tab1");

  return (
    <div ref={cotainerRef} className={style.menuContainer}>
      <Modal isOpen={modal} onClose={closeModal} tab={menu} />

      <BiDotsHorizontalRounded
        onClick={() => {
          // setModal(!modal);
          toggleMenu();
        }}
        className={style.callMoreMenuBtn}
      />
      {/* {moreMenu && ( */}
      <div className={`${style.menu} ${moreMenu ? style.visible : ""}`}>
        <ul>
          <li
            onClick={() => {
              setMenu("tab1");
              toggleMenu();
              setModal(true);
            }}
          >
            관리자 관리
          </li>
          <li
            onClick={() => {
              setMenu("tab2");
              toggleMenu();
              setModal(true);
            }}
          >
            연락처 관리
          </li>
          <li>이름 바꾸기</li>
          <li>삭제</li>
        </ul>
      </div>
    </div>
  );
};

export default MoreMenu;
