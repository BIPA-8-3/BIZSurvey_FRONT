import style from "../../style/Container.module.css";
import "../../style/Common.css";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import back from "../../assets/img/back.png";
import SurveyCard from "./SurveyCard";
import useFadeIn from "../../style/useFadeIn";
import Button from "@mui/material/Button";
import { useState, useEffect, useContext } from "react";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import Loader from "../../pages/loader/Loader";
import { useNavigate } from "react-router-dom";
import SCommunitySearch from "./SCommunitySearch";
import { acceptInvite } from "../../pages/workspace/authenticationApi";
import { LoginContext } from "../../App";
import call from '../../pages/workspace/api';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function SurveyPostContainer() {
  const navigate = useNavigate();

  const [page, setPage] = useState(0); // 현재 페이지 번호 (페이지네이션)
  const [ref, inView] = useInView();
  const userInfo = useContext(LoginContext);
  const [data, setData] = useState({
    content: [],
  });

  const dataFetch = () => {
    console.log("토탈 페이지스" + data.totalPages);

    if (page < data.totalPages || data.totalPages === undefined) {
        call(`/s-community?page=${page}`, "GET")
        .then((data) => {
          setData((prevData) => {
            return {
              ...data,
              content: [...prevData.content, ...data.content],
            };
          });
          setPage((prevPage) => prevPage + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleButtonClick = () => {

    if (userInfo.id === 0) {
      const re = window.confirm(
        "로그인을 하시면 게시글을 작성할 수 있습니다. \n로그인 페이지로 이동하시겠습니까?"
      );
      if (re) {
        navigate("/login");
      } else {
        return;
      }
    } else if (userInfo.planSubscribe === "COMMUNITY") {
      const res = window.confirm(
        "플랜을 신청하면 게시글을 작성할 수 있습니다. \n플랜을 변경하시겠습니까?"
      );
      if (res) {
        navigate("/mypagePlan");
      } else {
        return;
      }

  };

  useEffect(() => {
    // inView가 true 일때만 실행한다.
    if (inView) {
      console.log(inView, "무한 스크롤 요청 🎃");
      dataFetch();
    }
  }, [inView]);

  const fadeIn = useFadeIn();
  return (
    <div className={`fade-in ${fadeIn ? "active" : ""}`}>
      <div className={style.titleWrap}>
        <h1 className="textCenter title textBold">설문 참여</h1>
        <p className="textCenter subTitle">
          쉽고 빠른 설문 플랫폼 어쩌고 저쩌고 입니다.
        </p>
      </div>
      <SCommunitySearch />
      <div style={{ textAlign: "right" }}>
        <Button
          variant="contained"
          href="#contained-buttons"
          sx={{
            padding: "11px 30px",
            backgroundColor: "#243579",
            fontWeight: "bold",
            marginBottom: "10px",
            boxShadow: 0,
          }}
          onClick={() => handleButtonClick()}
        >
          설문 등록
        </Button>
      </div>
      <SurveyCard data={data.content} />

      <img src={back} alt="배경" className={style.back} />
      <div ref={ref}></div>
    </div>
  );
}

export default SurveyPostContainer;
