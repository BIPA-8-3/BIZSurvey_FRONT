import React, {useEffect} from 'react';
import style from '../../style/user/Login.module.css'
import kakao from '../../assets/img/user/kakaoLogin.png'
import Button from '@mui/material/Button';
import back from '../../assets/img/back.png'
import { Link } from "react-router-dom";
import useFadeIn from '../../style/useFadeIn';
import Axios from "axios";

function Login() {
  useEffect(() => {
      Axios.get(`/admin/users`).then((response) => {
          console.log(response.data)
      })
  },[])

  const fadeIn = useFadeIn();
  return (
    <div id={style.loginWrap} className={`fade-in ${fadeIn ? 'active' : ''}`}>
      <div className={style.titleWrap}>
          <h1 className='textCenter title textBold'>로그인</h1>
          <p className='textCenter subTitle'>쉽고 빠른 설문 플랫폼 어쩌고 저쩌고 입니다.</p>
      </div>
      <p></p>
      <img src={kakao} alt="카카오 로그인" className={`${style.kakaoLogin}`}/>
      <label style={{fontSize: '10px'}}>이메일</label>
      <input type='text' className={style.input} style={{marginBottom:'20px'}}/>
      <label>패스워드</label>
      <input type='text' className={style.input}/>
      <p className={style.searchPw}><Link to={'/findPassword'}>비밀번호를 잊으셨나요?</Link></p>
      <Button variant="contained" href="#contained-buttons" sx={{marginTop:'40px', width:'100%', padding:'11.5px 14px', backgroundColor:'#243579'}}>
        Login
      </Button>
      <p className={style.joinText}><Link to={'/join'}>아직 비즈서베이 회원이 아니신가요?</Link></p>
      <img src={back} alt="배경" className={style.back}/>
    </div>
  );
}

export default Login;
