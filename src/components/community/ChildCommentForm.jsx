
import style from"../../style/community/ChildCommentForm.module.css"
import '../../style/Common.css'
import logo from "../../assets/img/avatar.png"
import ParentsComment from './ParentsComment';
import axios from "axios";
import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import call from '../../pages/workspace/api';
import { LoginContext } from "../../App";

export default function ChildCommentForm({props}) {
    const userInfo = useContext(LoginContext);
    let getCommentId = props.commentId;
    let getPostId = props.postId;
    let type = props.type;
    
    const navigate = useNavigate();

    const [childComment, setChildComment] = useState('');

    const handleInputChange = (event) => {
      setChildComment(event.target.value);
    };

    const handleSaveClick = async () => {

      if(userInfo.id === undefined){
        alert("댓글을 작성하려면 로그인을 먼저 해야합니다.")
        navigate("/login")
        return;
      } 

        try {
          const response = call(`/community/${getCommentId}/createChildComment`, "POST",{
            content: childComment,
          }).then((data)=>{
            console.log('Comment created:', data);
            window.location.reload();
          });
          
          if(type === 'sc'){
            navigate('/surveyCommunityDetail', { state: { postId: getPostId } });
          }
    
          else if(type === 'co'){
            navigate('/communityDetail', { state: { postId: getPostId } });
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
                        
                    </div>
                </div>
                <div className={style.childCommentWrap}>
                    <div className={style.writeWrap}>
                        <div className={style.writer}>
                            <div>
                                <img src={logo} />
                            </div>
                        </div>
                        <div className={style.commentFormWrap}>
                            <input type='text' placeholder='칭찬과 격려의 댓글은 작성자에게 큰 힘이 됩니다:)' onChange={handleInputChange}/>
                            <span className={style.writeBtn} onClick={handleSaveClick}>입력</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

  );
}