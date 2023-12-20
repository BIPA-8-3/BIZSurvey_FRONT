import React, { useState, useEffect } from "react";
import style from "../../style/user/MypageSurveyList.module.css";
import back from "../../assets/img/back.png";
import useFadeIn from "../../style/useFadeIn";
import call from '../../pages/workspace/api';

import MypageHeader from "./MypageHeader";
import MypageUserInfo from "./MypageUserInfo";
import MypageCommunityList from "./MypageCommunityList";
import MypagePlanDetail from "./MypagePlanDetail";

export default function MypagePlan() {
  const fadeIn = useFadeIn();
  const [userData, setUserData] = useState({});
  const [editState, setEditState] = useState(false);

  useEffect(() => {
    const response = call("/user/info", "GET")
      .then((data) => {
        console.log(data);
        setUserData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div id={style.joinWrap} className={`fade-in ${fadeIn ? "active" : ""}`}>
        <div style={{ display: "flex" }}>
          <MypageHeader userData={userData} />
          <div style={{ background: "#fff", flex: "1", marginTop: "-54px" }}>
            {/* <MypageCommunityList userData={userData} /> */}
            <MypagePlanDetail />
          </div>
        </div>
        <img src={back} alt="배경" className={style.back} />
      </div>
    </>
  );
}
