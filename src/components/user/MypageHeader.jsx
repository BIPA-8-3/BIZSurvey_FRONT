// Header.jsx
import React from 'react';
import style from '../../style/user/MypageHeader.module.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import back from '../../assets/img/back.png'
import useFadeIn from '../../style/useFadeIn';

function MypageHeader() {
  const fadeIn = useFadeIn();
  return (
    <div id={style.joinWrap} className={`fade-in ${fadeIn ? 'active' : ''}`}>
      
      <img src={back} alt="카카오 로그인" className={style.back}/>
    </div>
  );
}

export default MypageHeader;
