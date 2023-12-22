
import style from"../../style/community/Comment.module.css"
import '../../style/Common.css'
import logo from "../../assets/img/avatar.png"
import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import call from '../../pages/workspace/api';
import { LoginContext } from "../../App";


export default function EdditChildComment({props}) {


  const userInfo = useContext(LoginContext);
  let commentId = props.commentId;
  let childCommentId = props.childCommentId;


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


    try {
        call(`/community/${commentId}/updateChildComment/${childCommentId}`, "PATCH", {
        content: comment,
      }).then((data)=> {
        console.log('Comment created:', data);
        window.location.reload();
      });

      
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };
  return (
    <div  style={{width:'100%', paddingRight:'10px'}}>
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