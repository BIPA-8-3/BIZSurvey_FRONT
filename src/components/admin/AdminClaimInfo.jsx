import React, { useState, useEffect } from 'react';
import style from '../../style/admin/AdminClaimInfo.module.css'
import useFadeIn from '../../style/useFadeIn';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import logo from '../../assets/img/logo.png';
import { FaUserCircle } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa6";
import { MdArrowForwardIos } from "react-icons/md";
import { IoIosArrowDropdownCircle } from "react-icons/io";
function AdminClaimInfo() {
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
          <p style={{marginLeft:'5px'}}>회원목록조회</p>
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
              404444@naver.com
            </div>
          </div>
          <div className="d-flex" style={{display:'flex'}}>
            <div className={style.infoFirstBox} style={{ marginLeft: 10 }}>
              성명
            </div>
            <div className={style.infoBox}>
              박소영
            </div>
          </div>
          <div className="d-flex" style={{display:'flex'}}>
            <div className={style.infoFirstBox} style={{ marginLeft: 10 }}>
              생년월일
            </div>
            <div
              className={style.infoBox}
            >
              1999-09-09
            </div>
          </div>
        </div>
        <div className="d-flex" style={{display:'flex', marginTop:'7px'}}>
          <div className="d-flex" style={{display:'flex'}}>
            <div className={style.infoFirstBox}>성별</div>
            <div className={style.infoBox}>
              FEMALE
            </div>
          </div>
          <div className="d-flex" style={{display:'flex'}}>
            <div className={style.infoFirstBox} style={{ marginLeft: 10 }}>
              닉네임
            </div>
            <div className={style.infoBox}>
              홍길동
            </div>
          </div>
          <div className="d-flex" style={{display:'flex'}}>
            <div className={style.infoFirstBox} style={{ marginLeft: 10 }}>
              플랜
            </div>
            <div
              className={style.infoBox}
            >
              NORMAL_SUBSCRIBE
            </div>
          </div>
        </div>
        <div className="d-flex" style={{display:'flex', marginTop:'7px'}}>
          <div className="d-flex" style={{display:'flex'}}>
            <div className={style.infoFirstBox}>회원가입 유형</div>
            <div className={style.infoBox}>
              bizsurvey
            </div>
          </div>
          <div className="d-flex" style={{display:'flex'}}>
            <div className={style.infoFirstBox} style={{ marginLeft: 10 }}>
              가입일
            </div>
            <div className={style.infoBox} style={{width:'497px'}}>
              2023-11-21 17:55:39.821266
            </div>
          </div>
        </div>
        <div className="d-flex" style={{display:'flex', marginTop:'7px'}}>
          <div className="d-flex" style={{display:'flex'}}>
            <div className={style.infoFirstBox}>신고상태</div>
            <div className={style.infoBox} style={{width:'824px'}}>
              2022-11-11
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
  
  );
}

export default AdminClaimInfo;
