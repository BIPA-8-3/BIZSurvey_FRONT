// Header.jsx
import React, { useState, useRef, useEffect } from 'react';
import style from "../../style/Header.module.css";
import logo from '../../assets/img/logo.png'
import { IoMenu } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const navItems = ['설문 참여', '플랜', '커뮤니티', '워크스페이스', 'Sign In'];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const bestRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const closeMenu = () => {
      setIsMenuOpen(false);
    };

    // 'popstate' 이벤트에 대한 리스너 등록 및 메뉴 닫기
    window.addEventListener('popstate', closeMenu);

    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
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
            <Link to={'/login'}><li>Sign In</li></Link>
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
