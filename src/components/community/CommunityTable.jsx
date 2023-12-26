import React from 'react';
import style from"../../style/community/Table.module.css"
import IconWithText from '../common/IconWithText';
import logo from "../../assets/img/avatar.png"
import { CiMemoPad } from "react-icons/ci";
import { Link } from 'react-router-dom';

function CommunityTable({props}) {
  
  const data = Array.isArray(props) ? props : [];
 

  function renderIsBest(isBest){
    if(isBest !== null){
      return (
        <span className={style.best}>best</span>
      );
    }
  }

  function renderIsNew(isNew){
      if(isNew==="new"){
        return "new";
      }else{
        return null;
      }
  }

  function renderVote(isVote){
      if(isVote !== null){
        return(
          <span className={style.vote}>
              <IconWithText className='item1' text={'투표'} fontsize={'12px'} fontweight={'700'} fontcolor={'#fff'}>
                  <CiMemoPad />
              </IconWithText>
          </span>

        );
      }
  }

  function renderProfil(profile){
    if(profile === null){
      return logo;
    }else{
      let prefix = "https://";
      return prefix + profile;
    }
  }



  return (
    <div>
      <table className={style.communityTable}>
        <thead className={style.thead}>
          <tr>
            <th style={{width:'10%'}}>번호</th>
            <th>제목</th>
            <th style={{width:'10%'}}>작성자</th>
            <th style={{width:'10%'}}>조회수</th>
            <th style={{width:'10%'}}>등록일</th>
          </tr>
        </thead>
        <tbody style={{textAlign:'center'}} className={style.tbody}>
          {data.map(item => (
            <tr key={item.postId}>
              <td style={{width:'10%'}}>{item.postId}</td>
              <td >
                {renderIsBest(item.isBest)}
                <Link to={'/communityDetail'} state={{postId : item.postId}}>{item.title}</Link>
                {renderVote(item.voteId)}
                <span className={style.comment}>[{item.commentSize}]</span>
                <span className={style.new}>{renderIsNew(item.createType)}</span>
              </td>
              <td style={{width:'10%'}}>
                <div className={style.profil}>
                  <span className={style.photo}>
                    <img className='' src={renderProfil(item.profile)}/> {/* */}
                  </span>
                  <span className={style.nickname}>{item.nickname}</span>
                </div>
              </td>
              <td style={{width:'10%'}}>{item.count}</td>
              <td style={{width:'10%'}}>{item.createTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CommunityTable;
