import React, { useMemo, useRef, useState, useEffect } from "react";
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
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../../pages/loader/Loader";
import call from "../../pages/workspace/api";

// 가상의 서버 통신 함수 (실제로는 서버와의 통신을 구현해야 함)

export default function CommunityWrite() {
  const quillRef = useRef();
  const [content, setContent] = useState("");
  const [prevContent, setPrevContent] = useState("");
  const fadeIn = useFadeIn();
  const [loading, setLoading] = useState(true);
  const imageSrcArray = [];
  const tempUrlList = [];
  const deleteSrcArray = [];
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const postId = location.state ? location.state.postId : null;

  const [voteTitle, setVoteTitle] = useState("");
  const [voteOptions, setVoteOptions] = useState([""]);
  const [hasVote, setHasVote] = useState(false);
  const [voteId, setVoteId] = useState(0);
  const MAX_FILE_SIZE_MB = 5;

  //   const changeTitle = (e) => {
  //     quillRef = quillRef.current;

  //     setContent(e.target.value);
  //   }

  useEffect(() => {
    return () => {
      console.log("temp : " + JSON.stringify(tempUrlList));
  
      
      const mappedArray = tempUrlList.map(fileName => ({ fileName }));
  
      console.log(mappedArray);
      deleteSrcArray.push(...mappedArray); 
      
  
      call("/storage/multiple/files/", "POST", deleteSrcArray)
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    };
  }, []);

  useEffect(() => {
    return () => {
      if (voteId !== 0) {
        call("/community/", "DELETE")
          .then((data) => console.log(data))
          .catch((error) => console.log(error));
      }
    };
  }, []);

  useEffect(() => {
   
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

   
    
  };

  useEffect(() => {
    if (hasVote) {
      handleSubmitVote();
    } else {
      if (voteId !== 0) {
        handleDeleteVote();
      }
    }
  }, [hasVote]);

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
    setVoteId(voteId);
    
  };

  const handleDeleteVote = async () => {
    const response = await call(`/community/deleteVote/${voteId}`, "DELETE");
    console.log("여기삭제들어옴", response);
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
      // multer에 맞는 형식으로 데이터 만들어준다.

      let fileSizeMB = file.size / (1024 * 1024);
      if(file && fileSizeMB > MAX_FILE_SIZE_MB) {
        alert("파일 크기는 5MB를 초과할 수 없습니다.")
        file = null;
        return;
      }

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
          image: imageHandler,
        },
      },
    };
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    // 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        const data = await call(`/community/showPost/${postId}`, "GET");

        if (data.reported === 1) {
          alert("신고당한 게시물입니다.");
          navigate("/community");
        }

        
        setTitle(data.title);
        setContent(data.content);

        // {
        //   voteTitle:'',
        //   answerList: [
        //     {
        //       voteAnswerId:0,
        //       answer:'',
        //     }
        //   ]
        // }

        if (data.voteId !== null) {
          const vote = await call(
            `/community/${postId}/showVoteAnswer/${data.voteId}`,
            "GET"
          );
          setVoteTitle(vote.voteTitle);
          let newArr = [];
          vote.answerList.map((option) => {
            return newArr.push(option.answer);
          });
          setVoteId(data.voteId);
          setVoteOptions(newArr);
          setHasVote(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData(); // 함수 호출
  }, [postId]); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행되도록 함

  if (loading) {
    return (
      <>
        <Loader />
      </>
    ); // 데이터 로딩 중에는 로딩 표시
  }

  const handleSaveClick = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    const imgElements = doc.querySelectorAll("img");
    imgElements.forEach((imgElement) => {
      const src = imgElement.getAttribute("src");

      if (src) {
        imageSrcArray.push(src);
      }

      alert("배열 확인" + JSON.stringify(imageSrcArray));
    });

    if (voteId !== 0) {
      call(`/community/updatePost/${postId}`, "PATCH", {
        title: title,
        content: content,
        voteId: voteId,
        imgUrlList: imageSrcArray,
      })
        .then((data) => {
          setVoteId(0);
          navigate("/communityDetail", { state: { postId: data } });
        })
        .catch((error) => console.log(error));
    } else {
      call(`/community/updatePost/${postId}`, "PATCH", {
        title: title,
        content: content,
        imgUrlList: imageSrcArray,
      })
        .then((data) => {
          navigate("/communityDetail", { state: { postId: data } });
        })
        .catch((error) => console.log(error));
    }

    // axios
    //   .post("http://localhost:8080/community/updatePost", {
    //     title: title,
    //     content: content,
    //     imageUrlList: imageSrcArray,
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     let postId = response.data;

    //     navigate("/communityDetail", { state: { postId: postId } });
    //   })
    //   .catch((error) => {
    //     console.error("생성 실패", error);
    //   });
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

  const handleTitleChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleValueChange = (e) => {
    setContent(e);
  };

  return (
    <div className={`fade-in ${fadeIn ? "active" : ""}`}>
      <div className={style.titleWrap}>
        <h1 className="textCenter title textBold">커뮤니티</h1>
        <p className="textCenter subTitle">
          투표를 통해 여러분의 소소한 일상을 공유해주세요.
        </p>
      </div>
      <div className={style.writeWrap}>
        <div style={{ textAlign: "center" }}>
          <input
            type="text"
            className={style.title}
            placeholder="제목을 입력해주세요."
            onChange={(e) => {
              handleTitleChange(e);
            }}
            value={title}
          />{" "}
          {/*제목*/}
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
              modules={modules}
              formats={formats}
              onChange={handleValueChange}
            />
          </div>
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
       
      </div>

      <img src={back} alt="배경" className={style.back} />
    </div>
  );
}
