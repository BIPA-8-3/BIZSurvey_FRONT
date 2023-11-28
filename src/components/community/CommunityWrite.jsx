import React, { useRef } from 'react';
import style from"../../style/community/CommunityWrite.module.css"
import '../../style/Common.css'
import useFadeIn from '../../style/useFadeIn';
import back from '../../assets/img/back.png'
import Button from '@mui/material/Button';
import logo from "../../assets/img/avatar.png"
import { Link } from 'react-router-dom';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';

export default function CommunityWrite() {
  const editorRef = useRef();
  const fadeIn = useFadeIn();

  const onChange = () => {
    const data = editorRef.current.getInstance().getHTML();
    console.log(data);
  };
 
  return (
    <div className={`fade-in ${fadeIn ? 'active' : ''}`}>
        <div className={style.titleWrap}>
            <h1 className='textCenter title textBold'>COMMUNITY</h1>
            <p className='textCenter subTitle'>쉽고 빠른 설문 플랫폼 어쩌고 저쩌고 입니다.</p>
        </div>
        <div className={style.writeWrap}>
            <div style={{textAlign:'center'}}>
                <input type='text' className={style.title} placeholder='제목을 입력해주세요.'/>
            </div>
            <div className={style.editorWrap}>
                <div style={{width:'1000px', margin: '0 auto'}}>
                    <Editor
                        previewStyle="vertical"
                        height="600px"
                        initialEditType="wysiwyg"
                        useCommandShortcut={false}
                        plugins={[colorSyntax]}
                        language="ko-KR"
                        onChange={onChange}
                        ref={editorRef}/>
                </div>
            </div>
        </div>
        <img src={back} alt="배경" className={style.back}/>
    </div>
  );
}