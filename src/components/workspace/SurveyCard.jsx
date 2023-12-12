import { useEffect, useRef, useState } from "react";
import style from "../../style/workspace/SurveyCard.module.css";
import { BiDotsHorizontalRounded } from "react-icons/bi";

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

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [moreMenu]);

  const handleDocumentClick = (event) => {
    if (cotainerRef.current && !cotainerRef.current.contains(event.target) && moreMenu) {
      toggleMenu();
    }
  };

  const toggleMenu = () => {
    setMoreMenu(!moreMenu);
  };

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
                    toggleMenu();
                    onOpenModal(surveyId, title, 0);
                  }}
                >
                  공유
                </li>
                <li
                  onClick={() => {
                    toggleMenu();
                    onOpenModal(surveyId, title, 1);
                  }}
                >
                  공유 히스토리
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
