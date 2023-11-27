// Header.jsx
import React from 'react';
import style from '../../style/user/Login.module.css'
import kakao from '../../assets/img/user/kakaoLogin.png'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import back from '../../assets/img/back.png'

function Login() {
  return (
    <div id={style.loginWrap}>
      <h1 className={`${style.title}`+ ' textCenter textBold'}>LOGIN</h1>
      <p></p>
      <img src={kakao} alt="카카오 로그인" className={`${style.kakaoLogin}`}/>
      <label style={{fontSize: '10px'}}>이메일</label>
      <input type='text' className={style.input} style={{marginBottom:'20px'}}/>
      <label>패스워드</label>
      <input type='text' className={style.input}/>
      <p className={style.searchPw}><a>비밀번호를 잊으셨나요?</a></p>
      <Button variant="contained" href="#contained-buttons" sx={{marginTop:'40px', width:'100%', padding:'11.5px 14px', backgroundColor:'#243579'}}>
        Login
      </Button>
      <img src={back} alt="카카오 로그인" className={style.back}/>
    </div>
  );
}

export default Login;
