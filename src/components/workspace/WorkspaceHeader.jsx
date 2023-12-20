// Header.jsx
import React, { useState, useRef, useEffect } from "react";
import style from "../../style/workspace/WorkspaceHeader.module.css";
import logo from "../../assets/img/logo-2.png";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MdExitToApp } from "react-icons/md";
import { useWorkspaceContext } from "../../pages/workspace/WorkspaceContext";

const navItems = ["설문 참여", "플랜", "커뮤니티", "워크스페이스", "Sign In"];

function WorkspaceHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const bestRef = useRef();
  const { permission } = useWorkspaceContext();

  useEffect(() => {
    if (!permission) {
      return;
    }

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
        <Link to="/workspace">
          <img src={logo} alt="logo" className={style.logo} />
        </Link>
        <div className={style.headerMenu}>
          <ul>
            <Link to={"/"}>
              <li>
                <div className={style.navIconBox}>
                  <MdExitToApp className={style.navIcon} />
                </div>
              </li>
            </Link>
          </ul>
        </div>
        <div id="menuIcon" onClick={toggleMenu}>
          <IoMenu style={{ fontSize: "36px", paddingTop: "3px", color: "#243579" }} />
        </div>
      </div>

      <div className={style.mobileMenu}>
        {isMenuOpen && <div className={style.back} onClick={toggleMenu}></div>}
        <div ref={bestRef} className={style.mobileMenuItemWrap}>
          <img src={logo} alt="logo" className={style.logo} style={{ height: "auto" }} />
          <ul>
            <Link to={"/surveyPost"}>
              <li>설문참여</li>
            </Link>
            <Link to={"/login"}>
              <li>플랜</li>
            </Link>
            <Link to={"/login"}>
              <li>커뮤니티</li>
            </Link>
            <Link to={"/login"}>
              <li>워크스페이스</li>
            </Link>
            <Link to={"/login"}>
              <li>Sign In</li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default WorkspaceHeader;
