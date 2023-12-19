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

function MypageSurveyList({userData, setEditState}) {
  const fadeIn = useFadeIn();

  const { call } = useApiCall();
  const [communityList, setCommunityList] = useState([]);

  useEffect(() => {
    call("/user/s-community/list", "GET")
    .then((data) => {
        setCommunityList(data.content);
    }).catch((error) => {
      console.log(error)
    })

  },[]);

  return (
    
      <div className={style.mypageUserInfoWrap}>
          <div>
            <ul className={style.mypageUserInfo}>
                <li className={`${style.MypageSurveyLi} ${style.mypageLiFirst}`}>
                    <div>
                        <span>설문 커뮤니티</span>
                    </div>
                </li>
                {communityList.map((communityItem) => (
                <Link to={'/surveyCommunityDetail'} state={{postId : communityItem.postId}}>
                    <li key={communityItem.postId} className={style.MypageSurveyLi}>
                        <div className={style.MypageSurveyTitle}>{communityItem.title}</div>
                        <div className={style.MypageSurveyDate}>
                            <div className={style.MypageSurveyDate}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
                                    <MdOutlineRemoveRedEye />
                                    <span style={{ margin: '0 5px 0 5px' }}>{communityItem.count}</span>
                                </div>
                                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', marginLeft:'15px'}}>
                                    <MdDateRange />
                                    <span style={{ margin: '0 5px 0 5px' }}>{communityItem.createDate}</span>
                                </div>
                            </div>
                        </div>
                    </li>
                </Link>
                ))}
            </ul>
          </div>
      </div>
  );
}

export default MypageSurveyList;
