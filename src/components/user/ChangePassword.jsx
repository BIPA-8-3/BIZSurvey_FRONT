import React, { useState, useEffect } from 'react';
import style from '../../style/user/Login.module.css'
import Button from '@mui/material/Button';
import back from '../../assets/img/back.png'
import { useLocation, useNavigate } from "react-router-dom";
import useFadeIn from '../../style/useFadeIn';
import call from '../../pages/workspace/api';


function FindPassword() {
  const fadeIn = useFadeIn();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

useEffect(() => {
  setEmail(location.state?.email || '')
}, [])

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError('');
  };


  const handleSubmit = async () => {
    alert(email)
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('비밀번호는 8-16자리 사이, 소문자, 숫자, 특수문자를 포함해야 합니다.');
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }
    call(`/password`, "PATCH", {
      email : email,
      password : password
    }).then((response) => {
      alert(response)
      navigate('/login');
    }).catch((error)=>{
      console.log(error);
    })
   
}



  return (
    <div id={style.loginWrap} className={`fade-in ${fadeIn ? 'active' : ''}`}>
      <div className={style.titleWrap}>
          <h1 className='textCenter title textBold'>비밀번호 변경</h1>
          <p className='textCenter subTitle'>변경할 비밀번호를 정확히 입력해주세요.</p>
      </div>
      <p></p>

      <label style={{fontSize: '10px'}}>비밀번호</label>
      <input type='text' 
             className={style.input}
             onChange={handlePasswordChange}/>
      {passwordError && <p style={{color:'red', fontSize:'12px', marginTop:'5px'}}>{passwordError}</p>}
      <div style={{width:'10px', height:'15px'}}></div>
      <label style={{fontSize: '10px'}}>비밀번호 확인</label>
      <input type='text' 
             className={style.input}
             onChange={handleConfirmPasswordChange}/>
      {confirmPasswordError && <p style={{color:'red', fontSize:'12px', marginTop:'5px'}}>{confirmPasswordError}</p>}      

      <Button variant="contained" onClick={handleSubmit} href="#contained-buttons" sx={{marginTop:'40px', width:'100%', padding:'11.5px 14px', backgroundColor:'#243579'}}>
        비밀번호 변경
      </Button>
      <img src={back} alt="배경" className={style.back}/>
    </div>
  );
}

export default FindPassword;
