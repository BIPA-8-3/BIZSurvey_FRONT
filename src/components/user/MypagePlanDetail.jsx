import React, { useState, useEffect } from "react";
import style from "../../style/user/MypagePlanDetail.module.css";
import useFadeIn from "../../style/useFadeIn";
import useApiCall from "../api/ApiCall";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { GiCheckMark } from "react-icons/gi";

import { LuCheck } from "react-icons/lu";

import IconWithText from "../common/IconWithText";

export default function MypagePlanDetail() {
  const { call } = useApiCall();
  const [userInfo, setUserInfo] = useState({ plan: "", nickname: "" });
  const personal = [
    "개인 워크스페이스",
    "설문 커뮤니티 공유",
    "설문지 관리",
    "설문 통계 조회",
  ];
  const group = [
    "개인 워크스페이스",
    "설문 커뮤니티 공유",
    "관리자 초대 기능",
    "워크스페이스 무제한",
    "설문지 관리",
    "설문 통계 조회",
    "외부링크 공유",
  ];

  useEffect(() => {
    call("/user/info", "GET")
      .then((data) => {
        setUserInfo({
          plan: data.planSubscribe,
          nickname: data.nickname,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCheckPlan = () => {};

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
            <li>
              <div className={style.myPlanWrap}>
                <p style={{ textAlign: "center", fontSize: "18px" }}>
                  현재 <b>{userInfo.nickname}</b>님의 플랜은{" "}
                  <b style={{ color: "#154DCA" }}>{userInfo.plan}</b>입니다.
                </p>
              </div>

              <div className={style.wrapPlan}>
                <div className={style.planBox}>
                  <p className={style.planTitle}>개인 플랜</p>
                  <div className={style.textWrap}>
                    <Grid container spacing={1}>
                      {personal.map((text) => (
                        <Grid item xs={6} md={6} lg={6}>
                          <IconWithText
                            text={text}
                            fontsize={"12px"}
                            fontweight={"400"}
                            fontcolor={"#111"}
                          >
                            <GiCheckMark />
                          </IconWithText>
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                  <div>
                    <Button
                      disableElevation
                      variant="contained"
                      sx={{ fontWeight: "bold", backgroundColor: "#154DCA" }}
                    >
                      구독하기
                    </Button>
                  </div>
                </div>
                <div className={style.planBox}>
                  {" "}
                  <p className={style.planTitle}>그룹 플랜</p>
                  <div className={style.textWrap}>
                    <Grid container spacing={1}>
                      {group.map((text) => (
                        <Grid item xs={6} md={6} lg={6}>
                          <IconWithText
                            text={text}
                            fontsize={"12px"}
                            fontweight={"400"}
                            fontcolor={"#111"}
                          >
                            <GiCheckMark />
                          </IconWithText>
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      disableElevation
                      sx={{ fontWeight: "bold", backgroundColor: "#154DCA" }}
                    >
                      구독하기
                    </Button>
                  </div>
                </div>
              </div>
            </li>

            <p className={style.cancel}>
              <span style={{ cursor: "pointer" }}>구독 취소</span>
            </p>
          </ul>
        </div>
      </div>
    </>
  );
}
