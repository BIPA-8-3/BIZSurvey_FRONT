import React, { useState, useEffect } from 'react';
import style from '../../style/admin/AdminSurveyList.module.css'
import useFadeIn from '../../style/useFadeIn';
import Button from '@mui/material/Button';
import { useLocation, useNavigate, useHistory, Link } from "react-router-dom";
import axios from 'axios';
import { IoIosArrowDropdownCircle } from "react-icons/io";
import useApiCall from '../api/ApiCall'; 
function AdminSurveyList() {
    const navigate = useNavigate();

    const handleRowClick = () => {
        navigate('/admin/userInfo');
    };

    const { call } = useApiCall();

    const [communityList, setCommunityList] = useState([]);

    useEffect(() => {
      call("/admin/s-community", "GET")
      .then((data) => {
        console.log(data.content)
        setCommunityList(data.content);
      }).catch((error) => {
        console.log(error)
      })
    },[]);
  return (
    <div
    className={style.userListWrap}
    style={{ paddingLeft: "0px !important", paddingRight: "0px !important" }}>
    <p className={style.titleWrap} style={{ fontWeight: "bold" }}>
      관리자 시스템
    </p>
    <div style={{ width: "96%", borderTop: "1px solid rgb(221, 221, 221)", padding:'10px 20px'}}>
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
          {communityList.map((communityitem, index) => (
              <tr onClick={handleRowClick}>
                  <td>{index + 1}</td>
                  <td>{communityitem.title}</td>
                  <td>{communityitem.nickname}</td>
                  <td>{communityitem.count}</td>
                  <td>{communityitem.startDateTime}</td>
                  <td>{communityitem.endDateTime}</td>
                  <td>{communityitem.createDate} : {communityitem.postId}</td>
                  <td><Link to={'/communityDetail'} target='_blank' state={{postId : communityitem.postId}}>< button>바로가기</button></Link></td>
                  <td><button>삭제</button></td>
              </tr>
            ))}  
        </tbody>
      </table>
    </div>
  </div>
  
  );
}

export default AdminSurveyList;
