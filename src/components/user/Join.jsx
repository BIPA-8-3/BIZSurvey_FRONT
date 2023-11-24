// Header.jsx
import React from 'react';
import style from '../../style/user/Join.module.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Join() {
  return (
    <div id={style.joinWrap}>
      <h1 className={`${style.title}`+ ' textCenter textBold'}>JOIN</h1>
      
      <label>이메일</label>
      <div className={style.inputWrap}>
        <div className={style.inputDiv}>
            <input type='text' className={style.input}/>
        </div>
        <div className={style.inputBtn}></div>
      </div>
      <p className={style.searchPw}><a>비밀번호를 잊으셨나요?</a></p>
      <Button variant="contained" href="#contained-buttons" sx={{marginTop:'40px', width:'100%', padding:'11.5px 14px', backgroundColor:'#243579'}}>
        Login
      </Button>
    </div>
  );
}

export default Join;
