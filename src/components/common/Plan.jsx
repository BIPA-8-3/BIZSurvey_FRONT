// Header.jsx
import React , { useEffect, useState }  from 'react';
import style from '../../style/Plan.module.css'
import back from '../../assets/img/back.png'
import Grid from '@mui/material/Grid';
import IconWithText from './IconWithText';
import { FaRegStickyNote } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { MdOutlineIosShare } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import { MdGroup, MdWorkspaces } from "react-icons/md";
import { FaLink } from "react-icons/fa6";
import useFadeIn from '../../style/useFadeIn';

function Plan() {
    const fadeIn = useFadeIn();
  return (
    <div className={`fade-in ${fadeIn ? 'active' : ''}`} >
      <div className={style.titleWrap}>
          <h1 className='textCenter title textBold'>PLAN</h1>
          <p className='textCenter subTitle'>플랜 가입하고 비즈서베이의 워크스페이스 기능을 사용해보세요!</p>
      </div>
      <div className={style.planWrap} >
        <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={6} spacing={2}>
                <div className={style.plan}>
                    <div className={style.planHead} style={{backgroundColor : '#0171D1'}}>
                        <p>SINGlE PLAN</p>
                    </div>
                    <div className={style.planBody}>
                        <p className={style.subTitle} >개인 플랜</p>
                        <div className={style.subText}>
                            <p>
                                어쩌고 저쩌고 무슨말 저런말 입니다.<br/>
                                쓸말이 없지만 또 만들어서 넣을 예정!
                            </p>
                        </div>
                        <div className={style.itemList}>
                            <Grid container spacing={2}>
                                <Grid item xs={6} md={6} lg={6}>
                                    <IconWithText className='item1' text={(<><span className={style.point1}>개인</span> 워크스페이스</>)} fontsize={'13px'} fontweight={'400'} fontcolor={'#111'}>
                                        <FaRegStickyNote />
                                    </IconWithText>
                                </Grid>
                                <Grid item xs={6} md={6} lg={6}>
                                    <IconWithText text={(<><span className={style.point1}>설문지</span> 관리</>)} fontsize={'13px'} fontweight={'400'} fontcolor={'#111'}>
                                        <FaPencil />
                                    </IconWithText>
                                </Grid>
                                <Grid item xs={6} md={6} lg={6} >
                                    <IconWithText text={(<>설문 커뮤니티 <span className={style.point1}>공유</span></>)} fontsize={'13px'} fontweight={'400'} fontcolor={'#111'}>
                                        <MdOutlineIosShare />
                                    </IconWithText>
                                </Grid>
                                <Grid item xs={6} md={6} lg={6} >
                                    <IconWithText text={(<><span className={style.point1}>설문 통계</span> 조회</>)} fontsize={'13px'} fontweight={'400'} fontcolor={'#111'}>
                                        <FaChartBar />
                                    </IconWithText>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </Grid>
            <Grid item xs={12} md={6} lg={6} spacing={2}>
            <div className={style.plan}>
                    <div className={style.planHead} style={{backgroundColor : '#243579'}}>
                        <p>GROUP PLAN</p>
                    </div>
                    <div className={style.planBody}>
                        <p className={style.subTitle}>그룹 플랜</p>
                        <div className={style.subText}>
                            <p>
                                어쩌고 저쩌고 무슨말 저런말 입니다.<br/>
                                쓸말이 없지만 또 만들어서 넣을 예정!
                            </p>
                        </div>
                        <div className={style.itemList}>
                            <Grid container spacing={2}>
                                <Grid item xs={6} md={6} lg={6}>
                                    <IconWithText text={(<><span className={style.point2}>개인</span> 워크스페이스</>)} fontsize={'13px'} fontweight={'400'} fontcolor={'#111'}>
                                        <FaRegStickyNote />
                                    </IconWithText>
                                </Grid>
                                <Grid item xs={6} md={6} lg={6}>
                                    <IconWithText text={(<><span className={style.point2}>설문지</span> 관리</>)} fontsize={'13px'} fontweight={'400'} fontcolor={'#111'}>
                                        <FaPencil />
                                    </IconWithText>
                                </Grid>
                                <Grid item xs={6} md={6} lg={6} >
                                    <IconWithText text={(<>설문 커뮤니티 <span className={style.point2}>공유</span></>)} fontsize={'13px'} fontweight={'400'} fontcolor={'#111'}>
                                        <MdOutlineIosShare />
                                    </IconWithText>
                                </Grid>
                                <Grid item xs={6} md={6} lg={6} >
                                    <IconWithText text={(<><span className={style.point2}>설문 통계</span> 조회</>)} fontsize={'13px'} fontweight={'400'} fontcolor={'#111'}>
                                        <FaChartBar />
                                    </IconWithText>
                                </Grid>
                                <Grid item xs={6} md={6} lg={6}>
                                    <IconWithText text={(<><span className={style.point2}>관리자 초대</span> 기능</>)} fontsize={'13px'} fontweight={'400'} fontcolor={'#111'}>
                                        <MdGroup />
                                    </IconWithText>
                                </Grid>
                                <Grid item xs={6} md={6} lg={6}>
                                    <IconWithText text={(<><span className={style.point2}>외부링크 공유</span></>)} fontsize={'13px'} fontweight={'400'} fontcolor={'#111'}>
                                        <FaLink />
                                    </IconWithText>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12} >
                                    <IconWithText text={(<>그룹 워크스페이스 <span className={style.point2}>무제한</span></>)} fontsize={'13px'} fontweight={'400'} fontcolor={'#111'}>
                                        <MdWorkspaces />
                                    </IconWithText>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </Grid>
        </Grid>
      </div>
      <img src={back} alt="배경" className={style.back}/>
    </div>
  );
}

export default Plan;