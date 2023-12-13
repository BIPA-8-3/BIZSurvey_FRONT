import React, { useState, useEffect } from "react";
import style from "../../style/user/MypageSurveyList.module.css";
import useFadeIn from "../../style/useFadeIn";
import useApiCall from "../api/ApiCall";

export default function MypagePlanDetail() {
  const { call } = useApiCall();
  const [plan, setPlan] = useState("");

  useEffect(() => {
    call("/user/plan", "GET")
      .then((data) => {
        console.log(data.planSubscribe);
        // setPlan(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div className={style.mypageUserInfoWrap}>
        <div>
          <ul className={style.mypageUserInfo}>
            <li className={style.MypageSurveyLi}>
              <div>
                <span>플랜 구독</span>
              </div>
            </li>
            <div>여기</div>
          </ul>
        </div>
      </div>
    </>
  );
}
