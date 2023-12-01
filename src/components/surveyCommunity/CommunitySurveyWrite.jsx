import * as React from 'react';
import style from"../../style/surveyCommunity/CommunitySurveyWrite.module.css"
import '../../style/Common.css'
import useFadeIn from '../../style/useFadeIn';
import back from '../../assets/img/back.png'
import Button from '@mui/material/Button';
import logo from "../../assets/img/avatar.png"
import { Link } from 'react-router-dom';
import Comment from '../community/Comment';
import ParentsComment from '../community/ParentsComment';

import ChildCommentForm from '../community/ChildCommentForm';
import ChildComment from '../community/ChildComment';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


export default function CommunityPost() {
  
  const fadeIn = useFadeIn();
 
  return (

   

    <div className={`fade-in ${fadeIn ? 'active' : ''}`}>
        <div className={style.contentWrap}>
            <div style={{backgroundColor: 'rgba(209, 232, 248, 0.1)'}}>
                <div className={style.title}>
                    <h1>21년도 상반기 설문조사</h1>
                    <p style={{display:'flex'}}>
                        <p style={{textAlign:'center'}}>
                            <div className={style.profil} style={{textAlign:'center'}}>
                               
                            </div>
                        </p>
                        <div style={{marginTop:'16px'}}>
                            <span>COMMUNITY</span>
                        </div>
                    </p>
                </div>
            </div>
            <div className={style.content}>
                <div className={style.surveyBtnWrap}>
                <Button variant="contained" href="#contained-buttons" 
                sx={[{
                padding:'11px 30px', 
                backgroundColor:'#243579', 
                fontWeight:'bold', 
                marginBottom:'10px', 
                border:'1px solid #243579', 
                boxShadow:0,
                marginLeft:'5px'},{':hover':{
                    border:'1px solid #1976d2',
                    boxShadow:0
                }}]}>
                    저장
                </Button>

                </div>
               
                
            </div>
           </div>
        <div style={{textAlign:'center'}}>
            <Link to={'/'}>
                <Button variant="contained" href="#contained-buttons" sx={{padding:'11.5px 30px', backgroundColor:'#243579', fontWeight:'bold'}}>
                    홈으로
                </Button>
            </Link>
        </div>
        <img src={back} alt="배경" className={style.back}/>
    </div>
  );
}