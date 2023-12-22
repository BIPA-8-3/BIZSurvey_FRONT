// Header.jsx
import React from 'react';
import style from '../../style/user/MypageUserInfo.module.css'
import useFadeIn from '../../style/useFadeIn';
import { FaRegUser } from "react-icons/fa";

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
