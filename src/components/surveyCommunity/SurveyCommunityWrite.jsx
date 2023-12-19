import React, { useMemo, useRef, useState, useEffect } from "react";
import style from "../../style/surveyCommunity/SurveyCommunityWrite.module.css";
import "../../style/Common.css";
import useFadeIn from "../../style/useFadeIn";
import back from "../../assets/img/back.png";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import SurveyListModal from "./SurveyListModal";
import axios from "axios";
import call from '../../pages/workspace/api';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Divider, TextField, Input } from "@mui/material";
import logo from "../../assets/img/설문 기본 사진.png";
import { useLocation } from "react-router-dom";

// import CreateVote from './CreateVote';
// import RegisterVote from './RegisterVote'

export default function CommunityWrite() {
  const [data, setData] = useState([]);
  const [selectedSurvey, setSurvey] = useState(null);
  const [selectedFile, setSelectedFile] = useState("");
  const fileInputRef = useRef();

  const location = useLocation();
  let surveyId = location.state ? location.state.surveyId : 0;

  useEffect(() => {
    console.log(data);
    if (data.length > 0 && surveyId !== 0) {
      const surveyData = data.find((dt) => dt.surveyId === surveyId);
      setSurvey(surveyData);
    }
  }, [data]);

  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    // 파일 선택 후의 로직을 처리합니다.
    console.log("Selected File:", file); // 넘겨받은 이미지

    const formData = new FormData();
    formData.append("file", file); // formData는 키-밸류 구조
    formData.append("domain", "SURVEY_THUMB");
    // 백엔드 multer라우터에 이미지를 보낸다.
    try {
      const result = await axios.post(
        "http://localhost:8080/storage/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("성공 시, 백엔드가 보내주는 데이터", result.data);
      const HEAD_IMG_URL = "https://";
      const IMG_URL = HEAD_IMG_URL + result.data;

      alert(JSON.stringify(IMG_URL));
      setSelectedFile(IMG_URL);

      
    } catch (error) {
      console.log("실패했어요ㅠ");
    }
  };

  useEffect(() => {
    // 데이터를 가져오는 비동기 함수
    const fetchData = async () => {
      try {
        call("/s-community/survey/list", "GET")
        .then((response) => {
          setData(response);
        });
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };

    // fetchData 함수 실행
    fetchData();
  }, []);

  function renderModal() {
    if (selectedSurvey === null) {
      const setName = "설문 등록";

      return (
        <>
          <p>비즈서베이의 설문 기능을 이용해보세요!</p>
          <p>
            워크스페이스에서 생성한 설문지를 추가해 설문지를 공유할 수 있습니다.
          </p>
          <SurveyListModal
            props={{ list: data, setSurvey: setSurvey, title: setName }}
          />
        </>
      );
    } else {
      // 설문지가 선택된 경우

      const setName = "설문 등록 변경";

      return (
        <>
          <SurveyListModal
            props={{ list: data, setSurvey: setSurvey, title: setName }}
          />
        </>
      );
    }
  }

  function returnImgUrl() {
    return selectedFile || logo;
  }

  function renderBox() {
    if (selectedSurvey !== null) {
      return (
        <>
          <Box
            sx={{
              display: "flex",
              border: "1px solid lightblue", // 항상 테두리를 표시
              borderRadius: "8px", // 테두리를 둥글게 만들기
              overflow: "hidden", // 테두리를 넘어가는 내용 숨김
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // 투영(튀어나온 효과) 추가
              margin: "auto",
              width: "700px",
            }}
          >
            {/* 좌측 이미지 */}
            <Box
              component="img"
              src={returnImgUrl()}
              sx={{ width: "200px", height: "auto" }}
            />

            {/* 나머지 내용 */}
            <Box sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>
                {selectedSurvey.title}
              </Typography>
              <Typography variant="body1">
                워크스페이스 : {selectedSurvey.workspaceName} <Divider />
                작성자 닉네임 : {selectedSurvey.nickname}
              </Typography>
            </Box>
          </Box>
        </>
      );
    }
  }

  function renderImgForm() {
    return (
      <>
        <p>설문 등록을 하셨다면 설문 게시물의 썸네일 이미지를 작성해주세요!</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <button onClick={handleUpload}>이미지 등록</button>
      </>
    );
  }

  const quillRef = useRef();
  const [content, setContent] = useState("");
  const fadeIn = useFadeIn();

  const imageSrcArray = [];
  const [title, setTitle] = useState("");

  const imageHandler = () => {
    console.log("에디터에서 이미지 버튼을 클릭하면 이 핸들러가 시작됩니다!");

    // 1. 이미지를 저장할 input type=file DOM을 만든다.
    const input = document.createElement("input");
    // 속성 써주기
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click(); // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.
    // input이 클릭되면 파일 선택창이 나타난다.

    // input에 변화가 생긴다면 = 이미지를 선택
    input.addEventListener("change", async () => {
      console.log("온체인지");
      const file = input.files[0];
      // multer에 맞는 형식으로 데이터 만들어준다.
      const formData = new FormData();
      formData.append("file", file); // formData는 키-밸류 구조
      formData.append("domain", "COMMUNITY");
      // 백엔드 multer라우터에 이미지를 보낸다.
      try {
        const result = await axios.post(
          "http://localhost:8080/storage/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("성공 시, 백엔드가 보내주는 데이터", result.data);
        const HEAD_IMG_URL = "https://";
        const IMG_URL = HEAD_IMG_URL + result.data;

        // 이 URL을 img 태그의 src에 넣은 요소를 현재 에디터의 커서에 넣어주면 에디터 내에서 이미지가 나타난다
        // src가 base64가 아닌 짧은 URL이기 때문에 데이터베이스에 에디터의 전체 글 내용을 저장할 수있게된다
        // 이미지는 꼭 로컬 백엔드 uploads 폴더가 아닌 다른 곳에 저장해 URL로 사용하면된다.

        // 이미지 태그를 에디터에 써주기 - 여러 방법이 있다.
        const editor = quillRef.current.getEditor(); // 에디터 객체 가져오기
        // 1. 에디터 root의 innerHTML을 수정해주기

        // 2. 현재 에디터 커서 위치값을 가져온다
        const range = editor.getSelection();
        // 가져온 위치에 이미지를 삽입한다
        editor.insertEmbed(range.index, "image", IMG_URL);
      } catch (error) {
        console.log("실패했어요ㅠ");
      }
    });
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          ["blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }, "link", "image"],
        ],
        handlers: {
          // 이미지 처리는 우리가 직접 imageHandler라는 함수로 처리할 것이다.
          image: imageHandler,
        },
      },
    };
  }, []);
  // const onChange = () => {
  //   const data = editorRef.current.getInstance().getHTML();
  //   console.log(data); // 에디터에 입력한 데이터
  // };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [maxParticipants, setMaxParticipants] = useState("");

  const handleSaveClick = () => {
    const data = {
      title: title,
      content: content,
      startDateTime: selectedStartDate + "T00:00:00",
      endDateTime: selectedEndDate + "T00:00:00",
      maxMember: maxParticipants,
      surveyId: selectedSurvey.surveyId,
      thumbImageUrl: selectedFile,
    };

    call("/s-community/createPost", "POST", data)
      .then((data) => {
        if(data!==null){
          alert("설문 게시물이 생성되었습니다.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleMaxParticipantsChange = (event) => {
    const num = event.target.value;

    setMaxParticipants(num);
  };

  const handleMaxParticipantsBlur = (event) => {
    const text = event.target.value;
    if (isNaN(text) || text < 1) {
      setMaxParticipants(1);
    }
  };

  // 시작일 관리
  const handleDateChange = (event) => {
    setSelectedStartDate(event.target.value);
    console.log("시작일 : " + JSON.stringify(event.target.value));
  };

  // 종료일 관리
  const handleEndDateChange = (event) => {
    setSelectedEndDate(event.target.value);
    console.log("종료일 : " + JSON.stringify(event.target.value));
  };

  return (
    <div className={`fade-in ${fadeIn ? "active" : ""}`}>
      <div className={style.titleWrap}>
        <h1 className="textCenter title textBold">설문 등록</h1>
        <p className="textCenter subTitle">
          쉽고 빠른 설문 플랫폼 어쩌고 저쩌고 입니다.
        </p>
      </div>
      <div className={style.writeWrap}>
        <div style={{ textAlign: "center" }}>
          <input
            type="text"
            className={style.title}
            placeholder="제목을 입력해주세요."
            onChange={handleTitleChange}
          />
        </div>
        <div className={style.editorWrap}>
          <div
            style={{ width: "1000px", margin: "0 auto", marginBottom: "100px" }}
          >
            <ReactQuill
              style={{ width: "1000px", height: "300px" }}
              placeholder="내용을 입력해주세요."
              theme="snow"
              ref={quillRef}
              value={content}
              onChange={setContent}
              modules={modules}
            />
          </div>
        </div>
        {renderBox()}

        <div className={style.voteWrap}>
          {renderModal()}
          <br />
          <br />
          설문을 응시할 수 있는 최대 인원을 입력해주세요!
          <br />
          <br />
          <Input
            value={maxParticipants}
            onChange={handleMaxParticipantsChange}
            type="number"
            defaultValue={1}
            onBlur={(e) => handleMaxParticipantsBlur(e)}
            inputProps={{ style: { textAlign: "center" } }} // 입력창 가운데 정렬
          />
          (명)
          <br />
          <br />
          {renderImgForm()}
          <br />
          <br />
          설문이 시작될 날짜를 입력해주세요!
          <br />
          <br />
          <Input
            type="date"
            value={selectedStartDate || ""}
            onChange={handleDateChange}
            inputProps={{ min: new Date().toISOString().split("T")[0] }}
          />
          <br />
          <br />
          설문이 종료될 날짜를 입력해주세요!
          <br />
          <br />
          <Input
            type="date"
            value={selectedEndDate || ""}
            onChange={handleEndDateChange}
            defaultValue={1}
            inputProps={{ min: new Date().toISOString().split("T")[0] }}
          />
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          width: "1000px",
          margin: "0 auto",
          paddingTop: "80px",
        }}
      >
        <Link to={"/community"}>
          <Button
            variant="outlined"
            href="#contained-buttons"
            sx={[
              {
                padding: "11px 30px",
                backgroundColor: "#fff",
                color: "#243579",
                border: "1px solid #243579",
                fontWeight: "bold",
                marginBottom: "10px",
                marginRight: "5px",
              },
              {
                ":hover": {
                  backgroundColor: "#f8f8f8",
                },
              },
            ]}
          >
            취소
          </Button>
        </Link>

        <Button
          variant="contained"
          href="#contained-buttons"
          onClick={handleSaveClick}
          sx={[
            {
              padding: "11px 30px",
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
          저장
        </Button>
      </div>

      <img src={back} alt="배경" className={style.back} />
    </div>
  );
}
