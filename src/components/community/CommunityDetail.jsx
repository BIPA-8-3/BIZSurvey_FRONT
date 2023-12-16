import * as React from 'react';
import style from"../../style/community/CommunityDetail.module.css"
import '../../style/Common.css'
import { useState, useEffect } from 'react';
import Loader from "../../pages/loader/Loader"
import useFadeIn from '../../style/useFadeIn';
import back from '../../assets/img/back.png'
import Button from '@mui/material/Button';
import logo from "../../assets/img/avatar.png"
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Comment from './Comment';
import ParentsComment from './ParentsComment';
import VoteWrite from './VoteWrite'
import ChildCommentForm from './ChildCommentForm';
import ChildComment from './ChildComment';
import axios from 'axios'
import ClaimReasonModal from "../common/ClaimReasonModal";


export default function CommunityPost() {
  
  const fadeIn = useFadeIn();
  const location = useLocation();
  let postId = location.state.postId;
  const [dataFromLocalStorage, setDataFromLocalStorage] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem('userInfo'); 
    const parsedData = JSON.parse(storedData);
    setDataFromLocalStorage(parsedData);
    alert(JSON.stringify(parsedData));
  }, []); 

  useEffect(() => {
    // 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/community/showPost/'+postId);

        if(response.data.reported === 1){
          alert("신고당한 게시물입니다.")
          navigate('/community');
        }

        console.log("리스폰스 : "+response);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // 데이터 로딩이 끝났음을 표시
      }
    };

    fetchData(); // 함수 호출
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행되도록 함

  if (loading) {
    return <>
      <Loader />
    </>; // 데이터 로딩 중에는 로딩 표시
  }
  console.log("데이타"+data)
  console.log(postId);


  function renderChangeButton(){

    if(data.nickname === dataFromLocalStorage.nickname){
            return(
              <div style={{ textAlign: "right" }}>
                    <Link
                      to={"/editSurveyCommunity"}
                      state={{postId: postId }}
                    >
                      <Button
                        variant="contained"
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
                        수정
                      </Button>
                    </Link> 
            </div>
            
            );
      }
    }


  let votePostId = data.postId;
 
  function renderVote(isVote){

    console.log("isVOTE?" + isVote)
    console.log("isPOST?" + votePostId)

    if(isVote !== null){
      return(
        <VoteWrite voteId={isVote} postId={votePostId} />
        
      );
    }
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectReasons = (selectedReasons) => {
    // 선택된 이유들을 사용하거나 필요에 따라 다른 작업을 수행합니다.
    console.log("Selected Reasons:", selectedReasons);
  };


  const removePTags = (html) => {
    // 정규식을 사용하여 <p></p> 태그를 제거합니다.
    const withoutPTags = html.replace(/<p>/g, '').replace(/<\/p>/g, '');
    return withoutPTags;
  };


  return (

    <div className={`fade-in ${fadeIn ? 'active' : ''}`}>
    
        <div className={style.contentWrap} style={{marginTop:"170px"}}>
            <div style={{backgroundColor: 'rgba(209, 232, 248, 0.1)'}}>
                <div className={style.title}>
                    <h1>{data.title}</h1>
                    <p style={{display:'flex'}}>
                        <p style={{textAlign:'center'}}>
                            <div className={style.profil} style={{textAlign:'center'}}>
                                <span className={style.photo}>
                                    <img className='' src={logo}/>
                                </span>
                                <span className={style.nickname}>{data.nickname}</span>
                            </div>
                        </p>
                        <div style={{marginTop:'16px'}}>
                            <span className={style.bar}> | </span> 
                            <span>COMMUNITY</span>
                            <span className={style.bar}> | </span> 
                            <span>{data.createTime}</span> 
                        </div>
                        
                    </p>
                </div>
            </div>
            <div className={style.content}>
            {renderChangeButton()}
            <p dangerouslySetInnerHTML={{ __html: removePTags(data.content) }} />
               
                {renderVote(data.voteId)}

                <p style={{marginTop:'100px', display:'flex', justifyContent:'space-between'}}>
                    <div>
                        조회수 <span style={{fontWeight:'bold'}}>{data.count}</span>
                        <span style={{color:'#ddd'}}> | </span> 
                        댓글 <span style={{fontWeight:'bold'}}>{data.commentSize}</span>
                    </div>
                    <div style={{ cursor: "pointer", fontSize: "14px" }} onClick={handleOpenModal}>신고</div>
                    {/* 모달 */}
                        {isModalOpen && (
                          <ClaimReasonModal
                            onSelect={handleSelectReasons}
                            onClose={handleCloseModal}
                            isModalOpen={isModalOpen}
                            props={'post'}
                            id={postId}
                          />
                        )}
                </p>
                
            </div>
            <Comment props={{postId: postId, type: 'co' }} />
            <ParentsComment props={{ postId: postId, commentList: data.commentList }} />
        </div>
        <div style={{textAlign:'center'}}>
            <Link to={'/community'}>
                <Button variant="contained" href="#contained-buttons" sx={{padding:'11.5px 30px', backgroundColor:'#243579', fontWeight:'bold'}}>
                    목록으로
                </Button>
            </Link>
        </div>
        <img src={back} alt="배경" className={style.back}/>
    </div>
  );
}