// Header.jsx
import React, { useState, useRef, useEffect } from 'react';
import style from "../../style/Header.module.css";
import logo from '../../assets/img/logo.png'
import { IoMenu } from "react-icons/io5";
import { RiSurveyLine } from "react-icons/ri";

const navItems = ['설문 참여', '플랜', '커뮤니티', '워크스페이스', 'Sign In'];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const bestRef = useRef();

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

  return (
    <div id={style.mainHeader}>
      <div id={style.headerItemWrap}>
        <img src={logo} alt="logo" className={style.logo}/>
        <div className={style.headerMenu}>
          <ul>
            {navItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
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
            {navItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;