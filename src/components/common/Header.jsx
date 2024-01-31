// Header.jsx
import React, { useState, useRef, useEffect, useContext } from "react";
import style from "../../style/Header.module.css";
import logo from "../../assets/img/logo.png";
import { IoMenu } from "react-icons/io5";
import avatar from "../../assets/img/avatar.png";
import { Link, useNavigate,  } from "react-router-dom";
import { LoginContext, LoginFunContext } from "../../App";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const navItems = ["설문 참여", "플랜", "커뮤니티", "워크스페이스", "Sign In"];

function Header() {
  const userInfo = useContext(LoginContext);
  const { setUserInfo } = useContext(LoginFunContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const bestRef = useRef();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("accessToken");
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  useEffect(() => {
    const closeMenu = () => {
      setIsMenuOpen(false);
      setAnchorElUser(null);
    };

    // 컴포넌트 정리 로직을 여기에 추가
    return () => {
      closeMenu(); // 컴포넌트 정리 시 메뉴를 닫음
    };
  }, [navigate]); // Ensure history is in the dependency array

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
    if (window.confirm("로그아웃 하시겠습니까?")) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUserInfo({
        birthdate: "",
        email: "",
        gender: "",
        id: 0,
        name: "",
        nickname: "",
        planSubscribe: "",
        profile: "",
      });
      localStorage.removeItem("userInfo");
      navigate("/");
    }
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div id={style.mainHeader}>
      <div id={style.headerItemWrap}>
        <Link to="/">
          <img src={logo} alt="logo" className={style.logo} />
        </Link>
        <div className={style.headerMenu}>
          <ul>
            <Link to={"/surveyPost"}>
              <li>설문참여</li>
            </Link>
            <Link to={"/plan"}>
              <li>플랜</li>
            </Link>
            <Link to={"/community"}>
              <li>커뮤니티</li>
            </Link>
            <Link to={"/workspace"}>
              <li>워크스페이스</li>
            </Link>
            {isLoggedIn ? (
              // 로그인 상태일 때 표시되는 링크
              <li style={{ padding: "0px", paddingLeft: "10px" }}>
                <div className={style.photo} onClick={handleOpenUserMenu}>
                  <img
                    className=""
                    src={userInfo.profile ? `https://${userInfo.profile}` : avatar}
                    alt="프로필 이미지"
                  />
                </div>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <Link to={"/mypage"}>
                    <MenuItem onClick={handleCloseUserMenu} sx={{ width: "150px" }} >
                      <Typography textAlign="center" onClick={handleLinkClick}>마이페이지</Typography>
                    </MenuItem>
                  </Link>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center" onClick={handleLinkClick}>로그아웃</Typography>
                  </MenuItem>
                </Menu>
              </li>
            ) : (
              // 비로그인 상태일 때 표시되는 링크
              <Link to={"/login"}>
                <li style={{ padding: "0px", paddingLeft: "10px" }}>로그인</li>
              </Link>
            )}
          </ul>
        </div>
        <div id="menuIcon" onClick={toggleMenu}>
          <IoMenu style={{ fontSize: "36px", paddingTop: "3px", color: "#243579" }} />
        </div>
      </div>

      <div className={style.mobileMenu}>
        {isMenuOpen && <div className={style.back} onClick={toggleMenu}></div>}
        <div ref={bestRef} className={style.mobileMenuItemWrap}>
          <Link to={"/"} onClick={handleLinkClick}><img src={logo} alt="logo" className={style.logo} style={{ height: "auto" }} /></Link>
          {/* <div className={style.mobileLoginWrap}>
            <div className={style.mobileLoginBtnWrap}>
                <Link to={"/login"} onClick={handleLinkClick}><div>로그인</div></Link>
                <Link to={"/join"} onClick={handleLinkClick}><div>회원가입</div></Link>
            </div>
          </div> */}

          {isLoggedIn ? (
              // 로그인 상태일 때 표시되는 링크
              <div className={style.mobileLoginBtnWrap2} onClick={handleOpenUserMenu}>
                <div className={style.photo} >
                    <img
                      className=""
                      src={userInfo.profile ? `https://${userInfo.profile}` : avatar}
                      alt="프로필 이미지"
                    />
                    
                </div>
                <p className={style.mobildLoginNickname}>{userInfo.nickname}</p>
              </div>
            ) : (
            <div className={style.mobileLoginWrap}>
              <div className={style.mobileLoginBtnWrap}>
                  <Link to={"/login"} onClick={handleLinkClick}><div>로그인</div></Link>
                  <Link to={"/join"} onClick={handleLinkClick}><div>회원가입</div></Link>
              </div>
            </div>
            )}
          <ul>
            <Link to={"/surveyPost"} onClick={handleLinkClick}>
              <li>설문참여</li>
            </Link>
            <Link to={"/plan"} onClick={handleLinkClick}>
              <li>플랜</li>
            </Link>
            <Link to={"/community"} onClick={handleLinkClick}>
              <li>커뮤니티</li>
            </Link>
            <Link to={"/workspace"} onClick={handleLinkClick}>
              <li>워크스페이스</li>
            </Link>
            {/* <Link to={"/login"} onClick={handleLinkClick}>
              <li>Sign In</li>
            </Link> */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
