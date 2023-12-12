import React, { useState, useEffect } from 'react';
import style from '../../style/admin/AdminHeader.module.css'
import useFadeIn from '../../style/useFadeIn';
import Button from '@mui/material/Button';
import { useLocation, useNavigatem, Link } from "react-router-dom";
import axios from 'axios';
import logo from '../../assets/img/logo.png';
import { FaUserCircle } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa6";
import { MdArrowForwardIos } from "react-icons/md";
import AdminUserList from './AdminUserList';
import AdminUserInfo from './AdminUserInfo';

const getLinkStyle = (currentPage, path) => {
    return {
      fontWeight: currentPage === path ? 'bold' : 'normal',
      backgroundColor: currentPage === path ? 'rgba(221, 221, 221, 0.3)' : '',
      borderRadius: currentPage === path ? '5px' : '0',
    };
  };

function AdminHeader() {
    const location = useLocation();
    const currentPage = location.pathname;
  return (
      <div className={style.AdminHeaderWrap}>
        <Link to={'/admin/main'}>
        <div className={style.adminLogo}>
            <img src={logo} alt="logo" className={style.adminlogoImg} />
        </div>
        </Link>
        <div className={style.shadowBox} style={{marginTop:'20px'}}></div>
        <div className={style.loginInfoBox}>
            <div className={style.loginInfoBoxName} style={{display:'flex',alignItems: 'center', fontSize:'16px', marginTop:'3px'}}>
                <FaUserCircle />
                <span>관리자</span>
            </div>
            <div>
                <span className={style.adminLogout}>로그아웃</span>
            </div>
        </div>
        <div className={style.shadowBox} style={{marginBottom:'10px'}}></div>

        <Link to={"/admin/userList"}>
            <li className={style.navItem} style={getLinkStyle(currentPage, '/admin/userList')}>
                <div>
                    <FaFolderOpen style={{color:'#EADA4D'}}/>
                    <span style={{fontSize: '14px', paddingLeft:"10px"}}>회원관리</span>
                </div>
                <div><MdArrowForwardIos style={{fontSize:"10px", color:"gray"}}/></div>
            </li>
        </Link>
        <Link to={"/admin/surveyList"}>
            <li className={style.navItem} style={getLinkStyle(currentPage, '/admin/surveyList')}>
                <div>
                    <FaFolderOpen style={{color:'#EADA4D'}}/>
                    <span style={{fontSize: '14px', paddingLeft:"10px"}}>설문 커뮤니티 관리</span>
                </div>
                <div><MdArrowForwardIos style={{fontSize:"10px", color:"gray"}}/></div>
            </li>
        </Link>
        <Link to={"/admin/communityList"}>
            <li className={style.navItem} style={getLinkStyle(currentPage, '/admin/communityList')}>
                <div>
                    <FaFolderOpen style={{color:'#EADA4D'}}/>
                    <span style={{fontSize: '14px', paddingLeft:"10px"}}>커뮤니티 관리</span>
                </div>
                <div><MdArrowForwardIos style={{fontSize:"10px", color:"gray"}}/></div>
            </li>
        </Link>
        <li className={style.navItem}>
            <div>
                <FaFolderOpen style={{color:'#EADA4D'}}/>
                <span style={{fontSize: '14px', paddingLeft:"10px"}}>신고 내역 및 관리</span>
            </div>
            <div><MdArrowForwardIos style={{fontSize:"10px", color:"gray"}}/></div>
        </li>
        <li className={style.navItem}>
            <div>
                <FaFolderOpen style={{color:'#EADA4D'}}/>
                <span style={{fontSize: '14px', paddingLeft:"10px"}}>플랜 회원 관리</span>
            </div>
            <div><MdArrowForwardIos style={{fontSize:"10px", color:"gray"}}/></div>
        </li>
      </div>
  );
}

export default AdminHeader;
