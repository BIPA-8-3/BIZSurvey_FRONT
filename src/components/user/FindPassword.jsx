import React from 'react';
import style from '../../style/user/Login.module.css'
import Button from '@mui/material/Button';
import back from '../../assets/img/back.png'
import { Link } from "react-router-dom";
import useFadeIn from '../../style/useFadeIn';

function FindPassword() {
  const fadeIn = useFadeIn();
  return (
    <div id={style.loginWrap} className={`fade-in ${fadeIn ? 'active' : ''}`}>
      <div className={style.titleWrap}>
          <h1 className='textCenter title textBold'>비밀번호 재설정</h1>
          <p className='textCenter subTitle'>가입하신 이메일로 비밀번호 변경 링크가 전송됩니다.</p>
      </div>
      <p></p>
      <label style={{fontSize: '10px'}}>이메일</label>
      <input type='text' className={style.input} style={{marginBottom:'20px'}}/>
      <Button variant="contained" href="#contained-buttons" sx={{marginTop:'40px', width:'100%', padding:'11.5px 14px', backgroundColor:'#243579'}}>
        인증 메일 전송하기
      </Button>
      <img src={back} alt="배경" className={style.back}/>
    </div>
  );
}

export default FindPassword;
