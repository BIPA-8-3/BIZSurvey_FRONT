import React, { useState, useEffect } from 'react';
import style from '../../style/admin/AdminSurveyList.module.css'
import useFadeIn from '../../style/useFadeIn';
import Button from '@mui/material/Button';
import { useLocation, useNavigate, useHistory, Link } from "react-router-dom";
import axios from 'axios';
import { IoIosArrowDropdownCircle } from "react-icons/io";
import useApiCall from '../api/ApiCall'; 
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
function AdminCommunityList() {
    const navigate = useNavigate();

    const { call } = useApiCall();

    const [communityList, setCommunityList] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
      call("/admin/community", "GET")
      .then((data) => {
        setCommunityList(data.content);
        setTotal(data.totalPages)
      }).catch((error) => {
        console.log(error)
      })
    },[]);

    const handlePage = (event) => {
      const nowPageInt = parseInt(event.target.outerText)
      // page에 해당하는 페이지로 GET 요청을 보냄
      call(`/admin/community?page=${nowPageInt-1}`, "GET")
      .then(response => {
        if (response.content && response.content.length > 0) {
          setCommunityList(response.content);
        } else {
          console.warn('Data is undefined or empty:', response.data);
          setCommunityList([]); 
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
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
          <span style={{ fontWeight: "bold", fontSize: 12 }}> 커뮤니티조회</span>
        </p>
        <p style={{ fontWeight: "bold", color: "#222", marginTop:"20px", display:'flex', alignItems:'center' }}>
          <IoIosArrowDropdownCircle 
            style={{ color: "#0476D9" }}
          />
          <p style={{marginLeft:'5px'}}>커뮤니티조회</p>
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
                <td>제목</td>
                <td>작성자</td>
                <td>조회수</td>
                <td>작성일</td>
                <td>바로가기</td>
                <td>삭제{total} </td>
            </tr>
        </thead>
        <tbody>
        {communityList.map((communityitem, index) => (
            <tr>
                <td>{communityitem.postId}</td>
                <td>{communityitem.title}</td>
                <td>{communityitem.nickname}</td> 
                <td>{communityitem.count}</td>
                <td>{communityitem.createTime}</td>
                <td>
                  <Link to={'/communityDetail'} state={{postId : communityitem.postId}}>
                    <button>바로가기</button>
                  </Link>
                  </td>
                <td><button>삭제</button></td>
            </tr>
          ))}
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

export default AdminCommunityList;
