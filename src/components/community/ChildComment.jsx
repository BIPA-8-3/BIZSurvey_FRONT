import * as React from 'react';
import style from"../../style/community/ChildComment.module.css"
import '../../style/Common.css'
import logo from "../../assets/img/avatar.png"
import ChildCommentForm from './ChildCommentForm';


export default function ChildComment({props}) {
    const data = Array.isArray(props) ? props : [];
    console.log(data)

  return (
    data.map(item =>(
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
                                <p>{item.nickName}</p>
                                <p>{item.content}</p>
                                <p><span>{item.createTime}</span> ・ <span>답글 달기</span> ・ <span> 신고 </span></p>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        
        </div>
        )
    )

  );
}