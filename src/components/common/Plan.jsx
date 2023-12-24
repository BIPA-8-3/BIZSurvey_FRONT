import React, { useEffect, useState, useContext } from "react";
import style from "../../style/Plan.module.css";
import back from "../../assets/img/back.png";
import Grid from "@mui/material/Grid";
import IconWithText from "./IconWithText";
import { FaRegStickyNote } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { MdOutlineIosShare } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import { MdGroup, MdWorkspaces } from "react-icons/md";
import { FaLink } from "react-icons/fa6";
import useFadeIn from "../../style/useFadeIn";
import axios from "axios";
import Button from "@mui/material/Button";
import { LoginContext } from "../../App";
import { useNavigate } from "react-router-dom";

function Plan() {
  const fadeIn = useFadeIn();
  const userInfo = useContext(LoginContext);
  const navigate = useNavigate();
  // const handlePlenChange = async (type) => {
  //     let state = window.confirm(getLabelForType(type) + '으로 플랜을 변경하시겠습니까?')

  //     if(state){
  //         try{
  //             const response = await axios.patch(`/plan/${type}`, {}, {
  //                 headers: {
  //                     Authorization: localStorage.getItem("accessToken")
  //                 }
  //             });
  //             alert(response.data)
  //         }catch(error){
  //             alert(error.response.data.errorMessage);
  //         }
  //     }

  // }

  const handleCheckLogin = async () => {
    if (userInfo.id === 0) {
      try {
        const res = await new Promise((resolve) => {
          const result = window.confirm(
            "로그인이 필요한 서비스입니다. \n로그인을 하시겠습니까?"
          );
          resolve(result);
        });

        if (res) {
          navigate("/login");
        }
      } catch (error) {
        console.error("알 수 없는 오류가 발생했습니다.", error);
      }
    } else {
      navigate("/mypagePlan");
    }
  };

  function getLabelForType(type) {
    if (type === "NORMAL_SUBSCRIBE") {
      return "개인플랜";
    } else if (type === "COMPANY_SUBSCRIBE") {
      return "그룹플랜";
    }
    return type;
  }

  return (
    <div className={`fade-in ${fadeIn ? "active" : ""}`}>
      <div className={style.titleWrap}>
        <h1 className="textCenter title textBold">플랜 소개</h1>
        <p className="textCenter subTitle">
          <b>BIZ SURVEY</b>의 워크스페이스를 경험해 보세요!
        </p>
      </div>
      <div className={style.planWrap}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={6} spacing={2}>
            <div className={style.plan}>
              <div
                className={style.planHead}
                style={{ backgroundColor: "#0171D1" }}
              >
                <p>NORMAL PLAN</p>
              </div>
              <div className={style.planBody}>
                <p className={style.subTitle}>개인 플랜</p>
                <div className={style.subText}>
                  <p>
                    개인 구독자를 위한 플랜입니다.
                    <br />
                    자유롭게 설문 양식을 관리하고 공유해보세요.
                  </p>
                </div>
                <div className={style.itemList}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={6} lg={6}>
                      <IconWithText
                        className="item1"
                        text={
                          <>
                            <span className={style.point1}>개인</span>{" "}
                            워크스페이스
                          </>
                        }
                        fontsize={"13px"}
                        fontweight={"400"}
                        fontcolor={"#111"}
                      >
                        <FaRegStickyNote />
                      </IconWithText>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                      <IconWithText
                        text={
                          <>
                            <span className={style.point1}>설문지</span> 관리
                          </>
                        }
                        fontsize={"13px"}
                        fontweight={"400"}
                        fontcolor={"#111"}
                      >
                        <FaPencil />
                      </IconWithText>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                      <IconWithText
                        text={
                          <>
                            설문 커뮤니티{" "}
                            <span className={style.point1}>공유</span>
                          </>
                        }
                        fontsize={"13px"}
                        fontweight={"400"}
                        fontcolor={"#111"}
                      >
                        <MdOutlineIosShare />
                      </IconWithText>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                      <IconWithText
                        text={
                          <>
                            <span className={style.point1}>설문 통계</span> 조회
                          </>
                        }
                        fontsize={"13px"}
                        fontweight={"400"}
                        fontcolor={"#111"}
                      >
                        <FaChartBar />
                      </IconWithText>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                      <IconWithText
                        text={
                          <>
                            <span className={style.point2}>외부링크 공유</span>
                          </>
                        }
                        fontsize={"13px"}
                        fontweight={"400"}
                        fontcolor={"#111"}
                      >
                        <FaLink />
                      </IconWithText>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6} lg={6} spacing={2}>
            <div className={style.plan}>
              <div
                className={style.planHead}
                style={{ backgroundColor: "#243579" }}
              >
                <p>GROUP PLAN</p>
              </div>
              <div className={style.planBody}>
                <p className={style.subTitle}>그룹 플랜</p>
                <div className={style.subText}>
                  <p>
                    여러 사람들과 설문을 공유하기 위한 그룹 플랜입니다.
                    <br />
                    관리자를 초대하여 설문지를 그룹별로 관리하고 공유해보세요.
                  </p>
                </div>
                <div className={style.itemList}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={6} lg={6}>
                      <IconWithText
                        text={
                          <>
                            <span className={style.point2}>개인</span>{" "}
                            워크스페이스
                          </>
                        }
                        fontsize={"13px"}
                        fontweight={"400"}
                        fontcolor={"#111"}
                      >
                        <FaRegStickyNote />
                      </IconWithText>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                      <IconWithText
                        text={
                          <>
                            <span className={style.point2}>설문지</span> 관리
                          </>
                        }
                        fontsize={"13px"}
                        fontweight={"400"}
                        fontcolor={"#111"}
                      >
                        <FaPencil />
                      </IconWithText>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                      <IconWithText
                        text={
                          <>
                            설문 커뮤니티{" "}
                            <span className={style.point2}>공유</span>
                          </>
                        }
                        fontsize={"13px"}
                        fontweight={"400"}
                        fontcolor={"#111"}
                      >
                        <MdOutlineIosShare />
                      </IconWithText>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                      <IconWithText
                        text={
                          <>
                            <span className={style.point2}>설문 통계</span> 조회
                          </>
                        }
                        fontsize={"13px"}
                        fontweight={"400"}
                        fontcolor={"#111"}
                      >
                        <FaChartBar />
                      </IconWithText>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                      <IconWithText
                        text={
                          <>
                            <span className={style.point2}>관리자 초대</span>{" "}
                            기능
                          </>
                        }
                        fontsize={"13px"}
                        fontweight={"400"}
                        fontcolor={"#111"}
                      >
                        <MdGroup />
                      </IconWithText>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                      <IconWithText
                        text={
                          <>
                            <span className={style.point2}>외부링크 공유</span>
                          </>
                        }
                        fontsize={"13px"}
                        fontweight={"400"}
                        fontcolor={"#111"}
                      >
                        <FaLink />
                      </IconWithText>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                      <IconWithText
                        text={
                          <>
                            그룹 워크스페이스{" "}
                            <span className={style.point2}>무제한</span>
                          </>
                        }
                        fontsize={"13px"}
                        fontweight={"400"}
                        fontcolor={"#111"}
                      >
                        <MdWorkspaces />
                      </IconWithText>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
        <div style={{ textAlign: "center", paddingTop: "40px" }}>
          <Button
            variant="contained"
            href="#contained-buttons"
            sx={{
              padding: "11px 30px",
              backgroundColor: "#243579",
              fontWeight: "bold",
              marginBottom: "10px",
              boxShadow: 0,
              width: "150px",
            }}
            onClick={handleCheckLogin}
          >
            플랜 구독하기
          </Button>
        </div>
      </div>
      <img src={back} alt="배경" className={style.back} />
    </div>
  );
}

export default Plan;
