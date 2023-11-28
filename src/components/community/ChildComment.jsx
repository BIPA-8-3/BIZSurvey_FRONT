import * as React from 'react';
import style from"../../style/community/ChildComment.module.css"
import '../../style/Common.css'
import logo from "../../assets/img/avatar.png"


export default function ChildComment() {
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
                            <p>떨어진 단추</p>
                            <p>와 완전 칼각이네여</p>
                            <p><span>2023-11-28 </span> ・ <span> 답급 달기 </span> ・ <span> 신고 </span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

  );
}