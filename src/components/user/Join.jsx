// Header.jsx
import React from 'react';
import style from '../../style/user/Join.module.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import back from '../../assets/img/back.png'

function Join() {
  return (
    <div id={style.joinWrap}>
      <h1 className={`${style.title}`+ ' textCenter textBold'}>JOIN</h1>
      
      <label>이메일</label>
      <div className={style.inputWrap}>
        <div className={style.inputDiv}>
            <input type='text' className={style.input}/>
        </div>
        <div className={style.inputBtn}>인증번호 전송</div>
      </div>

      <label>인증번호</label>
      <div className={style.inputWrap}>
        <div className={style.inputDiv}>
            <input type='text' className={style.input}/>
        </div>
        <div className={style.inputBtn}>인증번호 확인</div>
      </div>

      <label>비밀번호</label>
      <div className={style.inputWrap}>
        <div className={`${style.inputDiv} ${style.input100}`}>
            <input type='text' className={style.input}/>
        </div>
      </div>

      <label>비밀번호 확인</label>
      <div className={style.inputWrap}>
        <div className={`${style.inputDiv} ${style.input100}`}>
            <input type='text' className={style.input}/>
        </div>
      </div>

      <label>이름</label>
      <div className={style.inputWrap}>
        <div className={`${style.inputDiv} ${style.input100}`}>
            <input type='text' className={style.input}/>
        </div>
      </div>

      <label>생년월일</label>
      <div className={style.inputWrap}>
        <div className={`${style.inputDiv} ${style.input100}`}>
            <input type='text' className={style.input}/>
        </div>
      </div>

      <label>생년월일</label><br />
      <FormControl>
        <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
            <FormControlLabel value="female" control={<Radio />} label="남자" checked/>
            <FormControlLabel value="male" control={<Radio />} label="여자" />
        </RadioGroup>
        </FormControl>

      
      <Button variant="contained" href="#contained-buttons" sx={{marginTop:'40px', width:'100%', padding:'11.5px 14px', backgroundColor:'#243579'}}>
        회원가입
      </Button>
      <img src={back} alt="카카오 로그인" className={style.back}/>
    </div>
  );
}

export default Join;
