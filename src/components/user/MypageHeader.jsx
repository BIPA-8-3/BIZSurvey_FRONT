import React, { useState, useEffect } from 'react';
import style from '../../style/user/MypageHeader.module.css';
import logo from '../../assets/img/logo.png';
import useFadeIn from '../../style/useFadeIn';
import avatar from '../../assets/img/avatar.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaPen } from 'react-icons/fa';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
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
  const location = useLocation();
  const currentPage = location.pathname;
  
  const handleImageChange = async (event) => {
    setLoading(true);
    const file = event.target.files[0];

    

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);

      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('domain', 'USER');
      
        await axios.post('/storage/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        }).then((data) => {
          console.log(data);
        });
      } catch (error) {
        console.error('클라이언트에서 오류 발생:', error);
      } finally {
        setLoading(false);
        alert('프로필을 수정하였습니다');
      }
    }
  };

  const handleLogout = () => {
    
    if(window.confirm("로그아웃 하시겠습니까?")){
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
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
                <img className="" src={avatar} alt="기본 아바타" />
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
        </ul>
      </div>
      <p className={style.mypageLogout} onClick={handleLogout}>로그아웃</p>
    </div>
  );
}

export default MypageHeader;
