
import style from"../../style/community/Comment.module.css"
import '../../style/Common.css'
import logo from "../../assets/img/avatar.png"
import ParentsComment from './ParentsComment';
import axios from 'axios'
import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import call from '../../pages/workspace/api';
import { LoginContext } from "../../App";


export default function EdditComment({props}) {
  const userInfo = useContext(LoginContext);
  let postId = props.postId;
  let type = props.type;
  let commentId = props.commentId;

  const navigate = useNavigate();

  const [comment, setComment] = useState('');

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const handleSaveClick = async () => {
    if(userInfo.id === undefined){
      alert("댓글을 작성하려면 로그인을 먼저 해야합니다.")
      navigate("/login")
      return;
    } 

    if(comment === ''){
      alert("값을 입력해주세요!")
      return;
    }

    try {
        call(`/community/${postId}/updateComment/${commentId}`, "PATCH", {
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
                    <input type='text' onChange={handleInputChange} placeholder='수정할 내용을 입력해주세요' />
                    <span className={style.writeBtn} onClick={handleSaveClick}> 수정</span>
                </div>
            </div>
        </div>
    </div>

  );
}