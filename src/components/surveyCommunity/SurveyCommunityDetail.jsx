import * as React from "react";
import style from "../../style/surveyCommunity/SurveyCommunityDetail.module.css";
import "../../style/Common.css";
import useFadeIn from "../../style/useFadeIn";
import back from "../../assets/img/back.png";
import Button from "@mui/material/Button";
import logo from "../../assets/img/avatar.png";
import { Link, useLocation } from "react-router-dom";
import Comment from "../community/Comment";
import ParentsComment from "../community/ParentsComment";
import { useState, useEffect, useContext } from "react";
import ChildCommentForm from "../community/ChildCommentForm";
import ChildComment from "../community/ChildComment";
import Loader from "../../pages/loader/Loader";
import axios from "axios";
import BizModal from "../common/BizModal";
import ClaimReasonModal from "../common/ClaimReasonModal";
import call from "../../pages/workspace/api";
import { LoginContext } from "../../App";
import { useNavigate } from "react-router-dom";

export default function CommunityPost() {
  const fadeIn = useFadeIn();
  const [isAvailable, setIsAvailable] = useState(true);
  const location = useLocation();
  // let postId = location.state.postId;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const userInfo = useContext(LoginContext);
  const [isAuthor, setIsAuthor] = useState(false);
  const [postId, setPostId] = useState(0);

  useEffect(() => {
    // 데이터를 가져오는 함수
    const post = location.state.postId;
    setPostId(post);
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행되도록 함

  useEffect(() => {
    const fetchData = async () => {
      try {
        call("/s-community/showPost/" + postId, "GET").then((data) => {
          console.log("리스폰스 : " + JSON.stringify(data));
          if (data.reported === 1) {
            alert("신고당한 게시물입니다.");
            navigate("/");
          }
          setData(data);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // 데이터 로딩이 끝났음을 표시
      }
    };
    if (postId != 0) {
      fetchData(); // 함수 호출
    }
  }, [postId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userInfo.nickname === data.nickname) {
          console.log(userInfo.nickname, "aaaaaaaaaaaaaaaaaa", data.nickname);
          setIsAuthor(true);
        }
        const res = await call("/s-community/survey/check/" + postId, "GET");
        setIsAvailable(!res);
        const access = data.canAccess;
        if (access === "대기" || access === "설문 종료") {
          setIsAvailable(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [data]);

  if (loading) {
    return (
      <>
        <Loader />
      </>
    ); // 데이터 로딩 중에는 로딩 표시
  }
  console.log("데이타", data);
  console.log(postId);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectReasons = (selectedReasons) => {
    // 선택된 이유들을 사용하거나 필요에 따라 다른 작업을 수행합니다.
    console.log("Selected Reasons:", selectedReasons);
  };

  // const removePTags = (html) => {
  //   // 정규식을 사용하여 <p></p> 태그를 제거합니다.
  //   const withoutPTags = html.replace(/<p>/g, "").replace(/<\/p>/g, "");
  //   return withoutPTags;
  // };

  // const removePTags = (html) => {
  //   // html이 유효한 값이 아니면 빈 문자열 반환
  //   if (html === undefined || html === null) {
  //     return "";
  //   }

  //   const withoutPTags = html.replace(/<p>/g, "").replace(/<\/p>/g, "");
  //   return withoutPTags;
  // };

  function renderAccess() {
    if (data.canAccess === "대기") {
      return "시작전";
    } else if (data.canAccess === "설문 종료") {
      return "설문 종료";
    } else {
      return "참여 완료";
    }
  }

  const handleDeletePost = () => {
    const res = window.confirm("게시물을 삭제하시겠습니까?");
    if (res) {
      call("/s-community/deleteSurveyPost/" + postId, "DELETE")
        .then((data) => {
          window.alert(data);
          navigate("/");
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className={`fade-in ${fadeIn ? "active" : ""}`}>
      <div className={style.contentWrap}>
        <div style={{ backgroundColor: "rgba(209, 232, 248, 0.1)" }}>
          <div className={style.title}>
            <h1>{data.title}</h1>
            <p style={{ display: "flex" }}>
              <p style={{ textAlign: "center" }}>
                <div className={style.profil} style={{ textAlign: "center" }}>
                  <span className={style.photo}>
                    <img className="" src={logo} />
                  </span>
                  <span className={style.nickname}>{data.nickname}</span>
                </div>
              </p>
              <div style={{ marginTop: "16px" }}>
                <span className={style.bar}> | </span>
                <span>S-COMMUNITY</span>
                <span className={style.bar}> | </span>
                <span>{data.startDateTime}</span>
              </div>
            </p>
          </div>
        </div>
        <div className={style.content}>
          <p dangerouslySetInnerHTML={{ __html: data.content }} />
          <div className={style.surveyBtnWrap}>
            {isAvailable ? (
              <Link to={"/communitySurveyWrite"} state={{ postId: postId }}>
                <Button
                  variant="contained"
                  href="#contained-buttons"
                  sx={[
                    {
                      padding: "11px 30px",
                      backgroundColor: "#243579",
                      fontWeight: "bold",
                      marginBottom: "10px",
                      border: "1px solid #243579",
                      boxShadow: 0,
                      marginLeft: "5px",
                    },
                    {
                      ":hover": {
                        border: "1px solid #1976d2",
                        boxShadow: 0,
                      },
                    },
                  ]}
                >
                  설문참여
                </Button>
              </Link>
            ) : (
              <Button
                variant="contained"
                disabled={true}
                sx={[
                  {
                    padding: "11px 30px",
                    backgroundColor: "#243579",
                    fontWeight: "bold",
                    marginBottom: "10px",

                    boxShadow: 0,
                    marginLeft: "5px",
                  },
                ]}
              >
                {renderAccess()}
              </Button>
            )}
          </div>
          <p
            style={{
              marginTop: "100px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              조회수 <span style={{ fontWeight: "bold" }}>{data.count}</span>
              <span style={{ color: "#ddd" }}> | </span>
              댓글{" "}
              <span style={{ fontWeight: "bold" }}>{data.commentSize}</span>
            </div>
            <div>
              {isAuthor ? (
                <>
                  <Link
                    to={"/editSurveyCommunity"}
                    state={{ surveyId: data.surveyId, postId: postId }}
                  >
                    <span
                      style={{ cursor: "pointer", fontSize: "14px" }}
                      onClick={handleOpenModal}
                    >
                      수정
                    </span>
                  </Link>
                  <span> | </span>
                  <span
                    style={{ cursor: "pointer", fontSize: "14px" }}
                    onClick={handleDeletePost}
                  >
                    삭제
                  </span>
                  <span> | </span>
                </>
              ) : null}

              <span
                style={{ cursor: "pointer", fontSize: "14px" }}
                onClick={handleOpenModal}
              >
                신고
              </span>
            </div>

            {/* 모달 */}
            {isModalOpen && (
              <ClaimReasonModal
                onSelect={handleSelectReasons}
                onClose={handleCloseModal}
                isModalOpen={isModalOpen}
                props={"post"}
                id={postId}
              />
            )}
          </p>
        </div>
        <Comment props={{ postId: postId, type: "sc" }} />
        <ParentsComment
          props={{ postId: postId, commentList: data.commentList, type: "sc" }}
        />
      </div>

      <div style={{ textAlign: "center" }}>
        <Link to={"/surveyPost"}>
          <Button
            variant="contained"
            href="#contained-buttons"
            sx={{
              padding: "11.5px 30px",
              backgroundColor: "#243579",
              fontWeight: "bold",
            }}
          >
            목록으로
          </Button>
        </Link>
      </div>
      <img src={back} alt="배경" className={style.back} />
    </div>
  );
}
