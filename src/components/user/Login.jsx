import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import style from "../../style/user/Login.module.css";
import kakao from "../../assets/img/user/kakaoLogin.png";
import Button from "@mui/material/Button";
import back from "../../assets/img/back.png";
import { Link } from "react-router-dom";
import useFadeIn from "../../style/useFadeIn";
import Axios from "axios";
import BizModal from "../common/BizModal";
import useApiCall, { login } from "../api/ApiCall";
import { LoginContext, LoginFunContext } from "../../App";

function Login() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const userInfo = useContext(LoginContext);
  const { setUserInfo } = useContext(LoginFunContext);
  const [formData, setFromData] = useState({
    email: "",
    password: "",
  });

  const { call } = useApiCall();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFromData({
      ...formData,
      [name]: value,
    });
  };

  // 로컬 스토리지에 엑세스 토큰 저장
  const saveAccessTokenToLocalStorage = (token) => {
    localStorage.setItem("accessToken", token);
  };

  // 리프레시 토큰을 로컬 스토리지에 저장
  const saveRefreshTokenToLocalStorage = (token) => {
    localStorage.setItem("refreshToken", token);
  };

  //일반 로그인
  const handleSubmit = async () => {
    login(formData).then((data) => {
      call("/user/info", "GET")
        .then((data) => {
          setUserInfo(data);
          navigate("/");
        })
        .catch((error) => {
          console.error("사용자 정보 가져오기 실패:", error);
          return;
        });
    });
  };

  //카카오 로그인
  const loginKaKao = async () => {
    try {
      const respons = await Axios.get("/kakao/clientId");
      const KakaoLoginAPI = `https://kauth.kakao.com/oauth/authorize?client_id=${respons.data.clientId}&redirect_uri=${respons.data.redirectUri}&response_type=code`;

      window.location.href = KakaoLoginAPI;
    } catch (error) {}
  };

  const fadeIn = useFadeIn();
  return (
    <div id={style.loginWrap} className={`fade-in ${fadeIn ? "active" : ""}`}>
      <div className={style.titleWrap}>
        <h1 className="textCenter title textBold">로그인</h1>
        <p className="textCenter subTitle">쉽고 빠른 설문 플랫폼 어쩌고 저쩌고 입니다.</p>
      </div>
      <p></p>
      <img src={kakao} alt="카카오 로그인" className={`${style.kakaoLogin}`} onClick={loginKaKao} />
      <label style={{ fontSize: "10px" }}>이메일</label>
      <input
        type="text"
        className={style.input}
        style={{ marginBottom: "20px" }}
        name="email"
        onChange={handleInputChange}
      />
      <label>패스워드</label>
      <input type="password" className={style.input} name="password" onChange={handleInputChange} />
      <p className={style.searchPw}>
        <Link to={"/findPassword"}>비밀번호를 잊으셨나요?</Link>
      </p>
      <Button
        variant="contained"
        href="#contained-buttons"
        onClick={handleSubmit}
        sx={{
          marginTop: "40px",
          width: "100%",
          padding: "11.5px 14px",
          backgroundColor: "#243579",
        }}
      >
        Login
      </Button>
      <p className={style.joinText}>
        <Link to={"/join"}>아직 비즈서베이 회원이 아니신가요?</Link>
      </p>
      <img src={back} alt="배경" className={style.back} />
      <BizModal isOpen={open} handleClose={handleCloseModal} title="로그인실패">
        이메일과 비밀번호를 확인해주세요
      </BizModal>
    </div>
  );
}

export default Login;
