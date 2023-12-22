import React, { useState, useEffect } from 'react';
import style from '../../style/admin/AdminDashboard.module.css'
import useFadeIn from '../../style/useFadeIn';
import Button from '@mui/material/Button';
import { useLocation, useNavigate, useHistory } from "react-router-dom";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AdminChart from './AdminPieChart';
import AdminLineChart from './AdminLineChart';
import call from '../../pages/workspace/api';
import { set } from 'react-hook-form';
function AdminDashboard() {
    const navigate = useNavigate();

    const [chartData, setChartData] = useState([]);
    const [community, setCommunity] = useState(0);
    const [normal, setNormal] = useState(0);
    const [company, setCompany] = useState(0);
    const [total, setTotal] = useState(0);
    const [communityList, setCommunityList] = useState([]);
    const [signupCount, setSignupCount] = useState([])
    const [lineChartData, setLineChartData] = useState([]);
    const [surveyCommunityList, setSurveyCommunityList] = useState([]);
    const [claimList, setClaimList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const communityData = await call("/admin/user/plan/COMMUNITY", "GET");
            setCommunity(communityData);

            const normalData = await call("/admin/user/plan/NORMAL_SUBSCRIBE", "GET");
            setNormal(normalData);

            const companyData = await call("/admin/user/plan/COMPANY_SUBSCRIBE", "GET");
            setCompany(companyData);
            setTotal(communityData + normalData + companyData)

            const communityListData = await call("/admin/community", "GET")
            setCommunityList(communityListData);

            const signupCount = await call("/admin/signup/count", "GET")
            setLineChartData(signupCount);

            const surveyCommunityListData = await call("/admin/s-community", "GET")
            setSurveyCommunityList(surveyCommunityListData);

            call("/admin/claim/unprocessed", "GET").then((data) => {
                setClaimList(data.content);
            }).catch((error) => {
                console.log(error)
            })
            
        } catch (error) {
            console.error("데이터를 불러오는 중 오류 발생:", error);
            if(error.response.data.errorCode === 403){
                navigate("/admin/login")
            }
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

    useEffect(() => {
        setLineChartData(signupCount);
    }, [signupCount])




  
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
                    <AdminLineChart lineChartData={lineChartData}/>
                </div>
            </Grid>
            <Grid item xs={4}>
                <div className={style.dashboardWrap}>
                    <h2>신고 내역</h2>
                    <table className={style.adminClaimTable}>
                        {Array.isArray(claimList.content) && claimList.content.slice(0, 6).map((claimList, index) => (
                            <tr>
                                <td>
                                    <span className={style.claimSpanNone}>미처리</span>
                                </td>
                                <td>{claimList.claimType}</td>
                                <td>{claimList.claimReason}</td>
                                <td>{claimList.regDate}</td>
                            </tr>
                        ))}             
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
                    {Array.isArray(surveyCommunityList.content) && surveyCommunityList.content.slice(0, 6).map((communityitem, index) => (
                         <tr>
                         <td>
                             {index + 1}
                         </td>
                         <td style={{whiteSpace:'nowrap', maxWidth:'150px', overflow:'hidden', textOverflow: 'ellipsis'}}>{communityitem.title}</td>
                         <td>{communityitem.nickname}</td>
                         <td>{communityitem.createDate}</td>
                     </tr>
                    ))}
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
                            <td style={{whiteSpace:'nowrap', maxWidth:'150px', overflow:'hidden', textOverflow: 'ellipsis'}}>{communityitem.title}</td>
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
