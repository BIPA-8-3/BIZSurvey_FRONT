import React, {useState, useEffect} from 'react';
import style from '../../style/user/MypageSurveyList.module.css'
import back from '../../assets/img/back.png'
import useFadeIn from '../../style/useFadeIn';
import call from '../../pages/workspace/api';

import MypageHeader from './MypageHeader';
import MypageSurveyList from './MypageSurveyList';
function MypageSurveyCommunity() {
  const fadeIn = useFadeIn();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const response = call("/user/info", "GET")
    .then((data) => {
      setUserData(data)
    }).catch((error) => {
      console.log(error)
    })
    
  },[]);
  return (
    <div id={style.joinWrap} className={`fade-in ${fadeIn ? 'active' : ''}`}>
        <div style={{display:'flex'}}>
          <MypageHeader userData={userData}/>
          <div style={{background:'#fff', flex: '1', marginTop:'-54px'}}>
            <MypageSurveyList userData={userData}/>
          </div>
        </div>
      <img src={back} alt="배경" className={style.back}/>
    </div>
  );
}

export default MypageSurveyCommunity;
