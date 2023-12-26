import * as React from "react";
import style from "../../style/community/VoteWrite.module.css";
import "../../style/Common.css";
import useFadeIn from "../../style/useFadeIn";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Loader from "../../pages/loader/Loader";
import { useState, useEffect } from "react";
import axios from "axios";
import { FormGroup } from "@mui/material";
import call from "../../pages/workspace/api";
import { useNavigate } from "react-router-dom";

export default function VoteWrite({ postId, voteId, setSubmit }) {
  let vId = voteId;
  let pId = postId;
  const navigate = useNavigate();

  const fadeIn = useFadeIn();

  const [voteData, setVoteData] = useState({
    voteTitle: "",
    answerList: [
      {
        voteAnswerId: 0,
        answer: "",
      },
    ],
  });
  const [loading, setLoading] = useState(false);

  

  const [value, setValue] = React.useState({ selectedKey: 0 });
  const handleChange = (event) => {
    // const selectedValue = event.target.value;

    const selectKey = event.target.value;

    

    setValue({ selectedKey: selectKey }); // 선택된 값을 변수에 설정 ;
  };

  const boxOnClick = async () => {
    if (localStorage.getItem("userInfo")) {
      await call(
        `/community/${pId}/${vId}/choseAnswer/${value.selectedKey}`,
        "GET"
      )
        .then((data) => {
          setSubmit(true);
        })
        .catch((error) => console.error(error));
    } else {
      const res = window.confirm(
        "로그인을 하셔야 투표에 참여하실 수 있습니다. \n로그인 페이지로 이동하시겠습니까?"
      );
      if (res) {
        navigate("/login");
      } else {
        return;
      }
    }
  };

  //localhost:8080/community/30/showVoteAnswer/2

  useEffect(() => {
    // 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        const response = await call(
          `/community/${pId}/showVoteAnswer/${vId}`,
          "GET"
        );
        
        setVoteData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // 데이터 로딩이 끝났음을 표시
      }
    };

    fetchData(); // 함수 호출
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행되도록 함

  if (loading) {
    return (
      <>
        <Loader />
      </>
    ); // 데이터 로딩 중에는 로딩 표시
  }
  if (voteData) {
    return (
      <>
        <div className={style.voteWriteWrap}>
          <div className={style.voteTitleWrap}>
            <h2>
              <span className={style.voteSpan}>투표</span>
              {voteData.voteTitle}
            </h2>
          </div>

          <div className={style.voteContentWrap}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
              >
                {voteData.answerList.map((item) => (
                  <FormControlLabel
                    value={item.voteAnswerId}
                    control={<Radio onChange={handleChange} />}
                    label={item.answer}
                    key={item.voteAnswerId}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>
          <div className={style.btnWrap}>
            <Button
              variant="contained"
              type="submit"
              onClick={boxOnClick}
              sx={[
                {
                  padding: "8px 20px",
                  backgroundColor: "#243579",
                  fontWeight: "bold",
                  marginBottom: "10px",
                  border: "1px solid #243579",
                  boxShadow: 0,
                  marginLeft: "5px",
                },
                {
                  ":hover": {
                    border: "1px solid #1976d2",
                    boxShadow: 0,
                  },
                },
              ]}
            >
              투표하기
            </Button>
          </div>
        </div>
      </>
    );
  }
}
