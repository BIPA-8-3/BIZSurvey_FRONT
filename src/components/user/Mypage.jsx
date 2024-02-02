import React, { useState, useEffect } from "react";
import style from "../../style/user/MypageHeader.module.css";
import back from "../../assets/img/back.png";
import useFadeIn from "../../style/useFadeIn";
import call from '../../pages/workspace/api';

import MypageHeader from "./MypageHeader";
import MypageUserInfo from "./MypageUserInfo";
import UserInfoEditForm from "./UserInfoEditForm";

function Mypage() {
  const fadeIn = useFadeIn();
  const [userData, setUserData] = useState({});
  const [editState, setEditState] = useState(false);

  useEffect(() => {
    call("/user/info", "GET")
      .then((data) => {
        setUserData(data);
      }).catch((error) => {
        setUserData({}); 
      });
  }, []);
  return (
    <div id={style.joinWrap} className={`fade-in ${fadeIn ? "active" : ""}`}>
      <div style={{ display: "flex" }} className={style.mypageWrapMobile}>
        <MypageHeader userData={userData} />
        <div style={{ background: "#fff", flex: "1", marginTop: "-54px" }}>
          {editState ? (
            <UserInfoEditForm
              userData={userData}
              setEditState={setEditState}
              setUserData={setUserData}
            />
          ) : (
            <MypageUserInfo userData={userData} setEditState={setEditState} />
          )}
        </div>
      </div>
      <img src={back} alt="배경" className={style.back} />
    </div>
  );
}

export default Mypage;
