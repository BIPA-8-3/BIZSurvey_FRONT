import style from "../../style/community/ParentsComment.module.css";
import "../../style/Common.css";
import logo from "../../assets/img/avatar.png";
import ChildCommentForm from "./ChildCommentForm";
import React, { useState, useContext } from "react";
import ClaimReasonModal from "../common/ClaimReasonModal";
import { LoginContext } from "../../App";
import { useNavigate } from "react-router-dom";
import call from "../../pages/workspace/api";
import Comment from "./Comment";
import EdditComment from "./EditComment";
import EdditChildComment from "./EditChildComment";

const ParentsComment = ({ props }) => {
  const userInfo = useContext(LoginContext);
  const navigate = useNavigate();
  const data = props.commentList || [];
  let postId = props.postId;
  let type = props.type;

  const [showChildCommentForm, setShowChildCommentForm] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [childIsModalOpen, setChildIsModalOpen] = useState({});
  const [commentModalOpen, setCommentModalOpen] = useState({});
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [isEditFormVisible, setEditFormVisible] = useState(false);

  // 대댓글 
  const [editChildCommentId, setEditingChildCommentId] = useState(null);
  const [isChildEditFormVisible, setChildEditFormVisible] = useState(false);

  

  // 댓글
  const handleOpenModal = (commentId) => {
    if (userInfo.id === undefined) {
      alert("댓글을 신고하려면 먼저 로그인을 해야합니다.");
      navigate("/login");
      return;
    }
   
    setCommentModalOpen((prev) => ({
      ...prev,
      [commentId]: true,
    }));
  };

  const handleCloseModal = (commentId) => {
    setCommentModalOpen((prev) => ({
      ...prev,
      [commentId]: false,
    }));
  };

  const handleSelectReasons = (selectedReasons) => {
    // 선택된 이유들을 사용하거나 필요에 따라 다른 작업을 수행합니다.
    console.log("Selected Reasons:", selectedReasons);
  };

  // 대댓글
  const childHandleOpen = (childCommentId) => {
    if(userInfo.id === undefined){
      alert("대댓글을 신고하려면 먼저 로그인을 해야합니다.")
      navigate("/login")
      return;
    } 
    setChildIsModalOpen((prev) => ({
      ...prev,
      [childCommentId]: true,
    }));
  };

  const childHandleCloseModal = (childCommentId) => {
    setChildIsModalOpen((prev) => ({
      ...prev,
      [childCommentId]: false,
    }));
  };

  const childHandleSelectReasons = (selectedReasons) => {
    // 선택된 이유들을 사용하거나 필요에 따라 다른 작업을 수행합니다.
    console.log("Selected Reasons:", selectedReasons);
  };

  function renderProfil(profile){
    if(profile === null){
      return logo;
    }else{
      let prefix = "https://";
      
      return prefix + profile;
    }
  }

  // 댓글 
  const handleEditParentClick = (commentId) => {
    
    if (editingCommentId === commentId) {
      // 이미 열려있는 수정 폼을 닫을 때
      setEditingCommentId(null);
      setEditFormVisible(false);
    } else {
      // 수정 폼을 열 때
      setEditingCommentId(commentId);
      setEditFormVisible(true);
    }
    
  };


  const handleDeleteClick = (commentId) => {

    call(`/community/${postId}/deleteComment/${commentId}`, "DELETE")
      .then((data)=> {
      console.log('Comment DELETED:', data);
      window.location.reload();
    });
    
  };

  function renderUpdateAndDelButton(nickname, commentId){

    if(nickname === userInfo.nickname){

        return(
          <>
            |<span onClick={() => handleEditParentClick(commentId)}> 수정 </span> 
            |<span onClick={() => handleDeleteClick(commentId)}> 삭제 </span>
            {renderEditCommentForm(commentId)}
          </>
        );
    }
  }

  const renderEditCommentForm = (commentId) => {
    if (commentId !== null && editingCommentId === commentId && isEditFormVisible) {

    
      return (
        <>
          <EdditComment props={{postId : postId, commentId: commentId, type : 'co'}} />
        </>
      );
    }
  }


    // 대댓글 
    const handleEditChildClick = (childCommentId) => {
      if(editChildCommentId === childCommentId) {
        setEditingChildCommentId(null);
        setChildEditFormVisible(false);
      }else{
        setEditingChildCommentId(childCommentId);
        setChildEditFormVisible(true);
      }
    }

    const handleDeleteChildClick =(commentId, childCommentId) =>{
      call(`/community/${commentId}/deleteChildComment/${childCommentId}`, "DELETE")
      .then((data)=> {
      console.log('CHILD Comment DELETED:', data);
      window.location.reload();
    });
    }

    const renderEditChildCommentId = (commentId, childCommentId) =>{
        if(childCommentId !== null && editChildCommentId === childCommentId && isChildEditFormVisible){
          return (
            <>
              <EdditChildComment props={{commentId : commentId, childCommentId: childCommentId}} />
            </>
          );
        }
    }



    
  function renderUpdateAndDelChildButton(nickname, commentId, childCommentId){
    if(nickname === userInfo.nickname){
      return(
        <>
          |<span onClick={() => {handleEditChildClick(childCommentId)}}> 수정 </span> 
          |<span onClick={() => {handleDeleteChildClick(commentId, childCommentId)}}> 삭제 </span>
          {renderEditChildCommentId(commentId, childCommentId)}
        </>
      );
  }
  }

    




  const renderChildComment = (childCommentList, commentId) => {
    if (childCommentList && childCommentList.length > 0) {
      return (
        <div>
          {childCommentList.map((childItem) => (
            <div key={childItem.childCommentId} className={style.commentWrap}>
              <div className={style.writeWrap}>
                <div className={style.writer}>
                  <div></div>
                </div>
                <div className={style.childCommentWrap}  style={{width:'100%', paddingRight:'10px'}}>
                  <div className={style.writeWrap}>
                    <div className={style.writer}>
                      <div>
                        <img src={renderProfil(childItem.thumbImageUrl)} />
                      </div>
                    </div>
                    <div className={style.commentFormWrap}>
                      <p>{childItem.nickName}</p>
                      <p>{childItem.content}</p>
                      <p>
                        <span>{childItem.createTime}</span>{" "}
                        |<span onClick={() => childHandleOpen(childItem.childCommentId)}> 신고 </span>
                        {renderUpdateAndDelChildButton(childItem.nickName, commentId, childItem.childCommentId)}
                      </p>

                      {childIsModalOpen[childItem.childCommentId] && (
                        <ClaimReasonModal
                          onSelect={() =>
                            childHandleSelectReasons(childItem.childCommentId)
                          }
                          onClose={() =>
                            childHandleCloseModal(childItem.childCommentId)
                          }
                          isModalOpen={
                            childIsModalOpen[childItem.childCommentId]
                          }
                          props={"child"}
                          id={childItem.childCommentId}
                        />
                      )}
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
      
      return (
        <ChildCommentForm
          props={{ postId: postId, commentId: commentId, type: type }}
        />
      );
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
    <div  style={{width:'100%', paddingRight:'10px'}}>
      {data.map((item) => (
        <div key={item.commentId} className={style.commentWrap} >
          <div className={style.writeWrap}>
            <div className={style.writer}>
              <div>
                <img src={renderProfil(item.thumbImageUrl)} alt="Profile" />
              </div>
            </div>
            <div className={style.commentFormWrap}>
              <p>{item.nickName}</p>
              <p>{item.content}</p>
              <p>
                <span>{item.createTime}</span> |{" "}
                <span onClick={() => toggleChildCommentForm(item.commentId)}>
                  답글 달기
                </span>{" "}
                |<span onClick={() => handleOpenModal(item.commentId)}> 신고 </span>
                {renderUpdateAndDelButton(item.nickName, item.commentId)}

                {commentModalOpen[item.commentId] && (
                  <ClaimReasonModal
                    onSelect={handleSelectReasons}
                    onClose={() => handleCloseModal(item.commentId)}
                    isModalOpen={commentModalOpen[item.commentId]}
                    props={"comment"}
                    id={item.commentId}
                  />
                )}
              </p>
            </div>
          </div>
          {renderChildCommentForm(item.commentId, postId)}
          {renderChildComment(item.childCommentResponses, item.commentId)}
        </div>
      ))}
    </div>
  );
};

export default ParentsComment;