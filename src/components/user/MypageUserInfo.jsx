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
function MypageUserInfo() {
  const fadeIn = useFadeIn();
  return (
    
      <div className={style.mypageUserInfoWrap}>
          <div>
            <ul className={style.mypageUserInfo}>
                <li>
                    내 프로필
                </li>
                <li>
                    <FaRegUser style={{fontSize:'16px', color : '#ddd'}}/>
                    <span>홍길동</span>
                </li>
                <li>
                    <FaRegUser style={{fontSize:'16px', color : '#ddd'}}/>
                    <span>404444@naver.com</span>
                </li>
                <li style={{display:'flex', justifyContent:'space-between'}}>
                    <div>
                        <FaRegUser style={{fontSize:'16px', color : '#ddd'}}/>
                        <span>1999-09-09</span>
                    </div>
                    <div>
                        <button>수정</button>
                    </div>
                </li>
                <li style={{display:'flex', justifyContent:'space-between'}}>
                    <div>
                        <FaRegUser style={{fontSize:'16px', color : '#ddd'}}/>
                        <span>눈누난나</span>
                    </div>
                    <div>
                        <button>수정</button>
                    </div>
                </li>
            </ul>
          </div>
      </div>
  );
}

export default MypageUserInfo;
