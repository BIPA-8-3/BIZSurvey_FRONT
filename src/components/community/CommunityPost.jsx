import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import style from "../../style/community/CommunityPost.module.css";
import "../../style/Common.css";
import Search from "../common/Search";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useFadeIn from "../../style/useFadeIn";
import back from "../../assets/img/back.png";
import CommunityTable from "./CommunityTable";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Loader from "../../pages/loader/Loader";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../App";
import call from "../../pages/workspace/api";

export default function CommunityPost() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fadeIn = useFadeIn();
  const navigate = useNavigate();
  const userInfo = useContext(LoginContext);

  // 유저 정보 불러오기

  useEffect(() => {
    // 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        call("/community", "GET").then((data) => {
          setData(data);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // 데이터 로딩이 끝났음을 표시
      }
    };

    fetchData(); // 함수 호출
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행되도록 함

  if (loading) {
    return (
      <>
        <Loader />
      </>
    ); // 데이터 로딩 중에는 로딩 표시
  }

  const handlePage = (event) => {
    const nowPageInt = parseInt(event.target.outerText);
    // page에 해당하는 페이지로 GET 요청을 보냄
    call(`/community?page=${nowPageInt - 1}`, "GET").then((data) => {
      setData(data);
    });
  };

  const handleButtonClick = () => {
    if (localStorage.getItem("userInfo")) {
      navigate("/communityWrite");
    } else {
      const re = window.confirm(
        "로그인을 하시면 게시글을 작성할 수 있습니다. \n로그인 페이지로 이동하시겠습니까?"
      );
      if (re) {
        navigate("/login");
      } else {
        return;
      }
    }
  };

  return (
    <div className={`fade-in ${fadeIn ? "active" : ""}`}>
      <div className={style.titleWrap}>
        <h1 className="textCenter title textBold">커뮤니티</h1>
        <p className="textCenter subTitle">
          투표를 통해 여러분의 소소한 일상을 공유해주세요.
        </p>
      </div>
      <Search></Search>

      <div style={{ textAlign: "right" }}>
        <Button
          variant="contained"
          href="#contained-buttons"
          onClick={() => handleButtonClick()}
          sx={{
            padding: "11px 30px",
            backgroundColor: "#243579",
            fontWeight: "bold",
            marginBottom: "10px",
            boxShadow: 0,
          }}
        >
          글쓰기
        </Button>
      </div>
      <CommunityTable props={data.content} />
      <div style={{ width: "1200px", margin: "0 auto", marginTop: "20px" }}>
        <Stack spacing={1} sx={{ margin: "0 auto", float: "right" }}>
          <Pagination
            count={data.totalPages}
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
            onChange={(e) => handlePage(e)}
          />
        </Stack>
      </div>
      <img src={back} alt="배경" className={style.back} />
    </div>
  );
}
