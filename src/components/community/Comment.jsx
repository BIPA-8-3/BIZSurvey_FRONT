import * as React from 'react';
import style from"../../style/community/Comment.module.css"
import '../../style/Common.css'
import logo from "../../assets/img/avatar.png"
import ParentsComment from './ParentsComment';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


export default function Comment() {
  return (
    <div>
        <div className={style.commentWrap}>
            <div className={style.writeWrap}>
                <div className={style.writer}>
                    <div>
                        <img src={logo} />
                    </div>
                </div>
                <div className={style.commentFormWrap}>
                    <input type='text' placeholder='칭찬과 격려의 댓글은 작성자에게 큰 힘이 됩니다:)'/>
                    <span className={style.writeBtn}>입력</span>
                </div>
            </div>
        </div>
    </div>

  );
}