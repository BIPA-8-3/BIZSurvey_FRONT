import React, {useState, useEffect} from 'react';
import style from '../../style/user/MypageSurveyList.module.css'
import back from '../../assets/img/back.png'
import useFadeIn from '../../style/useFadeIn';
import useApiCall from '../api/ApiCall'; 

import MypageHeader from './MypageHeader';
import MypagePasswordChange from './MypagePasswordChange';

function MypagePassword() {
  const fadeIn = useFadeIn();
  const { call } = useApiCall();
  const [userData, setUserData] = useState({});
  const [editState, setEditState] = useState(false);

  useEffect(() => {
    const response = call("/user/info", "GET")
    .then((data) => {
      console.log(data)
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
            <MypagePasswordChange userData={userData}/>
          </div>
        </div>
      <img src={back} alt="배경" className={style.back}/>
    </div>
  );
}

export default MypagePassword;
