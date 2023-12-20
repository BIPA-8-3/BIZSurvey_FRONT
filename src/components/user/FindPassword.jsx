import React, { useState } from 'react';
import style from '../../style/user/Login.module.css'
import Button from '@mui/material/Button';
import back from '../../assets/img/back.png'
import { Link } from "react-router-dom";
import useFadeIn from '../../style/useFadeIn';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import call from '../../pages/workspace/api';

function FindPassword() {
  const fadeIn = useFadeIn();
  const [isEmail, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async () => {
    if (!isEmail || !isValidEmail(isEmail)) {
      alert('이메일을 확인해주세요')
      return;  // Stop execution if email is invalid
    }

    setLoading(true)

    try{
      const request = {email: isEmail}
      const response = await call("/check-email", "POST", request);

      
    }catch(error){
      console.error("error:", error);
    }
    finally{
      setLoading(false)
      alert("입력하신 이메일로 비밀번호 재전송 링크를 전송했습니다.");
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const isValidEmail = (email) => {
    // Implement your email validation logic, e.g., regex or other checks
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };
  return (
    <div id={style.loginWrap} className={`fade-in ${fadeIn ? 'active' : ''}`}>
      
      {loading && (
        <div className='customLoadingWrap'>
            <CircularProgress size='100px'/>
        </div>
      )}
        <>
            <div className={style.titleWrap}>
                <h1 className='textCenter title textBold'>비밀번호 재설정</h1>
                <p className='textCenter subTitle'>가입하신 이메일로 비밀번호 변경 링크가 전송됩니다.</p>
            </div>
            <p></p>
            <label style={{fontSize: '10px'}}>이메일</label>
            <input type='text' 
                  className={style.input} 
                  style={{marginBottom:'20px'}}
                  value={isEmail}
                  onChange={handleEmailChange}/>
            <Button variant="contained" href="#contained-buttons" onClick={handlePasswordChange} sx={{marginTop:'40px', width:'100%', padding:'11.5px 14px', backgroundColor:'#243579'}}>
              인증 메일 전송하기
            </Button>
            <img src={back} alt="배경" className={style.back}/>
        </>
    </div>
  );
}

export default FindPassword;
