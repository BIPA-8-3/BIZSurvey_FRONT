
import style from"../../style/community/Comment.module.css"
import '../../style/Common.css'
import logo from "../../assets/img/avatar.png"
import ParentsComment from './ParentsComment';
import axios from 'axios'
import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import call from '../../pages/workspace/api';
import { LoginContext } from "../../App";


export default function Comment({props}) {
  const userInfo = useContext(LoginContext);
  let postId = props.postId;
  let type = props.type;
  console.log("게시물 타입이야 : " + type)

  const navigate = useNavigate();

  const [comment, setComment] = useState('');

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const handleSaveClick = async () => {
    if(!localStorage.getItem("userInfo")){
      alert("댓글을 작성하려면 로그인을 먼저 해야합니다.")
      navigate("/login")
      return;
    } 


    if(comment === ''){
      alert("값을 입력해주세요!")
      return;
    }


    try {
        call(`/community/${postId}/createComment`, "POST", {
        content: comment,
      }).then((data)=> {
        console.log('Comment created:', data);
        window.location.reload();
      });
     
     
      if(type === 'sc'){
        navigate('/surveyCommunityDetail', { state: { postId: postId } });
      }

      else if(type === 'co'){
        navigate('/communityDetail', { state: { postId: postId } });
      }

      
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };
  return (
    <div>
        <div className={style.commentWrap}>
            <div className={style.writeWrap}>
                <div className={style.writer}>
                    <div>
                        <img src={logo} />
                    </div>
                </div>
                <div className={style.commentFormWrap} >
                    <input type='text' onChange={handleInputChange} placeholder='칭찬과 격려의 댓글은 작성자에게 큰 힘이 됩니다:)' />
                    <span className={style.writeBtn} onClick={handleSaveClick}> 입력</span>
                </div>
            </div>
        </div>
    </div>

  );
}