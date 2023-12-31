import * as React from "react";
import style from "../../style/community/CommunityDetail.module.css";
import "../../style/Common.css";
import { useState, useEffect, useContext } from "react";
import Loader from "../../pages/loader/Loader";
import useFadeIn from "../../style/useFadeIn";
import back from "../../assets/img/back.png";
import Button from "@mui/material/Button";
import logo from "../../assets/img/avatar.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Comment from "./Comment";
import ParentsComment from "./ParentsComment";
import VoteWrite from "./VoteWrite";
import ChildCommentForm from "./ChildCommentForm";
import ChildComment from "./ChildComment";
import axios from "axios";
import ClaimReasonModal from "../common/ClaimReasonModal";
import { LoginContext } from "../../App";
import call from "../../pages/workspace/api";
import VoteResult from "./VoteResult";

export default function CommunityPost() {
  const fadeIn = useFadeIn();
  const location = useLocation();
  let postId = location.state.postId;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const userInfo = useContext(LoginContext);
  const [isAuthor, setIsAuthor] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [voteResult, setVoteResult] = useState([]);
  const [voteSubmit, setVoteSubmit] = useState(false);

  useEffect(() => {
    const submitVote = async () => {
      setLoading(true);
      try {
        if (voteSubmit) {
          const voteResult = await call(
            `/community/${data.voteId}/showPercentage`,
            "GET"
          );
          setVoteResult(voteResult);
          setIsResult(true);
        }
      } catch (error) {
       
      } finally {
        setLoading(false);
      }
    };
    submitVote();
  }, [voteSubmit]);

  useEffect(() => {
    // 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        await call("/community/showPost/" + postId, "GET")
          .then((data) => {
            setData(data);

            if (data.reported === 1) {
              alert("신고당한 게시물입니다.");
              navigate("/community");
            }

            if (userInfo.nickname === data.nickname) {
              setIsAuthor(true);
            }
          })
          .catch((error) => {
            alert("이미 삭제된 게시물입니다.");
            navigate("/community");
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // 데이터 로딩이 끝났음을 표시
      }
    };

    fetchData(); // 함수 호출
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행되도록 함

  useEffect(() => {
    
    const checkVote = async () => {
      try {
        if (data.voteId != null) {
          const voteCheckResult = await call(
            `/community/checkVote/${data.voteId}`,
            "GET"
          );
          if (voteCheckResult === "cheked") {
            const result = await call(
              `/community/${data.voteId}/showPercentage`,
              "GET"
            );
            setVoteResult(result);
            setIsResult(true);
          } else {
            setIsResult(false);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkVote();
  }, [data]);

  if (loading) {
    return (
      <>
        <Loader />
      </>
    ); // 데이터 로딩 중에는 로딩 표시
  }

  let votePostId = data.postId;

  // const renderVote = async (isVote) => {
  //   console.log("isVOTE?" + isVote);
  //   console.log("isPOST?" + votePostId);

  //   if (isVote !== null) {
  //   }
  // };

  const handleOpenModal = () => {
    if (!localStorage.getItem("userInfo")) {
      alert("게시물 신고를 하려면 먼저 로그인을 해야 합니다.");
      navigate("/login");
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectReasons = (selectedReasons) => {
    // 선택된 이유들을 사용하거나 필요에 따라 다른 작업을 수행합니다.
    console.log("Selected Reasons:", selectedReasons);
  };

  const removePTags = (html) => {
    if (!html) {
      return ""; // html이 비어있는 경우 빈 문자열 반환
    }
    // 정규식을 사용하여 <p></p> 태그를 제거합니다.
    const withoutPTags = html.replace(/<p>/g, "").replace(/<\/p>/g, "");
    return withoutPTags;
  };

  const handleDeletePost = () => {
    const res = window.confirm("게시물을 삭제하시겠습니까?");
    if (res) {
      call("/community/deletePost/" + postId, "DELETE")
        .then((data) => {
          window.alert(data);
          navigate("/community");
        })
        .catch((error) => console.error(error));
    }
  };

  function renderProfil(profile) {
    if (profile === null) {
      return logo;
    } else {
      let prefix = "https://";
      return prefix + profile;
    }
  }

  return (
    <>
      <div className={`fade-in ${fadeIn ? "active" : ""}`}>
        <div className={style.contentWrap} style={{ marginTop: "30px" }}>
          <div style={{ backgroundColor: "rgba(209, 232, 248, 0.1)" }}>
            <div className={style.title}>
              <h1>{data.title}</h1>
              <p style={{ display: "flex" }}>
                <p style={{ textAlign: "center" }}>
                  <div className={style.profil} style={{ textAlign: "center" }}>
                    <span className={style.photo}>
                      <img
                        className=""
                        src={renderProfil(data.thumbImageUrl)}
                      />
                    </span>
                    <span className={style.nickname}>{data.nickname}</span>
                  </div>
                </p>
                <div style={{ marginTop: "16px" }}>
                  <span className={style.bar}> | </span>
                  <span>COMMUNITY</span>
                  <span className={style.bar}> | </span>
                  <span>{data.createTime}</span>
                </div>
              </p>
            </div>

            {/* </div> */}

            <div className={style.content}>
              <p
                dangerouslySetInnerHTML={{ __html: removePTags(data.content) }}
              />
              {data.voteId ? (
                <>
                  {isResult ? (
                    <VoteResult chartData={voteResult} />
                  ) : (
                    <VoteWrite
                      voteId={data.voteId}
                      postId={votePostId}
                      setSubmit={setVoteSubmit}
                    />
                  )}
                </>
              ) : null}

              {/* {renderVote(data.voteId)} */}

              <p
                style={{
                  marginTop: "100px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  조회수{" "}
                  <span style={{ fontWeight: "bold" }}>{data.count}</span>
                  <span style={{ color: "#ddd" }}> | </span>
                  댓글{" "}
                  <span style={{ fontWeight: "bold" }}>{data.commentSize}</span>
                </div>

                <div>
                  {isAuthor ? (
                    <>
                      <Link
                        to={"/editCommunityPost"}
                        state={{ surveyId: data.surveyId, postId: postId }}
                      >
                        <span style={{ cursor: "pointer", fontSize: "14px" }}>
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
                </div>
              </p>
            </div>
            <Comment props={{ postId: postId, type: "co" }} />
            {data.commentList ? (
              <ParentsComment
                props={{ postId: postId, commentList: data.commentList }}
              />
            ) : null}
          </div>
          <div style={{ textAlign: "center" }}>
            <Link to={"/community"}>
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
      </div>
    </>
  );
}
