import React, { useState, useContext } from 'react';
import style from '../../style/user/MypageHeader.module.css';
import logo from '../../assets/img/logo.png';
import avatar from '../../assets/img/avatar.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaPen } from 'react-icons/fa';
import CircularProgress from '@mui/material/CircularProgress';
import { LoginContext, LoginFunContext } from "../../App";
import call from '../../pages/workspace/api';

const getLinkStyle = (currentPage, path) => {
  return {
    fontWeight: currentPage === path ? 'bold' : 'normal',
    borderBottom: currentPage === path ? '2px solid #111' : '0px',
  };
};

function MypageHeader({ userData }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const {setUserInfo} = useContext(LoginFunContext);
  const userInfo = useContext(LoginContext)
  const location = useLocation();
  const currentPage = location.pathname;

  
  const handleImageChange = async (event) => {
    setLoading(true);
    const file = event.target.files[0];

    
    

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('domain', 'USER');
        
      call("/storage/", "POST", formData, true).then((data) =>{
          call("/user/profile/", "patch", {
            userId : userData.id,
            profile : data
          }).then(() =>{
              call("/user/info", "GET").then((data)=>{
                setUserInfo(data);
              });

              setLoading(false);
          })
      })
        
    }
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
    <div className={style.mypageHeader}>
      {loading && (
        <div className="customLoadingWrap">
          <CircularProgress size="100px" />
        </div>
      )}
      <Link to="/">
        <img src={logo} alt="logo" className={style.logo} />
      </Link>
      <div className={style.mypageUser}>
        <div className={style.profil}>
          <div style={{ position: 'relative', width: '150px', margin: '0 auto' }}>
            <div className={style.photo}>
              {selectedImage ? (
                <img className="" src={selectedImage} alt="선택된 아바타" />
              ) : (
                <img className="" src={userData.profile ? `https://${userData.profile}` : avatar} alt="프포필 이미지" />
              )}
            </div>
            <label htmlFor="avatarInput" className={style.profilePen}>
              <FaPen />
            </label>
            <input
              type="file"
              id="avatarInput"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </div>
          <p className={style.nickname}>{userData.nickname}</p>
          <p className={style.email}>{userData.email}</p>
        </div>
      </div>
      <div className={style.mypageMenu}>
        <ul>
          <li>
            <span style={getLinkStyle(currentPage, '/mypage')}>
              <Link to="/mypage">내 프로필</Link>
            </span>
          </li>
          <li>
            <span style={getLinkStyle(currentPage, '/mypageSurveyCommunity')}>
              <Link to="/mypageSurveyCommunity">설문 커뮤니티 관리</Link>
            </span>
          </li>
          <li>
            <span style={getLinkStyle(currentPage, '/mypageCommunity')}>
              <Link to="/mypageCommunity">커뮤니티 관리</Link>
            </span>
          </li>
          <li>
            <span style={getLinkStyle(currentPage, '/mypagePassword')}>
              <Link to="/mypagePassword">비밀번호 변경</Link>
            </span>
          </li>
          <li>
            <span style={getLinkStyle(currentPage, '/mypagePlan')}>
              <Link to="/mypagePlan">플랜 구독</Link>
            </span>
          </li>
        </ul>
      </div>
      <p className={style.mypageLogout} onClick={handleLogout}>로그아웃</p>
    </div>
  );
}

export default MypageHeader;
