import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "../../style/admin/AdminLogin.module.css"
import back from "../../assets/img/back.png";
import Axios from "axios";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [formData, setFromData] = useState({
    email: "",
    password: "",
  });
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
  

  const handleSubmit = async () => {
    try {
      const response = await Axios.post("/admin/login", formData);
      if (response.status === 200) {
        const headers = response.headers;
        const authorization = headers["authorization"];
        const refreshAuthorization = headers["refreshauthorization"];

        saveAccessTokenToLocalStorage(authorization);
        saveRefreshTokenToLocalStorage(refreshAuthorization);

        navigate("/admin/main");
      }
    } catch (error) {
      console.log("실패");
      if (error.response.data.errorCode === 403) {
        alert(error.response.data.errorMessage);
      } else {
        alert("계정을 확인해주세요")
      }
    }
  };
  return (
    <div>
      <div className={style.loginWrap}>
        <div className={style.loginLeft}> 
          <p className={style.loginTitle}>ADMIN<br />LOGIN</p>
        </div>
        <div className={style.loginRight}>
          <div className={style.loginInputWrap}>
            <div>
              <span className={style.adminInputSpan}>
                <label for={"id"}>ADMIN ID</label>
              </span> 
              <input type="text" id={"id"} className={style.adminLogininput}
              name="email"
              onChange={handleInputChange}/><br /></div>
            <div>
              <span className={style.adminInputSpan}>
                <label for={"pw"}>PASSWORD</label>
              </span> 
              <input type="password" id={"pw"} className={style.adminLogininput}
              name="password"
              onChange={handleInputChange}/></div>
          </div>
          <div>
            <div className={style.loginBtn} onClick={handleSubmit}>
              LOGIN
            </div>
          </div>
        </div>
      </div>
      {/* <img src={back} alt="배경" className={style.back} /> */}
    </div>
  );
}
