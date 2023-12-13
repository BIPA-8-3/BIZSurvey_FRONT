import React, { useState, useEffect } from 'react';
import style from '../../style/admin/AdminDashboard.module.css'
import useFadeIn from '../../style/useFadeIn';
import Button from '@mui/material/Button';
import { useLocation, useNavigate, useHistory } from "react-router-dom";
import axios from 'axios';
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AdminChart from './AdminPieChart';
import AdminLineChart from './AdminLineChart';
import useApiCall from '../api/ApiCall'; 
import { set } from 'react-hook-form';
function AdminDashboard() {
    const navigate = useNavigate();

    const { call } = useApiCall();
    const [chartData, setChartData] = useState([]);
    const [community, setCommunity] = useState(0);
    const [normal, setNormal] = useState(0);
    const [company, setCompany] = useState(0);
    const [total, setTotal] = useState(0);
    const [communityList, setCommunityList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const communityData = await call("/admin/user/plan/COMMUNITY", "GET");
            console.log("커뮤니티 데이터:", communityData);
            setCommunity(communityData);

            const normalData = await call("/admin/user/plan/NORMAL_SUBSCRIBE", "GET");
            console.log("개인 데이터:", normalData);
            setNormal(normalData);

            const companyData = await call("/admin/user/plan/COMPANY_SUBSCRIBE", "GET");
            console.log("개인 데이터:", companyData);
            setCompany(companyData);

            setTotal(communityData + normalData + companyData)

            const communityListData = await call("/admin/community", "GET")
            console.log("커뮤니티 데이터:", communityListData);
            setCommunityList(communityListData);

            
            // setChartData([
            //   { value: communityData, name: '커뮤니티' },
            //   { value: normalData, name: '개인' },
            //   { value: companyData, name: '그룹' },
            //   { value: total, name: '총 회원수' }
            // ]);
        } catch (error) {
            console.error("데이터를 불러오는 중 오류 발생:", error);
        }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // 비동기로 데이터를 받아온 후에 setChartData 실행
        setChartData([
        { value: community, name: '커뮤니티' },
        { value: normal, name: '개인' },
        { value: company, name: '그룹' },
        { value: total, name: '총 회원수' }
        ]);
    }, [total]);


  
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
          <span style={{ fontWeight: "bold", fontSize: 12 }}> 대시보드</span>
        </p>
        <p style={{ fontWeight: "bold", color: "#222", marginTop:"20px", display:'flex', alignItems:'center' }}>
          <IoIosArrowDropdownCircle 
            style={{ color: "#0476D9" }}
          />
          <p style={{marginLeft:'5px'}}>대시보드</p>
        </p>
      </div>
      <div style={{width:'100%', marginTop:'20px'}}>
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <div className={style.dashboardUserCountWrap} style={{borderTop:'5px solid #154DCA', color:"#154DCA"}}>
                            <p>총 회원수</p>
                            <h2>{total}</h2>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={style.dashboardUserCountWrap} style={{borderTop:'5px solid #0171D1', color:"#0171D1"}}>
                            <p>커뮤니티</p>
                            <h2>{community}</h2>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={style.dashboardUserCountWrap} style={{borderTop:'5px solid #119FB3', color:"#119FB3"}}>
                            <p>개인</p>
                            <h2>{normal}</h2>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={style.dashboardUserCountWrap} style={{borderTop:'5px solid #252999', color:"#252999"}}>
                            <p>그룹</p>
                            <h2>{company}</h2>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={4}>
                <div className={style.dashboardWrap}>
                    <AdminChart chartData={chartData}/>
                </div>
            </Grid>
            <Grid item xs={4}>
                <div className={style.dashboardWrap}>
                    <AdminLineChart />
                </div>
            </Grid>
            <Grid item xs={4}>
                <div className={style.dashboardWrap}>
                    <h2>신고 내역</h2>
                    <table className={style.adminClaimTable}>
                        <tr>
                            <td>
                                <span className={style.claimSpanNone}>미처리</span>
                            </td>
                            <td>대댓글</td>
                            <td>스팸홍보/도배글</td>
                            <td>2023-12-12</td>
                        </tr>
                        <tr>
                            <td>
                                <span className={style.claimSpanNone}>미처리</span>
                            </td>
                            <td>대댓글</td>
                            <td>스팸홍보/도배글</td>
                            <td>2023-12-12</td>
                        </tr>
                        <tr>
                            <td>
                                <span className={style.claimSpanNone}>미처리</span>
                            </td>
                            <td>대댓글</td>
                            <td>스팸홍보/도배글</td>
                            <td>2023-12-12</td>
                        </tr>
                        <tr>
                            <td>
                                <span className={style.claimSpanNone}>미처리</span>
                            </td>
                            <td>대댓글</td>
                            <td>스팸홍보/도배글</td>
                            <td>2023-12-12</td>
                        </tr>
                        <tr>
                            <td>
                                <span className={style.claimSpanSuccess}>처리</span>
                            </td>
                            <td>대댓글</td>
                            <td>스팸홍보/도배글</td>
                            <td>2023-12-12</td>
                        </tr>
                        <tr>
                            <td>
                                <span className={style.claimSpanSuccess}>처리</span>
                            </td>
                            <td>대댓글</td>
                            <td>스팸홍보/도배글</td>
                            <td>2023-12-12</td>
                        </tr>
                    </table>
                </div>
            </Grid>
            <Grid item xs={4}>
                <div className={style.dashboardWrap}>
                    <h2>설문 커뮤니티</h2>
                    <table className={style.adminBoarderTable}>
                        <tr>
                            <td>
                                1
                            </td>
                            <td>21년도 상반기 설문조사</td>
                            <td>홍길동</td>
                            <td>2023-12-12</td>
                        </tr>
                        <tr>
                            <td>
                                1
                            </td>
                            <td>21년도 상반기 설문조사</td>
                            <td>홍길동</td>
                            <td>2023-12-12</td>
                        </tr>
                        <tr>
                            <td>
                                1
                            </td>
                            <td>21년도 상반기 설문조사</td>
                            <td>홍길동</td>
                            <td>2023-12-12</td>
                        </tr>
                        <tr>
                            <td>
                                1
                            </td>
                            <td>21년도 상반기 설문조사</td>
                            <td>홍길동</td>
                            <td>2023-12-12</td>
                        </tr>
                        <tr>
                            <td>
                                1
                            </td>
                            <td>21년도 상반기 설문조사</td>
                            <td>홍길동</td>
                            <td>2023-12-12</td>
                        </tr>
                        <tr>
                            <td>
                                1
                            </td>
                            <td>21년도 상반기 설문조사</td>
                            <td>홍길동</td>
                            <td>2023-12-12</td>
                        </tr>
                    </table>
                </div>
            </Grid>
            <Grid item xs={4}>
                <div className={style.dashboardWrap}>
                    <h2>커뮤니티</h2>
                    <table className={style.adminBoarderTable}>
                    {Array.isArray(communityList.content) && communityList.content.slice(0, 6).map((communityitem, index) => (
                        <tr>
                            <td>
                                {index + 1}
                            </td>
                            <td>{communityitem.title}</td>
                            <td>{communityitem.nickname}</td>
                            <td>{communityitem.createTime}</td>
                        </tr>
                    ))}
                    </table>
                </div>
            </Grid>
        </Grid>
      </div>
    </div>
    </div>
  
  );
}

export default AdminDashboard;
