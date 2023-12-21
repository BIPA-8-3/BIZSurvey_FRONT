import style from "../../style/community/ParentsComment.module.css";
import "../../style/Common.css";
import logo from "../../assets/img/avatar.png";
import ChildCommentForm from "./ChildCommentForm";
import React, { useState, useContext } from "react";
import ClaimReasonModal from "../common/ClaimReasonModal";
import { LoginContext } from "../../App";
import { useNavigate } from "react-router-dom";

const ParentsComment = ({ props }) => {
  const userInfo = useContext(LoginContext);
  const navigate = useNavigate();
  const data = props.commentList || [];
  let postId = props.postId;
  let type = props.type;

  console.log("서베이쪽에서 넘어온 게시물 ID야 : " + postId);

  const [showChildCommentForm, setShowChildCommentForm] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [childIsModalOpen, setChildIsModalOpen] = useState({});

  // 댓글
  const handleOpenModal = () => {
    if(userInfo.id === undefined){
      alert("댓글을 신고하려면 먼저 로그인을 해야합니다.")
      navigate("/login")
      return;
    } 
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
      console.log("프로필 : " + prefix + profile)
      return prefix + profile;
    }
  }



  const renderChildComment = (childCommentList) => {
    if (childCommentList && childCommentList.length > 0) {
      return (
        <div>
          {childCommentList.map((childItem) => (
            <div key={childItem.childCommentId} className={style.commentWrap}>
              <div className={style.writeWrap}>
                <div className={style.writer}>
                  <div></div>
                </div>
                <div className={style.childCommentWrap}>
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
                        <span
                          onClick={() =>
                            childHandleOpen(childItem.childCommentId)
                          }
                        >
                          {" "}
                          신고{" "}
                        </span>
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
    <>
      {data.map((item) => (
        <div key={item.commentId} className={style.commentWrap}>
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
                <span>{item.createTime}</span> ・{" "}
                <span onClick={() => toggleChildCommentForm(item.commentId)}>
                  답글 달기
                </span>{" "}
                ・ <span onClick={handleOpenModal}> 신고 </span>
                {isModalOpen && (
                  <ClaimReasonModal
                    onSelect={handleSelectReasons}
                    onClose={handleCloseModal}
                    isModalOpen={isModalOpen}
                    props={"comment"}
                    id={item.commentId}
                  />
                )}
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
