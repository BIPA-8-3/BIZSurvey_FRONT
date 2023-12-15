// Header.jsx
import React, { useState, useRef, useEffect, useContext } from 'react';
import style from "../../style/Header.module.css";
import logo from '../../assets/img/logo.png'
import { IoMenu } from "react-icons/io5";
import avatar from '../../assets/img/avatar.png';
import { Link, useNavigate } from "react-router-dom";
import { LoginContext, LoginFunContext } from "../../App";

const navItems = ['설문 참여', '플랜', '커뮤니티', '워크스페이스', 'Sign In'];

function Header() {
  const userInfo = useContext(LoginContext)
  const  {setUserInfo} = useContext(LoginFunContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const bestRef = useRef();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('accessToken'); 

  useEffect(() => {
    console.log("userInfo : " + userInfo.email)
    const closeMenu = () => {
      setIsMenuOpen(false);
    };
    window.addEventListener('popstate', closeMenu);

    return () => {
      window.removeEventListener('popstate', closeMenu);
    };
  }, []);

  useEffect(() => {
    if (bestRef.current) {
      if (isMenuOpen) {
        bestRef.current.classList.add(style.slideIn);
        bestRef.current.classList.remove(style.slideOut);
      } else {
        bestRef.current.classList.remove(style.slideIn);
        bestRef.current.classList.add(style.slideOut);

        setTimeout(() => {
          bestRef.current.classList.remove(style.slideOut);
        }, 500);
      }
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleLinkClick = () => {
    // 페이지 이동 시 메뉴를 닫도록 설정
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    
    if(window.confirm("로그아웃 하시겠습니까?")){
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUserInfo({
        birthdate: "",
        email:"", 
        gender: "",
        id:0,
        name: "",
        nickname: "",
        planSubscribe: "",
        profile: ""

      })
      localStorage.removeItem("userInfo");
      navigate('/');
    }
  }
  return (
    <div id={style.mainHeader}>
      <div id={style.headerItemWrap}>
        <Link to='/'><img src={logo} alt="logo" className={style.logo}/></Link>
        <div className={style.headerMenu}>
          <ul>
            <Link to={'/surveyPost'}><li>설문참여</li></Link>
            <Link to={'/plan'}><li>플랜</li></Link>
            <Link to={'/community'}><li>커뮤니티</li></Link>
            <Link to={'/workspace'}><li>워크스페이스</li></Link>
            {isLoggedIn ? (
              // 로그인 상태일 때 표시되는 링크
              <Link onClick={handleLogout}>
                <li style={{padding:'0px', paddingLeft:'10px'}}>
                  <div className={style.photo}>
                      <img className="" src={avatar} alt="프로필 이미지" />
                  </div>
                </li>
              </Link>
            ) : (
              // 비로그인 상태일 때 표시되는 링크
              <Link to={'/login'}>
                <li style={{padding:'0px', paddingLeft:'10px'}}>
                  로그인
                </li>
              </Link>
            )}
          </ul>
        </div>
        <div id="menuIcon" onClick={toggleMenu}>
          <IoMenu style={{fontSize:"36px", paddingTop:"3px", color:"#243579"}}/>
        </div>
      </div>

      <div className={style.mobileMenu}>
        {isMenuOpen && (
          <div className={style.back} onClick={toggleMenu}></div>
        )}
        <div ref={bestRef} className={style.mobileMenuItemWrap}>
          <img src={logo} alt="logo" className={style.logo} style={{height:"auto"}}/>
          <ul>
            <Link to={'/surveyPost'} onClick={handleLinkClick}><li>설문참여</li></Link>
            <Link to={'/plan'} onClick={handleLinkClick}><li>플랜</li></Link>
            <Link to={'/community'} onClick={handleLinkClick}><li>커뮤니티</li></Link>
            <Link to={'/workspace'} onClick={handleLinkClick}><li>워크스페이스</li></Link>
            <Link to={'/login'} onClick={handleLinkClick}><li>Sign In</li></Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
