import React, { useState, useEffect } from 'react';
import style from '../../style/admin/AdminUserInfo.module.css'
import { useParams } from "react-router-dom";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import call from '../../pages/workspace/api';
function AdminUserInfo() {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    call("/admin/user/" + id, "GET")
    .then((data) => {
      setUserInfo(data)
    }).catch((error) => {
      console.log(error)
    })

  },[]);

  function formatDate(dateString) {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }
  return (
    <div
    className={style.userListWrap}
    style={{ paddingLeft: "0px !important", paddingRight: "0px !important" }}>
    <p className={style.titleWrap} style={{ fontWeight: "bold" }}>
      관리자 시스템
    </p>
    <div style={{ width: "100%", borderTop: "1px solid rgb(221, 221, 221)", padding:'10px 20px'}}>
      <div >
        <p style={{ fontSize: 12 }}>
          Bizsurvey관리자시스템 》 회원목록조회 》 
          <span style={{ fontWeight: "bold", fontSize: 12 }}> 회원상세조회</span>
        </p>
        <p style={{ fontWeight: "bold", color: "#222", marginTop:"20px", display:'flex', alignItems:'center' }}>
          <IoIosArrowDropdownCircle 
            style={{ color: "#0476D9" }}
          />
          <span style={{marginLeft:'5px'}}>회원목록조회</span>
        </p>
      </div>
      <div
        className={style.breadcrumb}
        style={{ background: "#eaf6ff", border: "3px solid #ddd", padding:'15px', marginTop:'10px', borderRadius:'5px'}}
      >
        <div className="d-flex" style={{display:'flex'}}>
          <div className="d-flex" style={{display:'flex'}}>
            <div className={style.infoFirstBox}>이메일</div>
            <div className={style.infoBox}>
              {userInfo.email}
            </div>
          </div>
          <div className="d-flex" style={{display:'flex'}}>
            <div className={style.infoFirstBox} style={{ marginLeft: 10 }}>
              성명
            </div>
            <div className={style.infoBox}>
              {userInfo.name}
            </div>
          </div>
          <div className="d-flex" style={{display:'flex'}}>
            <div className={style.infoFirstBox} style={{ marginLeft: 10 }}>
              생년월일
            </div>
            <div
              className={style.infoBox}
            >
              {userInfo.birthdate}
            </div>
          </div>
        </div>
        <div className="d-flex" style={{display:'flex', marginTop:'7px'}}>
          <div className="d-flex" style={{display:'flex'}}>
            <div className={style.infoFirstBox}>성별</div>
            <div className={style.infoBox}>
              {userInfo.gender}
            </div>
          </div>
          <div className="d-flex" style={{display:'flex'}}>
            <div className={style.infoFirstBox} style={{ marginLeft: 10 }}>
              닉네임
            </div>
            <div className={style.infoBox}>
              {userInfo.nickname}
            </div>
          </div>
          <div className="d-flex" style={{display:'flex'}}>
            <div className={style.infoFirstBox} style={{ marginLeft: 10 }}>
              플랜
            </div>
            <div
              className={style.infoBox}
            >
              {userInfo.planSubscribe}
            </div>
          </div>
        </div>
        <div className="d-flex" style={{display:'flex', marginTop:'7px'}}>
          <div className="d-flex" style={{display:'flex'}}>
            <div className={style.infoFirstBox}>회원가입 유형</div>
            <div className={style.infoBox}>
              {userInfo.provider}
            </div>
          </div>
          <div className="d-flex" style={{display:'flex'}}>
            <div className={style.infoFirstBox} style={{ marginLeft: 10 }}>
              가입일
            </div>
            <div className={style.infoBox} style={{width:'497px'}}>
              {formatDate(userInfo.regdate)}
            </div>
          </div>
        </div>
        <div className="d-flex" style={{display:'flex', marginTop:'7px'}}>
          <div className="d-flex" style={{display:'flex'}}>
            <div className={style.infoFirstBox}>신고상태</div>
            <div className={style.infoBox} style={{width:'824px'}}>
                {userInfo.forbiddenDate}
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
  
  );
}

export default AdminUserInfo;
