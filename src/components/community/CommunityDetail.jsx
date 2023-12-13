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


export default function CommunityPost() {
  
  const fadeIn = useFadeIn();
  const location = useLocation();
  let postId = location.state.postId;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/community/showPost/'+postId);
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






  return (

   

    <div className={`fade-in ${fadeIn ? 'active' : ''}`}>
        {/* <div className={style.titleWrap}>
            <h1 className='textCenter title textBold'>COMMUNITY</h1>
            <p className='textCenter subTitle'>쉽고 빠른 설문 플랫폼 어쩌고 저쩌고 입니다.</p>
        </div> */}
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
                <p>{data.content}</p>
               
                {renderVote(data.voteId)}

                <p style={{marginTop:'100px', display:'flex', justifyContent:'space-between'}}>
                    <div>
                        조회수 <span style={{fontWeight:'bold'}}>{data.count}</span>
                        <span style={{color:'#ddd'}}> | </span> 
                        댓글 <span style={{fontWeight:'bold'}}>{data.commentSize}</span>
                    </div>
                    <div style={{cursor:'pointer', fontSize:'14px'}}>
                        신고
                    </div>
                </p>
                
            </div>
            <Comment props={postId} />
            <ParentsComment props={{ postId: postId, commentList: data.commentList }} />
            

            
            {/* <ChildCommentForm />
            <ChildComment />
            <ChildComment />
            <ParentsComment />
            <ChildComment />
            <ParentsComment />
            <ChildComment />
            <ParentsComment />
            <ParentsComment />
            <ChildCommentForm /> */}
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