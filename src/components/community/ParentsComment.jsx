
import style from"../../style/community/ParentsComment.module.css"
import '../../style/Common.css'
import logo from "../../assets/img/avatar.png"
import ChildComment from './ChildComment';
import ChildCommentForm from './ChildCommentForm';
import React, { useState } from 'react';


const ParentsComment = ({props}) => {
  const data = props.commentList;
  let postId = props.postId;


  const [showChildCommentForm, setShowChildCommentForm] = useState({});


  // 수정해야 함 
  const renderChildComment = (childCommentList) => {
    if (childCommentList !== null) {
      return (
        <div>
          {childCommentList.map((childItem) => (
            <div key={childItem.commentId} className={style.commentWrap}>
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
                          <p>{childItem.nickName}</p>
                          <p>{childItem.content}</p>
                          <p><span>{childItem.createTime}</span> <span> 신고 </span></p>
                      </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChildCommentForm = (commentId, postId) => {

    if (showChildCommentForm[commentId]) {
      alert(commentId+', '+postId)
      return <ChildCommentForm props={{postId:postId, commentId:commentId}}/>;
    }
    return null;
  };

  const toggleChildCommentForm = (commentId) => {
    setShowChildCommentForm((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  return (
    <>
      {data.map((item) => (
        <div key={item.commentId} className={style.commentWrap}>
          <div className={style.writeWrap}>
            <div className={style.writer}>
              <div>
                <img src={logo} alt="Profile" />
              </div>
            </div>
            <div className={style.commentFormWrap}>
              <p>{item.nickName}</p>
              <p>{item.content}</p>
              <p>
                <span>{item.createTime}</span> ・{' '}
                <span onClick={() => toggleChildCommentForm(item.commentId)}>
                  답글 달기
                </span>{' '}
                ・ <span> 신고 </span>
              </p>
            </div>
          </div>
          {renderChildCommentForm(item.commentId, postId)}
          {renderChildComment(item.childCommentResponses)}
        </div>
      ))}
    </>
  );
};

export default ParentsComment;