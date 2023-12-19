import { useEffect, useRef, useState } from "react";
import style from "../../style/workspace/SurveyCard.module.css";
import { BiDotsHorizontalRounded } from "react-icons/bi";

export default function SurveyCard({
  survey,
  onOpenModal,
  handleRemoveBtnClick,
  setWorkspaceModalState,
  setWorkspaceModalNum,
  setChageModalSurveyId,
  setSelectedSurveyId,
}) {
  const { type, surveyId, title } = survey;
  const cotainerRef = useRef(null);

  const handleClickCard = (id) => {
    setSelectedSurveyId(id);
  };

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

  // open Workspace Modal
  const openWorkspaceModal = (num) => {
    toggleMenu();
    setChageModalSurveyId(surveyId);
    setWorkspaceModalNum(num);
    setWorkspaceModalState(true);
  };

  return (
    <div
      id={style.Container}
      ref={cotainerRef}
      onClick={(e) => {
        e.preventDefault();
        handleClickCard(surveyId);
      }}
    >
      <div className={style.cardHeader}>
        {type === "NORMAL" ? "🗒️" : "📝"}
        <div className={style.menuContainer}>
          <span>
            <BiDotsHorizontalRounded
              className={style.optionBtn}
              onClick={(e) => {
                e.stopPropagation();
                toggleMenu();
              }}
            />

            {/* {moreMenu && ( */}
            <div className={`${style.menu} ${moreMenu ? style.visible : ""}`}>
              <ul>
                <li
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMenu();
                    onOpenModal(surveyId, title, 0);
                  }}
                >
                  공유
                </li>
                <li
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMenu();
                    onOpenModal(surveyId, title, 1);
                  }}
                >
                  공유 히스토리
                </li>
                <li
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMenu();
                    openWorkspaceModal(2);
                  }}
                >
                  이름 바꾸기
                </li>
                <li
                  onClick={(e) => {
                    e.stopPropagation();
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

// import * as React from "react";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
// import { CardActionArea } from "@mui/material";
// import MoreMenu from "../common/MoreMenu";
// import { FaCirclePlus } from "react-icons/fa6";

// export default function SurveyCard({ info }) {
//   if (info) {
//     return (
//       <Card sx={{ maxWidth: 345, height: 160, width: 260, borderRadius: 3 }}>
//         <CardActionArea style={{ height: "100%" }}>
//           <div style={{ textAlign: "right" }}>
//             <div
//               style={{ display: "inline-block", transform: "rotate(90deg)", marginRight: "10px" }}
//             >
//               <MoreMenu></MoreMenu>
//             </div>
//           </div>
//           <CardContent>
//             <Typography gutterBottom variant="h5" component="div">
//               <div
//                 style={{
//                   fontSize: "17px",
//                   whiteSpace: "nowrap",
//                   overflow: "hidden",
//                   textOverflow: "ellipsis",
//                 }}
//               >
//                 {info}
//               </div>
//             </Typography>

//             <Typography variant="body2" color="text.secondary">
//               <div style={{ marginTop: "15px" }}>등록일</div>
//             </Typography>
//           </CardContent>
//         </CardActionArea>
//       </Card>
//     );
//   } else {
//     return (
//       <Card sx={{ maxWidth: 345, height: 180, width: 260, borderRadius: 3 }}>
//         <CardActionArea style={{ height: "100%", backgroundColor: "#f4f4f4" }}>
//           <CardContent>
//             <Typography gutterBottom variant="h5" component="div">
//               <div style={{ padding: "40px", height: "100%", textAlign: "center" }}>
//                 <span style={{ textAlign: "center", color: "#c2c2c2", fontSize: "46pt" }}>
//                   <FaCirclePlus />
//                 </span>
//               </div>
//             </Typography>
//           </CardContent>
//         </CardActionArea>
//       </Card>
//     );
//   }
// }
