import * as React from 'react';
import style from"../../style/community/ParentsComment.module.css"
import '../../style/Common.css'
import logo from "../../assets/img/avatar.png"
import ChildComment from './ChildComment';
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


export default function ParentsComment() {
  return (
    <div className={style.commentWrap}>
        <div className={style.writeWrap}>
            <div className={style.writer}>
                <div>
                    <img src={logo} />
                </div>
            </div>
            <div className={style.commentFormWrap}>
                <p>떨어진 단추</p>
                <p>와 완전 칼각이네여</p>
                <p><span>2023-11-28 </span> ・ <span> 답급 달기 </span> ・ <span> 신고 </span></p>
            </div>
        </div>
    </div>
  );
}