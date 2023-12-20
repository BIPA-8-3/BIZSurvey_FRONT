import React, { useState, useEffect } from 'react';
import style from '../../style/admin/AdminClaimInfo.module.css'
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import call from '../../pages/workspace/api';
function AdminClaimInfo() {
  const { id } = useParams();
  const [claimdata, setClaim] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    
    call(`/admin/claim/${id}`, "GET")
    .then((data) => {
      setClaim(data)
    }).catch((error) => {
      console.log(error)
    })
  },[]);

  if(!claimdata.child){
    return;
  }

  const handleClaimOk = () => {
    if(window.confirm("신고 처리 하시겠습니까?")){
      call(`/admin/claim/processing/${claimdata.claim.id}`, "GET")
      .then((data) => {
        navigate('/admin/claimList');
      }).catch((error) => {
        console.log(error)
      })
    }
  }

  const handleClaimFalse = async() => {
    if(window.confirm("신고를 반려 처리 하시겠습니까?")){
        call(`/admin/claim/unprocessing`, "patch", {
          claimId: claimdata.claim.id,
          postId: claimdata.claim.logicalKey,
        }).then(() => {
          navigate('/admin/claimList');
        })
      }
    }
  return (
    <div
    className={style.userListWrap}
    style={{ paddingLeft: "0px !important", paddingRight: "0px !important" }}>
    <p className={style.titleWrap} style={{ fontWeight: "bold" }}>
      관리자 시스템
    </p>
    <div style={{ width: "100%", borderTop: "1px solid rgb(221, 221, 221)", padding:'10px 20px'}}>
      <div >
        <p style={{ fontSize: 12 }}>
          Bizsurvey관리자시스템 》 신고내역조회 》 
          <span style={{ fontWeight: "bold", fontSize: 12 }}> 신고내역상세조회</span>
        </p>
        <p style={{ fontWeight: "bold", color: "#222", marginTop:"20px", display:'flex', alignItems:'center' }}>
          <IoIosArrowDropdownCircle 
            style={{ color: "#0476D9" }}
          />
          <p style={{marginLeft:'5px'}}>신고자</p>
        </p>
      </div>
      <div
        className={style.breadcrumb}
        style={{ background: "#eaf6ff", border: "3px solid #ddd", padding:'15px', marginTop:'10px', borderRadius:'5px'}}
      >
        <div className="d-flex" style={{display:'flex'}}>
          <div className="d-flex" style={{display:'flex'}}>
            <div className={style.infoFirstBox}>이메일</div>
            <div className={style.infoBox}>
                {claimdata.claim.email}
            </div>
          </div>
          <div className="d-flex" style={{display:'flex'}}>
            <div className={style.infoFirstBox} style={{ marginLeft: 10 }}>
              닉네임
            </div>
            <div className={style.infoBox}>
              {claimdata.claim.nickname}
            </div>
          </div>
        </div>
      </div>

      <p style={{ fontWeight: "bold", color: "#222", marginTop:"20px", display:'flex', alignItems:'center' }}>
          <IoIosArrowDropdownCircle 
            style={{ color: "#0476D9" }}
          />
          <p style={{marginLeft:'5px'}}>신고대상자</p>
      </p>
      <div
        className={style.breadcrumb}
        style={{ background: "#eaf6ff", border: "3px solid #ddd", padding:'15px', marginTop:'10px', borderRadius:'5px'}}
      >
        <div className="d-flex" style={{display:'flex'}}>
          <div className="d-flex" style={{display:'flex'}}>
            <div className={style.infoFirstBox}>이메일</div>
            <div className={style.infoBox}>
              {claimdata.child.email}
            </div>
          </div>
          <div className="d-flex" style={{display:'flex'}}>
            <div className={style.infoFirstBox} style={{ marginLeft: 10 }}>
              닉네임
            </div>
            <div className={style.infoBox}>
              {claimdata.child.nickname}
            </div>
          </div>
        </div>
        <div className="d-flex" style={{display:'flex', marginTop:'7px'}}>
          <div className="d-flex" style={{display:'flex'}}>
            <div className={style.infoFirstBox}>신고 타입</div>
            <div className={style.infoBox}>
              {claimdata.claim.claimType}
            </div>
          </div>
          <div className="d-flex" style={{display:'flex'}}>
            <div className={style.infoFirstBox} style={{ marginLeft: 10 }}>
              신고 사유
            </div>
            <div className={style.infoBox}>
              {claimdata.claim.claimReason}
            </div>
          </div>
          <div className="d-flex" style={{display:'flex'}}>
            <div className={style.infoFirstBox} style={{ marginLeft: 10 }}>
              신고일
            </div>
            <div className={style.infoBox}>
              {claimdata.claim.createTime}
            </div>
          </div>
        </div>
        <div className="d-flex" style={{display:'flex', marginTop:'7px'}}>
          <div className="d-flex" style={{display:'flex'}}>
            <div className={style.infoFirstBox}>제목</div>
            <div className={style.infoBox} style={{width:'824px'}}>
              {claimdata.child.title}
            </div>
          </div>
        </div>
        <div className="d-flex" style={{display:'flex', marginTop:'7px'}}>
          <div className="d-flex" style={{display:'flex'}}>
            <div className={style.infoFirstBox}>내용</div>
            <div className={style.infoBox} style={{width:'824px', height:'auto'}}>
            {claimdata.child.content}
            </div>
          </div>
        </div>
      </div>
      <div className={style.claimInfoBtnWrap}>
        <button onClick={handleClaimFalse}>반려</button>
        <button onClick={handleClaimOk}>신고처리</button>
      </div>
    </div>
    
    
  </div>
  
  );
}

export default AdminClaimInfo;
