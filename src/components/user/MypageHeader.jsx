// Header.jsx
import React from 'react';
import style from '../../style/user/MypageHeader.module.css'
import back from '../../assets/img/back.png'
import useFadeIn from '../../style/useFadeIn';

function MypageHeader() {
  const fadeIn = useFadeIn();
  return (
    
      <div className={style.mypageHeader}>
          <div className={style.mypageUser}>
          </div>
      </div>
  );
}

export default MypageHeader;
