import React, { useState, useEffect } from 'react';
import style from '../../style/admin/AdminSurveyList.module.css'
import useFadeIn from '../../style/useFadeIn';
import Button from '@mui/material/Button';
import { useLocation, useNavigate, useHistory } from "react-router-dom";
import axios from 'axios';
import { IoIosArrowDropdownCircle } from "react-icons/io";
function AdminSurveyList() {
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
          <span style={{ fontWeight: "bold", fontSize: 12 }}> 설문커뮤니티조회</span>
        </p>
        <p style={{ fontWeight: "bold", color: "#222", marginTop:"20px", display:'flex', alignItems:'center' }}>
          <IoIosArrowDropdownCircle 
            style={{ color: "#0476D9" }}
          />
          <p style={{marginLeft:'5px'}}>설문커뮤니티조회</p>
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
                <td>제목</td>
                <td>작성자</td>
                <td>조회수</td>
                <td>투표 시작일</td>
                <td>투표 마감일</td>
                <td>작성일</td>
                <td>바로가기</td>
                <td>삭제</td>
            </tr>
        </thead>
        <tbody>
            
            <tr onClick={handleRowClick}>
                <td>1</td>
                <td>21년동 상반기 설문조사</td>
                <td>박소영</td>
                <td>8</td>
                <td>2022-03-01</td>
                <td>2022-03-01</td>
                <td>2022-03-01</td>
                <td><button>바로가기</button></td>
                <td><button>삭제</button></td>
            </tr>
            <tr onClick={handleRowClick}>
                <td>1</td>
                <td>21년동 상반기 설문조사</td>
                <td>박소영</td>
                <td>8</td>
                <td>2022-03-01</td>
                <td>2022-03-01</td>
                <td>2022-03-01</td>
                <td><button>바로가기</button></td>
                <td><button>삭제</button></td>
            </tr>
            <tr onClick={handleRowClick}>
                <td>1</td>
                <td>21년동 상반기 설문조사</td>
                <td>박소영</td>
                <td>8</td>
                <td>2022-03-01</td>
                <td>2022-03-01</td>
                <td>2022-03-01</td>
                <td><button>바로가기</button></td>
                <td><button>삭제</button></td>
            </tr>
            <tr onClick={handleRowClick}>
                <td>1</td>
                <td>21년동 상반기 설문조사</td>
                <td>박소영</td>
                <td>8</td>
                <td>2022-03-01</td>
                <td>2022-03-01</td>
                <td>2022-03-01</td>
                <td><button>바로가기</button></td>
                <td><button>삭제</button></td>
            </tr>
            <tr onClick={handleRowClick}>
                <td>1</td>
                <td>21년동 상반기 설문조사</td>
                <td>박소영</td>
                <td>8</td>
                <td>2022-03-01</td>
                <td>2022-03-01</td>
                <td>2022-03-01</td>
                <td><button>바로가기</button></td>
                <td><button>삭제</button></td>
            </tr>
        </tbody>
      </table>
    </div>
  </div>
  
  );
}

export default AdminSurveyList;
