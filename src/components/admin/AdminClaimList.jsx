import React, { useState, useEffect } from 'react';
import style from '../../style/admin/AdminSurveyList.module.css'
import useFadeIn from '../../style/useFadeIn';
import Button from '@mui/material/Button';
import { useLocation, useNavigate, useHistory } from "react-router-dom";
import axios from 'axios';
import { IoIosArrowDropdownCircle } from "react-icons/io";
import useApiCall from '../api/ApiCall'; 
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function AdminClaimList() {
    const navigate = useNavigate();

    const { call } = useApiCall();
    const [total, setTotal] = useState(0);
    const [claimList, setClaimList] = useState([]);

    useEffect(() => {
      call("/admin/claim/unprocessed", "GET")
      .then((data) => {
        setClaimList(data.content);
        setTotal(data.totalPages)
      }).catch((error) => {
        console.log(error)
      })
  
    },[]);

    const handlePage = (event) => {
      const nowPageInt = parseInt(event.target.outerText)
      // page에 해당하는 페이지로 GET 요청을 보냄
      call(`/admin/claim/unprocessed?page=${nowPageInt-1}`, "GET")
      .then(response => {
        if (response.content && response.content.length > 0) {
          setClaimList(response.content);
        } else {
          console.warn('Data is undefined or empty:', response.data);
          setClaimList([]); 
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    };

    const handleRowClick = (e) => {
        navigate('/admin/claim/info/' + e);
    };
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
          <span style={{ fontWeight: "bold", fontSize: 12 }}> 신고내역조회</span>
        </p>
        <p style={{ fontWeight: "bold", color: "#222", marginTop:"20px", display:'flex', alignItems:'center' }}>
          <IoIosArrowDropdownCircle 
            style={{ color: "#0476D9" }}
          />
          <p style={{marginLeft:'5px'}}>신고내역조회</p>
        </p>
      </div>
      {/* <div className={style.adminSearchWrap}>
        <input type='text'/>
        <button>검색</button>
      </div> */}
      <table className={style.adminTable}>
        <thead>
            <tr>
                <td>NO</td>
                <td>타입</td>
                <td>신고사유</td>
                <td>신고자</td>
                <td>신고일</td>
            </tr>
        </thead>
        <tbody>
        {claimList.length > 0 ? (
          claimList.map((claimItem, index) => (
            <tr onClick={() => handleRowClick(`${claimItem.id}`)}>
              <td style={{padding:'6px 2px'}}>{claimItem.id}</td>
              <td>{claimItem.claimType}</td>
              <td>{claimItem.claimReason}</td>
              <td>{claimItem.userName}</td>
              <td>{claimItem.regDate}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" style={{ textAlign: "center", padding: "10px" }}>
              신고 내역이 없습니다.
            </td>
          </tr>
        )}

        </tbody>
      </table>
      <div style={{width:'1200px', display:'flex', justifyContent:'center', marginTop:'50px'}}>
      <Pagination
          count={total}
          renderItem={(item) => (
        <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
            />
          )}
          onChange={(e) => handlePage(e)}
      />
      </div>
    </div>
  </div>
  
  );
}

export default AdminClaimList;
