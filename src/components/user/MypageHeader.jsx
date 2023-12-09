import React from 'react';
import style from '../../style/user/MypageHeader.module.css'
import logo from '../../assets/img/logo.png'
import back from '../../assets/img/back.png'
import useFadeIn from '../../style/useFadeIn';
import avatar from '../../assets/img/avatar.png'
import { Link } from "react-router-dom";
import { FaPen } from "react-icons/fa";

function MypageHeader() {
  const fadeIn = useFadeIn();
  return (
    
      <div className={style.mypageHeader}>
          <Link to='/'><img src={logo} alt="logo" className={style.logo}/></Link>
          <div className={style.mypageUser}>
            <div className={style.profil}>
               <div style={{position:'relative', width:'150px', margin:'0 auto'}}>
                  <div className={style.photo}>
                      <img className='' src={avatar}/>
                  </div>
                  <span className={style.profilePen}><FaPen /></span>
                </div>
                <p className={style.nickname}>눈누난나</p>
                <p className={style.email}>404444@naver.com</p>
                
            </div>
          </div>
          <div className={style.mypageMenu}>
            <ul>
              <li className={style.active}><span>내 프로필</span></li>
              <li>설문 커뮤니티 관리</li>
              <li>커뮤니티 관리</li>
              <li>비밀번호 변경</li>
            </ul>
          </div>
          <p className={style.mypageLogout}>로그아웃</p>
      </div>
  );
}

export default MypageHeader;
