import React, {useState, useEffect} from 'react';
import style from '../../style/user/MypageSurveyList.module.css'
import useFadeIn from '../../style/useFadeIn';
import { Link } from "react-router-dom";
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { MdDateRange } from 'react-icons/md';
import call from '../../pages/workspace/api';

function MypageSurveyList({userData, setEditState}) {

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
                {communityList.length > 0 ? (
                communityList.map((communityItem) => (
                <Link to={'/surveyCommunityDetail'} state={{postId : communityItem.postId}} key={communityItem.postId}>
                    <li className={style.MypageSurveyLi}>
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
                ))
                ) : (
                <li className={style.MypageSurveyLi}>
                    내역이 없습니다.
                </li>
                )}
            </ul>
          </div>
      </div>
  );
}

export default MypageSurveyList;
