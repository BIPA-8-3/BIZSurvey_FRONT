import React, { useState, useEffect } from 'react';
import style from '../../style/admin/AdminSurveyList.module.css'
import useFadeIn from '../../style/useFadeIn';
import Button from '@mui/material/Button';
import { useLocation, useNavigate, useHistory } from "react-router-dom";
import axios from 'axios';
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
function AdminDashboard() {
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
          <span style={{ fontWeight: "bold", fontSize: 12 }}> 대시보드</span>
        </p>
        <p style={{ fontWeight: "bold", color: "#222", marginTop:"20px", display:'flex', alignItems:'center' }}>
          <IoIosArrowDropdownCircle 
            style={{ color: "#0476D9" }}
          />
          <p style={{marginLeft:'5px'}}>대시보드</p>
        </p>
      </div>
      <div style={{width:'1200px', marginTop:'20px'}}>
        <Grid container spacing={2}>
            <Grid item xs={4}>
                s
            </Grid>
            <Grid item xs={4}>
                s
            </Grid>
            <Grid item xs={4}>
                s
            </Grid>
            <Grid item xs={12}>
                s
            </Grid>
        </Grid>
      </div>
    </div>
    </div>
  
  );
}

export default AdminDashboard;
