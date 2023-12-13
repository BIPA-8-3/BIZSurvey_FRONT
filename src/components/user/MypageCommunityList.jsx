import React, {useState, useEffect} from 'react';
import style from '../../style/user/MypageSurveyList.module.css'
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
import { BiComment } from 'react-icons/bi';
import { IoPersonOutline } from 'react-icons/io5';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { MdDateRange } from 'react-icons/md';
import useApiCall from '../api/ApiCall'; 

function MypageCommunityList({userData, setEditState}) {
  const fadeIn = useFadeIn();

  const handleEditBtn = () => {
    setEditState(true);
  }

  const { call } = useApiCall();
  const [communityList, setCommunityList] = useState([]);

  useEffect(() => {
    call("/user/community/list", "GET")
    .then((data) => {
        setCommunityList(data.content);
    }).catch((error) => {
      console.log(error)
    })

  },[]);

  const formatDateTime = (dateTimeString) => {
    const year = dateTimeString.slice(0, 4);
    const month = dateTimeString.slice(4, 6);
    const day = dateTimeString.slice(6, 8);
  
    const formattedDate = `${year}-${month}-${day}`;
  
    return `${formattedDate}`;
  };
  return (
    
      <div className={style.mypageUserInfoWrap}>
          <div>
            <ul className={style.mypageUserInfo}>
                <li className={style.MypageSurveyLi}>
                    <div>
                        <span>커뮤니티</span>
                    </div>
                </li>
                {communityList.map((communityItem) => (
                <li className={style.MypageSurveyLi}>
                    
                    <div className={style.MypageSurveyTitle}>{communityItem.title}</div>
                    <div className={style.MypageSurveyDate}>
                        <div className={style.MypageSurveyDate}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
                                <MdOutlineRemoveRedEye />
                                <span style={{ margin: '0 5px 0 5px' }}>00</span>
                            </div>
                            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', marginLeft:'15px'}}>
                                <MdDateRange />
                                <span style={{ margin: '0 5px 0 5px', display:'inline-block', width:'65px'}}>{formatDateTime(communityItem.createTime)}</span>
                            </div>
                        </div>
                    </div>
                </li>
                ))}
            </ul>
          </div>
      </div>
  );
}

export default MypageCommunityList;
