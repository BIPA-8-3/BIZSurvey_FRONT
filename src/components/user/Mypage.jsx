// Header.jsx
import React from 'react';
import style from '../../style/user/MypageHeader.module.css'
import back from '../../assets/img/back.png'
import useFadeIn from '../../style/useFadeIn';

import MypageHeader from './MypageHeader';
import MypageUserInfo from './MypageUserInfo';

function Mypage() {
  const fadeIn = useFadeIn();
  return (
    <div id={style.joinWrap} className={`fade-in ${fadeIn ? 'active' : ''}`}>
        <div style={{display:'flex'}}>
          <MypageHeader />
          <div style={{background:'#fff', flex: '1', marginTop:'-54px'}}>
            <MypageUserInfo />
          </div>
        </div>
      <img src={back} alt="배경" className={style.back}/>
    </div>
  );
}

export default Mypage;
