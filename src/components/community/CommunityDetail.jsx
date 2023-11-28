import * as React from 'react';
import style from"../../style/community/CommunityDetail.module.css"
import '../../style/Common.css'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { Tabs, Tab } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PersonIcon from '@mui/icons-material/Person';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Search from '../common/Search';
import { useState } from 'react';

import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useFadeIn from '../../style/useFadeIn';
import back from '../../assets/img/back.png'
import CommunityTable from './CommunityTable';
import Button from '@mui/material/Button';
import logo from "../../assets/img/avatar.png"
import { Link } from 'react-router-dom';
import Comment from './Comment';
import ParentsComment from './ParentsComment';

import ChildCommentForm from './ChildCommentForm';
import ChildComment from './ChildComment';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


export default function CommunityPost() {
  
  const fadeIn = useFadeIn();
 
  return (

   

    <div className={`fade-in ${fadeIn ? 'active' : ''}`}>
        <div className={style.titleWrap}>
            <h1 className='textCenter title textBold'>COMMUNITY</h1>
            <p className='textCenter subTitle'>쉽고 빠른 설문 플랫폼 어쩌고 저쩌고 입니다.</p>
        </div>
        <div className={style.contentWrap}>
             
            <div style={{backgroundColor: 'rgba(209, 232, 248, 0.1)'}}>
                <div className={style.title}>
                    <h1>비즈서베이 커뮤니티 게시글:)</h1>
                    <p style={{display:'flex'}}>
                        <p style={{textAlign:'center'}}>
                            <div className={style.profil} style={{textAlign:'center'}}>
                                <span className={style.photo}>
                                    <img className='' src={logo}/>
                                </span>
                                <span className={style.nickname}>철수예오</span>
                            </div>
                        </p>
                        <div style={{marginTop:'16px'}}>
                            <span className={style.bar}> | </span> 
                            <span>COMMUNITY</span>
                            <span className={style.bar}> | </span> 
                            <span>2023-09-29</span> 
                        </div>
                        
                    </p>
                </div>
            </div>
            <div className={style.content}>
                <p>국무총리·국무위원 또는 정부위원은 국회나 그 위원회에 출석하여 국정처리상황을 보고하거나 의견을 진술하고 질문에 응답할 수 있다. 대통령은 법률이 정하는 바에 의하여 훈장 기타의 영전을 수여한다.
                    형사피해자는 법률이 정하는 바에 의하여 당해 사건의 재판절차에서 진술할 수 있다. 국회의원은 그 지위를 남용하여 국가·공공단체 또는 기업체와의 계약이나 그 처분에 의하여 재산상의 권리·이익 또는 직위를 취득하거나 타인을 위하여 그 취득을 알선할 수 없다.</p>
                <p style={{marginTop:'100px'}}>
                    <div>
                        조회수 <span style={{fontWeight:'bold'}}>128</span>
                        <span style={{color:'#ddd'}}> | </span> 
                        댓글 <span style={{fontWeight:'bold'}}>13</span>
                    </div>
                </p>
                
            </div>
            <Comment />
            <ParentsComment />
            <ChildCommentForm />
            <ChildComment />
            <ChildComment />
            <ParentsComment />
            <ChildComment />
            <ParentsComment />
            <ChildComment />
            <ParentsComment />
            <ParentsComment />
            <ChildCommentForm />
        </div>
        <div style={{textAlign:'center'}}>
            <Link to={'/community'}>
                <Button variant="contained" href="#contained-buttons" sx={{padding:'11.5px 30px', backgroundColor:'#243579', fontWeight:'bold'}}>
                    목록으로
                </Button>
            </Link>
        </div>
        <img src={back} alt="배경" className={style.back}/>
    </div>
  );
}