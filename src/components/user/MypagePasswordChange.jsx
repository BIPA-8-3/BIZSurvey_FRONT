import React, { useState, useEffect } from 'react';
import style from '../../style/user/MypagePasswordChange.module.css'
import logo from '../../assets/img/logo.png'
import useFadeIn from '../../style/useFadeIn';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

function MypagePasswordChange({userData, setEditState}) {
  const fadeIn = useFadeIn();

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ''; 

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError('');
  };

  const handleSubmit = async () => {
    
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('비밀번호는 8-16자리 사이, 소문자, 숫자, 특수문자를 포함해야 합니다.');
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try{
        const response = await axios.patch(`/password`, {
            email : userData.email,
            password : password
        });
        alert(response.data)
        navigate('/mypage');
    }catch{
        alert('플랜 변경 중 오류가 발생했습니다.');
    }
  }
  

  return (
    
      <div className={style.mypageUserInfoWrap}>
          <div>
            <ul className={style.mypageUserInfo}>
                <li style={{display:'flex', justifyContent:'space-between'}}>
                    <div>
                        <span style={{paddingLeft: '15px'}}>비밀번호 변경</span>
                    </div>
                    <div>
                        <button onClick={handleSubmit}>수정</button>
                    </div>
                </li>
                <li>
                <div style={{width:'500px', margin:'0 auto', textAlign:'center', paddingTop:'20px', paddingBottom:'20px', color:'gray', backgroundColor:'rgba(207, 217, 255, 0.2)', borderRadius:'10px'}}>
                    <p style={{color:'#111'}}>변경할 비밀번호를 정확히 입력해주세요.</p>
                    <p style={{color:'red', marginTop:'10px', fontSize:'12px'}}>(8-16자리, 소문자, 숫자, 특수문자를 포함해야 합니다.)</p>
                </div>
                <div id={style.loginWrap} style={{padding: '40px 0px 60px 0px'}}>
                    <label style={{fontSize: '10px'}}>비밀번호</label>
                    <input type='password' 
                            className={style.input}
                            onChange={handlePasswordChange}/>
                    {passwordError && <p style={{color:'red', fontSize:'12px', marginTop:'5px'}}>{passwordError}</p>}
                    <div style={{width:'10px', height:'15px'}}></div>
                    <label style={{fontSize: '10px'}}>비밀번호 확인</label>
                    <input type='password'  
                            className={style.input}
                            onChange={handleConfirmPasswordChange}/>
                    {confirmPasswordError && <p style={{color:'red', fontSize:'12px', marginTop:'5px'}}>{confirmPasswordError}</p>}      

                   
                    </div>
                </li>
                
            </ul>
          </div>
      </div>
  );
}

export default MypagePasswordChange;
