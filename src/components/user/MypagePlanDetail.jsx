import React, { useState, useEffect } from "react";
import style from "../../style/user/MypagePlanDetail.module.css";
import useFadeIn from "../../style/useFadeIn";
import useApiCall from "../api/ApiCall";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { GiCheckMark } from "react-icons/gi";
import axios from "axios";
import { LuCheck } from "react-icons/lu";
import Loader from "../../pages/loader/Loader";
import IconWithText from "../common/IconWithText";

export default function MypagePlanDetail() {
  const { call } = useApiCall();
  const [userInfo, setUserInfo] = useState({ plan: "", nickname: "" });
  const [loading, setLoading] = useState(false);

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
        let userPlan = "";
        if (data.planSubscribe === "COMMYNITY") {
          userPlan = "커뮤니티 회원";
        } else if (data.planSubscribe === "NORMAL_SUBSCRIBE") {
          userPlan = "개인 플랜";
        } else if (data.planSubscribe === "COMPANY_SUBSCRIBE") {
          userPlan = "그룹 플랜";
        } else {
          userPlan = "커뮤니티 회원";
        }
        setUserInfo({
          plan: userPlan,
          nickname: data.nickname,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  // 로컬 스토리지에 엑세스 토큰 저장
  const saveAccessTokenToLocalStorage = (token) => {
    localStorage.setItem("accessToken", token);
  };


  const handleSubscribe = (planName) => {
    const con = window.confirm(planName + "으로 변경하시겠습니까?");
    if (!con) {
      return;
    }

    setLoading(true);

    
    if (userInfo.plan === "커뮤니티 회원") {
      // get
      console.log("여기ㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣ");

      call("/workspace/personal", "GET")
        .then((data) => {
          console.log("asssssssssssss", data);
          if (!data) {
            const newData = {
              workspaceName: userInfo.nickname + "님 워크스페이스",
              workspaceType: "PERSONAL",
            };
            return call("/workspace", "POST", newData);
          }
          return null;
        })
        .then(async(data) => {
          const name =
            planName === "개인 플랜" ? "NORMAL_SUBSCRIBE" : "COMPANY_SUBSCRIBE";

          try{
            const response = await axios.patch(`/plan/${name}`, {}, {
                headers: {
                  Authorization: localStorage.getItem("accessToken")
                }
            });
      
            if (response.status === 200) {
              const headers = response.headers;
              const authorization = headers["authorization"];
              saveAccessTokenToLocalStorage(authorization);
              window.location.reload();
              // navigate("/");
            }
          }catch(error){
              alert(error)
          }
        })
        .catch((error) => console.log(error))
        .finally(() => window.location.reload());
    } else {
      const name =
        planName === "개인 플랜" ? "NORMAL_SUBSCRIBE" : "COMPANY_SUBSCRIBE";
        console.log("name,,,,,,,,,", name);

        axios.patch(`/plan/${name}`, {}, {
            headers: {
              Authorization: localStorage.getItem("accessToken")
            }
        }).then((response) => {
                const headers = response.headers;
                const authorization = headers["authorization"];
                saveAccessTokenToLocalStorage(authorization);
                window.location.reload();
        });
  
    }
    setLoading(false);
  };

  const handleCancelPlan = async() => {
    const con = window.confirm("구독을 취소하시겠습니까?");
    if (!con) {
      return;
    }
    setLoading(true);
    // call("/plan/COMMUNITY", "PATCH")
    //   .then((data) => console.log(data))
    //   .catch((error) => console.log(error))
    //   .finally(() => {
    //     setLoading(false);
    //     window.location.reload();
    //   });

    try{
      const response = await axios.patch(`/plan/COMMUNITY`, {}, {
          headers: {
            Authorization: localStorage.getItem("accessToken")
          }
      });

      if (response.status === 200) {
        const headers = response.headers;
        const authorization = headers["authorization"];
        saveAccessTokenToLocalStorage(authorization);
        window.location.reload();
      }
    }catch(error){
        alert(error)
    }
  };

  return (
    <>
      {loading ? <Loader /> : null}
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
                  현재 <b>{userInfo.nickname}</b>님은{" "}
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
                      disabled={userInfo.plan === "개인 플랜" ? true : false}
                      disableElevation
                      variant="contained"
                      sx={{ fontWeight: "bold", backgroundColor: "#154DCA" }}
                      onClick={() => handleSubscribe("개인 플랜")}
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
                      disabled={userInfo.plan === "그룹 플랜" ? true : false}
                      variant="contained"
                      disableElevation
                      sx={{ fontWeight: "bold", backgroundColor: "#154DCA" }}
                      onClick={() => handleSubscribe("그룹 플랜")}
                    >
                      구독하기
                    </Button>
                  </div>
                </div>
              </div>
            </li>
            {userInfo.plan !== "커뮤니티 회원" ? (
              <p className={style.cancel}>
                <span style={{ cursor: "pointer" }} onClick={handleCancelPlan}>
                  구독 취소
                </span>
              </p>
            ) : (
              <></>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
