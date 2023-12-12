import React, { useState, useEffect } from 'react';
import style from '../../style/admin/AdminUserList.module.css'
import useFadeIn from '../../style/useFadeIn';
import Button from '@mui/material/Button';
import { useLocation, useNavigate, useHistory } from "react-router-dom";
import axios from 'axios';
import { IoIosArrowDropdownCircle } from "react-icons/io";
function AdminUserList() {
    const navigate = useNavigate();

    const handleRowClick = () => {
        navigate('/admin/userInfo');
    };
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
          Bizsurvey관리자시스템 》
          <span style={{ fontWeight: "bold", fontSize: 12 }}> 회원목록조회</span>
        </p>
        <p style={{ fontWeight: "bold", color: "#222", marginTop:"20px", display:'flex', alignItems:'center' }}>
          <IoIosArrowDropdownCircle 
            style={{ color: "#0476D9" }}
          />
          <p style={{marginLeft:'5px'}}>회원상세조회</p>
        </p>
      </div>
      <div className={style.adminSearchWrap}>
        <input type='text'/>
        <button>검색</button>
      </div>
      <table className={style.adminTable}>
        <thead>
            <tr>
                <td>NO</td>
                <td>이메일</td>
                <td>이름</td>
                <td>닉네임</td>
                <td>회원가입유형</td>
                <td>가입일</td>
            </tr>
        </thead>
        <tbody>
            
            <tr onClick={handleRowClick}>
                <td>1</td>
                <td>404444@naver.com</td>
                <td>박소영</td>
                <td>눈누난나</td>
                <td>bizsurvey</td>
                <td>2022-03-01</td>
            </tr>

            <tr>
                <td>1</td>
                <td>404444@naver.com</td>
                <td>박소영</td>
                <td>눈누난나</td>
                <td>kakao</td>
                <td>2022-03-01</td>
            </tr>
            <tr>
                <td>1</td>
                <td>404444@naver.com</td>
                <td>박소영</td>
                <td>눈누난나</td>
                <td>bizsurvey</td>
                <td>2022-03-01</td>
            </tr>
            <tr>
                <td>1</td>
                <td>404444@naver.com</td>
                <td>박소영</td>
                <td>눈누난나</td>
                <td>bizsurvey</td>
                <td>2022-03-01</td>
            </tr>
            <tr>
                <td>1</td>
                <td>404444@naver.com</td>
                <td>박소영</td>
                <td>눈누난나</td>
                <td>kakao</td>
                <td>2022-03-01</td>
            </tr>
            <tr>
                <td>1</td>
                <td>404444@naver.com</td>
                <td>박소영</td>
                <td>눈누난나</td>
                <td>kakao</td>
                <td>2022-03-01</td>
            </tr>
            <tr>
                <td>1</td>
                <td>404444@naver.com</td>
                <td>박소영</td>
                <td>눈누난나</td>
                <td>kakao</td>
                <td>2022-03-01</td>
            </tr>
            <tr>
                <td>1</td>
                <td>404444@naver.com</td>
                <td>박소영</td>
                <td>눈누난나</td>
                <td>kakao</td>
                <td>2022-03-01</td>
            </tr>
            <tr>
                <td>1</td>
                <td>404444@naver.com</td>
                <td>박소영</td>
                <td>눈누난나</td>
                <td>kakao</td>
                <td>2022-03-01</td>
            </tr>
            <tr>
                <td>1</td>
                <td>404444@naver.com</td>
                <td>박소영</td>
                <td>눈누난나</td>
                <td>kakao</td>
                <td>2022-03-01</td>
            </tr>
        </tbody>
      </table>
    </div>
  </div>
  
  );
}

export default AdminUserList;
