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
import { useState, useEffect } from "react";
import ChildCommentForm from "../community/ChildCommentForm";
import ChildComment from "../community/ChildComment";
import Loader from "../../pages/loader/Loader"
import axios from 'axios'


export default function CommunityPost() {
  const fadeIn = useFadeIn();
  // const [isAvailable, setIsAvailable] = useState(false);
  const location = useLocation();
  let postId = location.state.postId;

  console.log('넘어오는지 확인 : ' + postId)

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    // login();
    // // call("/s-community/survey/check/1", "GET")
    // //   .then((data) => {
    // //     if (data) {
    // //       setIsAvailable(false);
    // //     } else {
    // //       setIsAvailable(true);
    // //     }
    // //   })
    // //   .catch((error) => {
    // //     console.log(error);
    // //   });
  }, []);

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
          <p>
            {data.content}
          </p>
          <div className={style.surveyBtnWrap}>
            <Link to={"/communitySurveyWrite"}>
              {isAvailable ? (
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
              ) : (
                <Button
                  variant="contained"
                  href="#contained-buttons"
                  disabled
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
                  참여완료
                </Button>
              )}
            </Link>
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
              댓글 <span style={{ fontWeight: "bold" }}>13</span>
            </div>
            <div style={{ cursor: "pointer", fontSize: "14px" }}>신고</div>
          </p>
        </div>
        <Comment />
        <ParentsComment props={data.commentList} />
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
  );
}
