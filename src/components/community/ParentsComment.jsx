import * as React from 'react';
import style from"../../style/community/ParentsComment.module.css"
import '../../style/Common.css'
import logo from "../../assets/img/avatar.png"
import ChildComment from './ChildComment';
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


export default function ParentsComment({props}) {

  const data = Array.isArray(props) ? props : [];


  console.log("댓글리스트 props: " + data)
  
  return (
    <>
      {data.map(item => (
          <div className={style.commentWrap}>
          <div className={style.writeWrap}>
              <div className={style.writer}>
                  <div>
                      <img src={logo} />
                  </div>
              </div>
              <div className={style.commentFormWrap}>
                  <p>{item.nickName}</p>
                  <p>{item.content}</p>
                  <p><span>{item.createTime}</span> ・ <span> 답급 달기 </span> ・ <span> 신고 </span></p>
              </div>
          </div>
      </div>
      ))}
    </>
  );
}