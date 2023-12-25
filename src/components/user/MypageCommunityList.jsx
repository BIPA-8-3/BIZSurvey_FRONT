import React, {useState, useEffect} from 'react';
import style from '../../style/user/MypageSurveyList.module.css'
import useFadeIn from '../../style/useFadeIn';
import { Link } from "react-router-dom";
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { MdDateRange } from 'react-icons/md';
import call from '../../pages/workspace/api';

function MypageCommunityList({userData, setEditState}) {
  const fadeIn = useFadeIn();

  const handleEditBtn = () => {
    setEditState(true);
  }

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
                <li className={`${style.MypageSurveyLi} ${style.mypageLiFirst}`}>
                    <div>
                        <span>커뮤니티</span>
                    </div>
                </li> 
                {communityList.length > 0 ? (
                  communityList.map((communityItem) => (
                    <Link to={'/communityDetail'} state={{postId : communityItem.postId}} key={communityItem.postId}>
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
                                      <span style={{ margin: '0 5px 0 5px', display:'inline-block', width:'65px'}}>{formatDateTime(communityItem.createTime)}</span>
                                  </div>
                              </div>
                          </div>
                      </li>
                    </Link>
                  ))
                ):(
                  <li className={style.MypageSurveyLi}>
                      내역이 없습니다.
                  </li>
                )}
            </ul>
          </div>
      </div>
  );
}

export default MypageCommunityList;
