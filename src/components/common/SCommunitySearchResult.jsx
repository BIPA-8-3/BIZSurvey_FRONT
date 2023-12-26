import style from "../../style/Container.module.css";
import "../../style/Common.css";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import back from "../../assets/img/back.png";
import SurveyCard from "./SurveyCard";
import Search from "./Search";
import useFadeIn from "../../style/useFadeIn";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import Loader from "../../pages/loader/Loader";
import { useLocation } from "react-router-dom";
import SCommunitySearch from "./SCommunitySearch";
import call, { getURI } from "../../pages/workspace/api";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function SurveyCommunitySearchResult() {
  const [page, setPage] = useState(0); // 현재 페이지 번호 (페이지네이션)
  const [ref, inView] = useInView();
  const [data, setData] = useState({
    content: [],
  });
  const [keyword, setKeyword] = useState("");
  const location = useLocation();

  useEffect(() => {
    const newKeyword = location.state.keyword;
    setKeyword(newKeyword);

    // 새로운 검색어를 받지 않으면 데이터 초기화하지 않음
    if (newKeyword) {
      setPage(0); // 검색어가 변경되면 페이지를 리셋
      setData({ content: [] }); // 검색어가 변경되면 데이터 초기화
    }
  }, [location.state.keyword]);

  const dataFetch = () => {
    if (page < data.totalPages || data.totalPages === undefined) {
      axios
        .get(`${getURI()}/s-community/search?keyword=${keyword}&page=${page}`)
        .then((res) => {
          // 기존 데이터에 새로운 데이터를 더해주는 것이 아니라 새로운 데이터로 설정
          setData({
            ...res.data,
            content: [...data.content, ...res.data.content], // 기존 데이터에 추가
          });
          setPage((prevPage) => prevPage + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    // inView가 true 일때만 실행한다.
    if (inView) {
      dataFetch();
    }
  }, [inView, page, keyword]);

  const fadeIn = useFadeIn();
  return (
    <div className={`fade-in ${fadeIn ? "active" : ""}`}>
      <div className={style.titleWrap}>
        <h1 className="textCenter title textBold">'{keyword}' 검색 결과</h1>
        <p className="textCenter subTitle">
          설문에 참여하고 소중한 의견을 공유해주세요.
        </p>
      </div>
      <SCommunitySearch />
      <div style={{ textAlign: "right" }}>
        <Link to={"/surveyCommunityWrite"}>
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
          >
            설문 등록
          </Button>
        </Link>
      </div>
      <SurveyCard data={data.content} />

      <img src={back} alt="배경" className={style.back} />
      <div ref={ref}></div>
    </div>
  );
}

export default SurveyCommunitySearchResult;
