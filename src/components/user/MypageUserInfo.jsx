// Header.jsx
import React from 'react';
import style from '../../style/user/MypageUserInfo.module.css'
import logo from '../../assets/img/logo.png'
import useFadeIn from '../../style/useFadeIn';
import avatar from '../../assets/img/avatar.png'
import { Link } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import IconWithText from '../common/IconWithText';
import { IoIosMail } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import { LuMailOpen } from "react-icons/lu";
function MypageUserInfo({userData, setEditState}) {
  const fadeIn = useFadeIn();


  const handleEditBtn = () => {
    setEditState(true);
  }

  

  return (
    
      <div className={style.mypageUserInfoWrap}>
          <div>
            <ul className={style.mypageUserInfo}>
                <li style={{display:'flex', justifyContent:'space-between'}}>
                    <div>
                        <span>내 프로필</span>
                    </div>
                    <div>
                        <button onClick={handleEditBtn}>수정</button>
                    </div>
                </li>
                <li>
                    <FaRegUser style={{fontSize:'16px', color : '#ddd'}}/>
                    <span>{userData.name}</span>
                </li>
                <li>
                    <FaRegUser style={{fontSize:'16px', color : '#ddd'}}/>
                    <span>{userData.email}</span>
                </li>
                <li>
                    <FaRegUser style={{fontSize:'16px', color : '#ddd'}}/>
                    <span>{userData.birthdate}</span>
                </li>
                <li>
                    <FaRegUser style={{fontSize:'16px', color : '#ddd'}}/>
                    <span>{userData.nickname}</span>
                </li>
            </ul>
          </div>
      </div>
  );
}

export default MypageUserInfo;
