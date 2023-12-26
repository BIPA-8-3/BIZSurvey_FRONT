import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../../style/admin/AdminLogin.module.css"
import { adminLogin } from "../../components/api/ApiCall";

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
  

  const handleSubmit = async () => {
      adminLogin(formData).then((data) => {
        navigate("/admin/main");
      }).catch((error) => {
        return;
      })
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
