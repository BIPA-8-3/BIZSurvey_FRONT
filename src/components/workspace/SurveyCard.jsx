import { useEffect, useRef, useState } from "react";
import style from "../../style/workspace/SurveyCard.module.css";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { removeSurvey } from "../../pages/workspace/api";

export default function SurveyCard({
  type,
  surveyId,
  title,
  onOpenModal,
  onClose,
  handleRemoveBtnClick,
}) {
  const cotainerRef = useRef(null);

  // 더보기 상태
  let [moreMenu, setMoreMenu] = useState(false);

  // 메뉴 종류
  let [menu, setMenu] = useState(null);
  const toggleMenu = () => {
    setMoreMenu(!moreMenu);
  };

  const handleDocumentClick = (event) => {
    if (cotainerRef.current && !cotainerRef.current.contains(event.target) && moreMenu) {
      toggleMenu();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [moreMenu]);

  // 모달
  // let [modal, setModal] = useState(null);
  return (
    <div id={style.Container} ref={cotainerRef}>
      <div className={style.cardHeader}>
        {type}
        <div className={style.menuContainer}>
          <span>
            <BiDotsHorizontalRounded
              className={style.optionBtn}
              onClick={() => {
                toggleMenu();
              }}
            />

            {/* {moreMenu && ( */}
            <div className={`${style.menu} ${moreMenu ? style.visible : ""}`}>
              <ul>
                <li
                  onClick={() => {
                    setMenu("tab1");
                    toggleMenu();
                    onOpenModal(surveyId);
                  }}
                >
                  공유
                </li>
                <li>이름 바꾸기</li>
                <li
                  onClick={() => {
                    toggleMenu();
                    handleRemoveBtnClick(surveyId);
                  }}
                >
                  삭제
                </li>
              </ul>
            </div>
          </span>
        </div>
      </div>
      <div className={style.cardBody}>{title}</div>
      <div className={style.cardFooter}>2023-12-05 16:14</div>
    </div>
  );
}
