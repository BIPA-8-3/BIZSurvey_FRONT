import React, { useState, useEffect, useRef } from 'react';
import style from '../../style/user/Join.module.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import back from '../../assets/img/back.png';
import useFadeIn from '../../style/useFadeIn';
import { useLocation, useNavigate } from 'react-router-dom';
import call from '../../pages/workspace/api';
import useApiCall, { additional } from "../api/ApiCall";
function AdditionalJoin() {
  const [isNinknameCheck, setNinknameCheck] = useState(false);
  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [nicknameSuccess, setNicknameSuccess] = useState('');
  const [birthdate, setBirthdate] = useState('');

 
  const nicknameInputRef = useRef(null);
  const navigate = useNavigate();

  const fadeIn = useFadeIn();
  const location = useLocation();
  const data = location.state.info;


  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setNicknameError('');
    setNicknameSuccess('')
    setNinknameCheck(false)
  }

  const handleBirthdateChange = (e) => {
    setBirthdate(e.target.value);
  }

  const handleNicknameCheck = async () => {

    call('/signup/check-nickname', 'POST', {
      nickname: nickname
    }).then((response) => {
      setNicknameSuccess(response)
      setNicknameError('');
      setNinknameCheck(true)
    }).catch((error) =>{
      if (error.response.data.errorCode === 600) {
        setNicknameError(error.response.data.errorMessage)
        setNicknameSuccess('')
        setNinknameCheck(false)
      }
    })
  }
  
  // 로컬 스토리지에 엑세스 토큰 저장
  const saveAccessTokenToLocalStorage = (token) => {
    localStorage.setItem('accessToken', token);
  };

  // 리프레시 토큰을 로컬 스토리지에 저장
  const saveRefreshTokenToLocalStorage = (token) => {
    localStorage.setItem('refreshToken', token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    if(isNinknameCheck){
      additional({
        id : data.id,
        email : data.email,
        nickname : nickname,
        birthdate : birthdate,
        planSubscribe : data.planSubscribe
      }).then(() => {
        navigate("/")
      })
    }
    else if(nickname == ""){
      setNicknameError("필수 정보입니다.")
      nicknameInputRef.current.focus();
      return;
    }else{
      setNicknameError("중복 확인을 해주세요")
      nicknameInputRef.current.focus();
      return;
    }
  }

  return (
    <div id={style.joinWrap} className={`fade-in ${fadeIn ? 'active' : ''}`}>
        <div className={style.titleWrap}>
          <h1 className='textCenter title textBold'>추가 회원가입</h1>
          <p className='textCenter subTitle'>
            비즈서베이 사용을 위해 추가 정보를 입력해주세요.
          </p>
        </div>
        <form>
        <label htmlFor='email'>
          이메일<span className={style.labelSpan}>*</span>
        </label>
        <div className={style.inputWrap}>
          <div className={style.inputDiv}>
            <input
              type='text'
              className={style.input}
              id='email'
              name='email'
              value={data.email}
              disabled
            />
          </div>
        </div>
        <label htmlFor="name">이름<span className={style.labelSpan}>*</span></label>
        <div className={style.inputWrap}>
          <div className={`${style.inputDiv} ${style.input100}`}>
            <input
                  type="text"
                  className={style.input}
                  id="name"
                  value={data.name}
                  disabled
                />
          </div>
        </div>
        <label htmlFor="nickname">닉네임<span className={style.labelSpan}>*</span></label>
        {nicknameSuccess && <span style={{color:'blue', fontSize:'12px', marginLeft:'5px'}}>{nicknameSuccess}</span>}
        {nicknameError && <span style={{color:'red', fontSize:'12px', marginLeft:'5px'}}>{nicknameError}</span>}
        <div className={style.inputWrap}>
          <div className={style.inputDiv}>
            <input
                type="text"
                className={style.input}
                id="nickname"
                name='nickname'
                onChange={handleNicknameChange}
                ref={nicknameInputRef}
              />
          </div>
          
          <div className={style.inputBtn} onClick={handleNicknameCheck}>중복확인</div>
        </div>
       

        <label htmlFor="birthdate">생년월일</label>
        <div className={style.inputWrap}>
          <div className={`${style.inputDiv} ${style.input100}`}>
              <input type='date' 
                      id='birthdate' 
                      name='birthdate' 
                      className={style.input}
                      onChange={handleBirthdateChange}/>
          </div>
        </div>
        <button style={{
          marginTop:'40px', 
          width:'100%', 
          padding:'14.5px 14px', 
          backgroundColor:'#243579',
          border:'1px',
          borderRadius:'5px',
          color:'#fff',
          cursor:'pointer'
        }}
        onClick={handleSubmit}>
          회원가입
        </button>
        </form>
      <img src={back} alt="카카오 로그인" className={style.back}/>
    </div>
  );
}

export default AdditionalJoin;
