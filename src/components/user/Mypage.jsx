// Header.jsx
import React from 'react';
import style from '../../style/user/MypageHeader.module.css'
import back from '../../assets/img/back.png'
import useFadeIn from '../../style/useFadeIn';

import MypageHeader from './MypageHeader';

function Mypage() {
  const fadeIn = useFadeIn();
  return (
    <div id={style.joinWrap} className={`fade-in ${fadeIn ? 'active' : ''}`}>
        <MypageHeader />
      <img src={back} alt="배경" className={style.back}/>
    </div>
  );
}

export default Mypage;
