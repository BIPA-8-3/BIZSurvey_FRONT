import React, { useState, useEffect } from 'react';
import style from '../../style/admin/AdminUserList.module.css'
import useFadeIn from '../../style/useFadeIn';
import Button from '@mui/material/Button';
import { useLocation, useNavigate, useHistory } from "react-router-dom";
import axios from 'axios';
import { IoIosArrowDropdownCircle } from "react-icons/io";
import useApiCall from '../api/ApiCall'; 
function AdminUserList() {
    const navigate = useNavigate();

    const handleRowClick = () => {
        navigate('/admin/userInfo');
    };

    const { call } = useApiCall();

    const [userList, setUserList] = useState([]);

    useEffect(() => {
      call("/admin/users", "GET")
      .then((data) => {
        console.log(data.content)
        setUserList(data.content);
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
          <span style={{ fontWeight: "bold", fontSize: 12 }}> 회원목록조회</span>
        </p>
        <p style={{ fontWeight: "bold", color: "#222", marginTop:"20px", display:'flex', alignItems:'center' }}>
          <IoIosArrowDropdownCircle 
            style={{ color: "#0476D9" }}
          />
          <p style={{marginLeft:'5px'}}>회원목록조회</p>
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
                <td>플랜</td>
                <td>가입일</td>
            </tr>
        </thead>
        <tbody>
          {userList.map((userItem, index) => (
              <tr onClick={handleRowClick}>
                  <td>{index + 1}</td>
                  <td>{userItem.email}</td>
                  <td>{userItem.name}</td>
                  <td>{userItem.nickname}</td>
                  <td>{userItem.provider}</td>
                  <td>{userItem.plan}</td>
                  <td>{userItem.regDate}</td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  
  );
}

export default AdminUserList;
