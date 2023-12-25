import React, { useState, useEffect } from "react";
import style from "../../style/user/Join.module.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import back from "../../assets/img/back.png";
import useFadeIn from "../../style/useFadeIn";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

import { useForm } from "react-hook-form";
import call from "../../pages/workspace/api";

function Join({
  onSubmit = async (data) => {
    alert(JSON.stringify(data));
  },
}) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
    setError,
    watch,
    trigger,
    getValues,
  } = useForm();

  const password = watch("password", "");
  const passwordConfirm = watch("passwordConfirm", "");

  // 비밀번호 확인 함수
  const validatePasswordConfirm = (value) => {
    return value === password || "비밀번호가 일치하지 않습니다.";
  };

  // 필드의 Blur 이벤트 핸들러
  const handleBlur = async (fieldName) => {
    // 필드의 유효성 검사 트리거
    await trigger(fieldName);

    // 비밀번호나 비밀번호 확인 필드 중 하나가 수정될 때마다 일치 여부 확인
    if (fieldName === "password" || fieldName === "passwordConfirm") {
      setError("passwordConfirm", {
        type: "manual",
        message: validatePasswordConfirm(passwordConfirm),
      });
    }
  };

  const [countdown, setCountdown] = useState(180); // 초 단위로 설정 (3분 = 180초)
  const [isCounting, setIsCounting] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  let timer;
  // useEffect를 사용하여 카운트다운 감소 및 입력 필드 활성화/비활성화 처리
  useEffect(() => {
    if (isCounting) {
      setIsInputDisabled(false); // 인증번호 전송 후 입력 필드 비활성화

      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 0) {
            clearInterval(timer);
            setIsCounting(false);
            setIsInputDisabled(true); // 카운트다운 종료 후 입력 필드 활성화
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isCounting, isInputDisabled]);
  const [loading, setLoading] = useState(false);
  const handleVerificationCodeSend = async () => {
    const emailValue = getValues("email");

    setLoading(true);

    call("/signup/send-email", "POST", {
      email: emailValue,
    })
      .then((data) => {
        // 전송 성공 시 카운트다운 시작
        setCountdown(180); // 초기화
        setIsCounting(true);
        setIsInputDisabled(true); // 인증번호 전송 후 입력 필드 비활성화
        setIsButtonDisabled(false);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.data.errorCode === 600) {
          setLoading(false);
          alert(error.response.data.errorMessage);
          setIsCounting(false);
          setIsInputDisabled(true); // 전송 실패 시 다시 입력 필드 활성화
        }
      });
  };
  const [isNumberCheck, setNumberCheck] = useState(false);
  const handleCode = async () => {
    const emailValue = getValues("email");
    const emailNumber = (getValues("number") ?? "").trim();

    if (emailNumber != "") {
      call("/signup/check-authnumber", "POST", {
        email: emailValue,
        authNumber: emailNumber,
      })
        .then((data) => {
          setIsButtonDisabled(true);
          setNumberCheck(true);
          setIsCounting(false);
          setIsInputDisabled(true);
          alert("인증되었습니다.");
        })
        .catch((error) => {
          if (error.response.data.errorCode === 600) {
            setError("number", {
              type: "manual",
              message: "인증번호를 확인해주세요",
            });
            setNumberCheck(false);
          }
        });
    } else {
      alert("인증번호를 입력해주세요.");
    }
  };
  const [isNinknameCheck, setNinknameCheck] = useState(false);
  const handleNickname = async () => {
    const getNickname = (getValues("nickname") ?? "").trim();

    if (getNickname != "") {
      call("/signup/check-nickname", "POST", {
        nickname: getNickname,
      })
        .then((response) => {
          alert(response);
          setNinknameCheck(true);
        })
        .catch((error) => {
          if (error.response.data.errorCode === 600) {
            setError("nickname", {
              type: "manual",
              message: "이미 사용중인 닉네임입니다.",
            });
            setNinknameCheck(false);
          }
        });
    }
  };

  const navigate = useNavigate();
  const handleSubmitFunction = handleSubmit(async (data, event) => {
    // 전송을 막을 조건을 추가
    if (!isNumberCheck) {
      alert("인증 확인 필요");
      setError("number", {
        type: "manual",
        message: "인증 번호를 확인해주세요",
      });
    }
    if (!isNinknameCheck) {
      alert("인증 확인 필요");
      setError("nickname", {
        type: "manual",
        message: "닉네임 중복확인을 해주세요",
      });
    } else {
      call("/signup", "POST", data)
        .then((response) => {
          alert(response);
          navigate("/login");
        })
        .catch((error) => {
          if (error.response.data.errorCode === 600) {
            alert("xx");
          }
        });
    }
  });

  const handleNicknameEdit = () => {
    setNinknameCheck(false);
  };

  const fadeIn = useFadeIn();

  return (
    <div id={style.joinWrap} className={`fade-in ${fadeIn ? "active" : ""}`}>
      {loading && (
        <div className="customLoadingWrap">
          <CircularProgress size="100px" />
        </div>
      )}
      <form onSubmit={handleSubmitFunction}>
        <div className={style.titleWrap}>
          <h1 className="textCenter title textBold">회원가입</h1>
          <p className="textCenter subTitle">
            <b>BIZ SURVEY</b>에 오신 것을 환영합니다.
          </p>
        </div>

        <label htmlFor="email">
          이메일<span className={style.labelSpan}>*</span>
        </label>
        {errors.email && (
          <small role="alert" className={style.joinError}>
            {errors.email.message}
          </small>
        )}
        <div className={style.inputWrap}>
          <div className={style.inputDiv}>
            <input
              type="text"
              className={style.input}
              id="email"
              name="email"
              aria-invalid={
                isSubmitted ? (errors.email ? "true" : "false") : undefined
              }
              {...register("email", {
                required: "필수 정보입니다.",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "이메일 형식에 맞지 않습니다.",
                },
              })}
              onBlur={() => handleBlur("email")}
            />
          </div>
          <div className={style.inputBtn} onClick={handleVerificationCodeSend}>
            인증번호 전송
          </div>
        </div>

        <label htmlFor="number">
          인증번호<span className={style.labelSpan}>*</span>
        </label>
        {errors.number && (
          <small role="alert" className={style.joinError}>
            {errors.number.message}
          </small>
        )}
        <div className={style.inputWrap}>
          <div className={style.inputDiv}>
            <input
              type="text"
              className={style.input}
              id="number"
              name="number"
              aria-invalid={
                isSubmitted ? (errors.number ? "true" : "false") : undefined
              }
              {...register("number", {
                required: "이메일 인증을 진행해주세요",
              })}
              onBlur={() => handleBlur("number")}
              disabled={isInputDisabled} // 상태에 따라 입력 필드 활성화/비활성화
            />
            {isCounting
              ? `${Math.floor(countdown / 60)}:${countdown % 60}`
              : ""}
          </div>
          {/* 상태에 따라 버튼 내용 변경 */}

          <div
            className={style.inputBtn}
            onClick={isButtonDisabled ? null : handleCode}
          >
            인증번호 확인
          </div>
        </div>

        <label htmlFor="password">
          비밀번호<span className={style.labelSpan}>*</span>
        </label>
        {errors.password && (
          <small role="alert" className={style.joinError}>
            {errors.password.message}
          </small>
        )}
        <div className={style.inputWrap}>
          <div className={`${style.inputDiv} ${style.input100}`}>
            <input
              type="password"
              className={style.input}
              id="password"
              {...register("password", {
                required: "비밀번호를 입력하세요.",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
                  message: "8~16자 영문 소문자, 숫자, 특수문자를 사용하세요.",
                },
              })}
              onBlur={() => handleBlur("password")}
            />
          </div>
        </div>

        <label htmlFor="passwordConfirm">
          비밀번호 확인<span className={style.labelSpan}>*</span>
        </label>
        {errors.passwordConfirm && (
          <small role="alert" className={style.joinError}>
            {errors.passwordConfirm.message}
          </small>
        )}
        <div className={style.inputWrap}>
          <div className={`${style.inputDiv} ${style.input100}`}>
            <input
              type="password"
              className={style.input}
              id="passwordConfirm"
              {...register("passwordConfirm", {
                required: "비밀번호를 확인하세요.",
                validate: (value) =>
                  value === password || "비밀번호가 일치하지 않습니다.",
              })}
              onBlur={() => handleBlur("passwordConfirm")}
            />
          </div>
        </div>
        <label htmlFor="name">
          이름<span className={style.labelSpan}>*</span>
        </label>
        {errors.name && (
          <small role="alert" className={style.joinError}>
            {errors.name.message}
          </small>
        )}
        <div className={style.inputWrap}>
          <div className={`${style.inputDiv} ${style.input100}`}>
            <input
              type="text"
              className={style.input}
              id="name"
              aria-invalid={
                isSubmitted ? (errors.name ? "true" : "false") : undefined
              }
              {...register("name", {
                required: "필수 정보입니다.",
              })}
              onBlur={() => handleBlur("name")}
            />
          </div>
        </div>

        <label htmlFor="nickname">
          닉네임<span className={style.labelSpan}>*</span>
        </label>
        {errors.nickname && (
          <small role="alert" className={style.joinError}>
            {errors.nickname.message}
          </small>
        )}
        <div className={style.inputWrap}>
          <div className={style.inputDiv}>
            <input
              type="text"
              className={style.input}
              id="nickname"
              name="nickname"
              aria-invalid={
                isSubmitted ? (errors.nickname ? "true" : "false") : undefined
              }
              {...register("nickname", {
                required: "필수 정보입니다.",
              })}
              onBlur={(e) => {
                handleBlur("nickname");
                handleNicknameEdit(); // 사용자가 닉네임을 수정하면 중복 확인을 위해 호출
              }}
            />
          </div>
          <div className={style.inputBtn} onClick={handleNickname}>
            중복확인
          </div>
        </div>

        <label htmlFor="birthdate">생년월일</label>
        <div className={style.inputWrap}>
          <div className={`${style.inputDiv} ${style.input100}`}>
            <input
              type="date"
              id="birthdate"
              name="birthdate"
              className={style.input}
              {...register("birthdate")}
            />
          </div>
        </div>

        <label htmlFor="gender">
          성별<span className={style.labelSpan}>*</span>
        </label>
        <br />
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="gender"
            id="gender"
            defaultValue="MALE"
          >
            <FormControlLabel
              value="MALE"
              control={<Radio defaultChecked />}
              label="남자"
              {...register("gender")}
            />
            <FormControlLabel
              value="FEMALE"
              control={<Radio />}
              label="여자"
              {...register("gender")}
            />
          </RadioGroup>
        </FormControl>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            marginTop: "40px",
            width: "100%",
            padding: "14.5px 14px",
            backgroundColor: "#243579",
            border: "1px",
            borderRadius: "5px",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          회원가입
        </button>
      </form>
      <img src={back} alt="카카오 로그인" className={style.back} />
    </div>
  );
}

export default Join;
