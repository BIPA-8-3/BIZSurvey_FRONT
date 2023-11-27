// Header.jsx
import React from 'react';
import style from '../../style/Plan.module.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import back from '../../assets/img/back.png'
import Grid from '@mui/material/Grid';

function Plan() {
  return (
    <div>
      <div className={style.titleWrap}>
          <h1 className='textCenter title textBold'>PLAN</h1>
          <p className='textCenter subTitle'>쉽고 빠른 설문 플랫폼 어쩌고 저쩌고 입니다.</p>
      </div>
      <div className={style.planWrap} >
        <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={6} spacing={2}>
                <div className={style.plan}>
                    <div className={style.planHead}>
                        <p>개인 플랜</p>
                    </div>
                    <div className={style.planBody}>
                        <div className={style.subText}>
                            <p>
                                어쩌고 저쩌고 무슨말 저런말 입니다.<br/>
                                쓸말이 없지만 또 만들어서 넣을 예정!
                            </p>
                        </div>
                        <div className={style.itemList}>
                            <Grid container spacing={2}>
                                <Grid item xs={6} md={6} lg={6} spacing={2} spacing={2}>
                                    sdfsdf
                                </Grid>
                                <Grid item xs={6} md={6} lg={6} spacing={2} spacing={2}>
                                    fsdfsdf
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </Grid>
            <Grid item xs={12} md={6} lg={6} spacing={2}>
                <div className={style.plan}>
                    <p>개인 플랜</p>
                    
                </div>
            </Grid>
        </Grid>
      </div>
      <img src={back} alt="배경" className={style.back}/>
    </div>
  );
}

export default Plan;
