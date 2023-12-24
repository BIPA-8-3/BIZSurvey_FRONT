import React, { useEffect, useMemo, useRef, useState } from "react";
import style from "../../style/community/CommunityWrite.module.css";
import "../../style/Common.css";
import useFadeIn from "../../style/useFadeIn";
import back from "../../assets/img/back.png";
import Button from "@mui/material/Button";
import { Link, json } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { IoIosCloseCircle } from "react-icons/io";
import axios from "axios";
import CreateVote from "./CreateVote";
import RegisterVote from "./RegisterVote";
import { useNavigate } from "react-router-dom";
import call, { getURI } from "../../pages/workspace/api";
import Loader from "../../pages/loader/Loader";

// import { setOptions } from "react-chartjs-2/dist/utils";

// 가상의 서버 통신 함수 (실제로는 서버와의 통신을 구현해야 함)

export default function CommunityWrite() {
  const quillRef = useRef();
  const [content, setContent] = useState("");
  const [prevContent, setPrevContent] = useState("");
  const fadeIn = useFadeIn();
  const [voteTitle, setVoteTitle] = useState("");
  const [voteOptions, setVoteOptions] = useState([""]);
  const [hasVote, setHasVote] = useState(false);
  const [voteId, setVoteId] = useState(0);
  const imageSrcArray = [];
  const tempUrlList = [];
  const deleteSrcArray = [];
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const MAX_FILE_SIZE_MB = 5;

  const [error, setError] = useState({
    selectedSurvey: "",
    title: "",
    content: "",
    startDate: "",
    endDate: "",
  });

  

    // 컴포넌트 언 마운트될 때 삭제 요청 상황 
    useEffect(() => {
      return () => {
        console.log("temp : " + JSON.stringify(tempUrlList));
    
        // 각 아이템을 객체로 감싸서 새로운 배열 생성
        const mappedArray = tempUrlList.map(fileName => ({ fileName }));
    
        console.log(mappedArray);
        deleteSrcArray.push(...mappedArray); // spread 연산자를 사용하여 배열 확장
        console.log("뒤로가기 삭제 : " + JSON.stringify(deleteSrcArray));
    
        call("/storage/multiple/files/", "POST", deleteSrcArray)
          .then((data) => console.log(data))
          .catch((error) => console.log(error));
      };
    }, []);



    useEffect(() => {
      console.log("Content 값이 변경되었습니다:", content);
      if (prevContent !== content) {
        handleContentChange();
      }
      setPrevContent(content);

    }, [content, prevContent]);

    const handleContentChange = () => {
      // content 값에서 특정 이미지 태그를 찾아내고 그에 따른 동작을 수행
      const removedImageTag = findRemovedImageTag(prevContent, content);
      
      if (removedImageTag) {
        // 찾아낸 이미지 태그에 대한 동작 수행
        handleImageTagRemoved(removedImageTag);
      }
    };

    const findRemovedImageTag = (prevContent, currentContent) => {
      
      const imgRegex = /<img[^>]*>/g;
      const prevImageTags = prevContent.match(imgRegex) || [];
      const currentImageTags = currentContent.match(imgRegex) || [];
    
      // 이전에 있었지만 현재는 없는 이미지 태그를 찾아냄
      const removedImageTags = prevImageTags.filter(
        (tag) => !currentImageTags.includes(tag)
      );
    
      
      if (removedImageTags.length > 0) {
        return removedImageTags[0];
      }
    
      return null;
    };
    
    const handleImageTagRemoved = (removedImageTag) => {
      // 사라진 이미지 태그에 대한 동작을 여기에 작성
      const srcRegex = /<img.*?src="(.*?)".*?>/i;
      const match = removedImageTag.match(srcRegex);
    
      // match 배열의 두 번째 요소가 src 속성값
      const srcValue = match ? match[1] : null;
      for(let i = 0; i < imageSrcArray.length; i++) {
        if(imageSrcArray[i] === srcValue)  {
          imageSrcArray.splice(i, 1);
          i--;
        }
      }
      const sliceSrcValue = srcValue.slice(8);
      
      call("/storage/file/" + sliceSrcValue, "DELETE")
      .then((data) => console.log(data))
      .catch((error) => console.log(error));

      console.log("이미지 삭제됨")
      
    };


  useEffect(() => {
    console.log("titleleeeeeeeeeeee", voteTitle);
  }, [voteTitle]);

  useEffect(() => {
    console.log("optionsssssssssssssleeeeeeeeeeee", voteOptions);
  }, [voteOptions]);

  useEffect(() => {
    return () => {
      // 컴포넌트가 언마운트될 때 실행되는 코드
      if (voteId !== 0) {
        call("/community/", "DELETE")
          .then((data) => console.log(data))
          .catch((error) => console.log(error));
      }
    };
  }, []);

  useEffect(() => {
    if (hasVote) {
      handleSubmitVote();
    } else {
      if (voteId !== 0) {
        handleDeleteVote();
      }
    }
  }, [hasVote]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmitVote = async () => {
    let newAnswers = [];
    voteOptions.map((option, index) => {
      let ans = { answer: option };
      return newAnswers.push(ans);
    });

    const data = {
      voteQuestion: voteTitle,
      voteAnswer: newAnswers,
    };

    const voteId = await call(`/community/createVote`, "POST", data);
    console.log(voteId);
    setVoteId(voteId);
  };

  const handleDeleteVote = async () => {
    const response = await call(`/community/deleteVote/${voteId}`, "DELETE");
    setHasVote(false);
    setVoteTitle("");
    setVoteOptions([""]);
    setVoteId(0);
  };

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
      let file = input.files[0];

      let fileSizeMB = file.size / (1024 * 1024);
      if(file && fileSizeMB > MAX_FILE_SIZE_MB) {
        alert("파일 크기는 5MB를 초과할 수 없습니다.")
        file = null;
        return;
      }

      // multer에 맞는 형식으로 데이터 만들어준다.
      const formData = new FormData();
      formData.append("file", file); // formData는 키-밸류 구조
      formData.append("domain", "COMMUNITY");
      // 백엔드 multer라우터에 이미지를 보낸다.
      try {
        setLoading(true); //
        const result = await axios.post( 
          getURI() + "/storage/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
         
  
        tempUrlList.push(result.data);

        const HEAD_IMG_URL = "https://";
        const IMG_URL = HEAD_IMG_URL + result.data;
        alert(JSON.stringify(IMG_URL));
        const editor = quillRef.current.getEditor(); 


        const range = editor.getSelection();

        editor.insertEmbed(range.index, "image", IMG_URL);
      } catch (error) {
        console.log("실패했어요ㅠ");
      }finally {
        setLoading(false); // 데이터 로딩이 끝났음을 표시
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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSaveClick = () => {

    if (!title) {
      setError((prevError) => ({ ...prevError, title: "제목을 입력해주세요." }));
      return;
    }else{
      setError((prevError) => ({ ...prevError, title: "" }));
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    const imgElements = doc.querySelectorAll("img");
    imgElements.forEach((imgElement) => {
    const src = imgElement.getAttribute("src");

      if (src) {
        imageSrcArray.push(src);
      }

      alert("배열 확인 : " + JSON.stringify(imageSrcArray));
    });

    if (voteId !== 0) {
      call("/community/createPost", "POST", {
        title: title,
        content: content,
        voteId: voteId,
        imageUrlList: imageSrcArray,
      })
        .then((data) => {
          setVoteId(0);
          navigate("/communityDetail", { state: { postId: data } });
        })
        .catch((error) => console.log(error));
    } else {
      call("/community/createPost", "POST", {
        title: title,
        content: content,
        imageUrlList: imageSrcArray,
      })
        .then((data) => {
          navigate("/communityDetail", { state: { postId: data } });
        })
        .catch((error) => console.log(error));
    }
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "image",
  ];

  return (
    <div className={`fade-in ${fadeIn ? "active" : ""}`}>
      {loading ? <Loader /> : "" }
      <div className={style.titleWrap}>
        <h1 className="textCenter title textBold">커뮤니티</h1>
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
          <p style={{ color: "red" }}>{error.title}</p>
        </div>
        <div className={style.editorWrap}>
          <div
            style={{ width: "1000px", margin: "0 auto", marginBottom: "100px" }}
          >
            <ReactQuill
              style={{ width: "1000px", height: "300px" }}
              placeholder="내용을 입력헤주세요."
              theme="snow"
              ref={quillRef}
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
            />
           
          </div>
          <p style={{ color: "red", margin: "0 auto", textAlign: 'center' }}>{error.content}</p>         
        </div>
        <div className={style.voteWrap}>
          <p>비즈서베이의 투표 기능을 이용해보세요!</p>
          <p>
            원하는 투표 내용을 직접 만들어 회원들의 의견을 확인할 수 있습니다
          </p>
          {/* 투표가 만들어 졌을때 컴포넌트 */}

          {hasVote && voteTitle !== "" ? (
            <>
              <IoIosCloseCircle
                className={style.voteCloseBtn}
                onClick={handleDeleteVote}
              />
              <RegisterVote voteTitle={voteTitle} voteOptions={voteOptions} />
            </>
          ) : null}

          {/* 투표가 만들어 졌을때 컴포넌트 */}
          {hasVote ? null : (
            <button onClick={handleOpen} style={{ cursor: "pointer" }}>
              투표 만들기
            </button>
          )}
        </div>
      </div>
      <div
        className={`${style.modalWrap} ${open ? style.fadeIn : ""}`}
        onClick={handleClose}
      >
        <div className={style.modal} onClick={(e) => e.stopPropagation()}>
          <p className={style.title}>투표 추가하기</p>
          <CreateVote
            setVote={setHasVote}
            handleClose={handleClose}
            setTitle={setVoteTitle}
            setOptions={setVoteOptions}
            voteTitle={voteTitle}
            voteOptions={voteOptions}
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
        <Link to={"/communityWrite"}>
          <Button
            variant="contained"
            href="#contained-buttons"
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
            onClick={handleSaveClick}
          >
            저장
          </Button>
        </Link>
      </div>

      <img src={back} alt="배경" className={style.back} />
    </div>
  );
}
