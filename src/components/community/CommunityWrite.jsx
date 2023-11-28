
import React, { useRef, useState } from 'react';
import style from "../../style/community/CommunityWrite.module.css";
import '../../style/Common.css';
import useFadeIn from '../../style/useFadeIn';
import back from '../../assets/img/back.png';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Editor } from '@toast-ui/react-editor';
// import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
// import 'tui-color-picker/dist/tui-color-picker.css';
// import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
// import '@toast-ui/editor/dist/i18n/ko-kr';
import CreateVote from './CreateVote';

export default function CommunityWrite() {
  const editorRef = useRef();
  const fadeIn = useFadeIn();
  

  const onChange = () => {
    const data = editorRef.current.getInstance().getHTML();
    console.log(data); // 에디터에 입력한 데이터
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={`fade-in ${fadeIn ? 'active' : ''}`}>
      <div className={style.titleWrap}>
        <h1 className='textCenter title textBold'>COMMUNITY</h1>
        <p className='textCenter subTitle'>쉽고 빠른 설문 플랫폼 어쩌고 저쩌고 입니다.</p>
      </div>
      <div className={style.writeWrap}>
        <div style={{ textAlign: 'center' }}>
          <input type='text' className={style.title} placeholder='제목을 입력해주세요.' />
        </div>
        <div className={style.editorWrap}>
          <div style={{ width: '1000px', margin: '0 auto' }}>
            {/* <Editor
              previewStyle="vertical"
              height="300px"
              initialEditType="wysiwyg"
              useCommandShortcut={false}
              plugins={[colorSyntax]}
              language="ko-KR"
              onChange={onChange}
              ref={editorRef}
            /> */}
          </div>
        </div>
        <div className={style.voteWrap}>
          <p>비즈서베이의 투표 기능을 이용해보세요!</p>
          <p>원하는 투표 내용을 직접 만들어 회원들의 의견을 확인할 수 있습니다</p>
          <button onClick={handleOpen}>투표 만들기</button>
        </div>
      </div>
      <div
        className={`${style.modalWrap} ${open ? style.fadeIn : ''}`}
        onClick={handleClose}
      >
        <div className={style.modal}  onClick={(e) => e.stopPropagation()} >
          <p className={style.title}>투표 추가하기</p>
          <CreateVote handleClose={handleClose} />
        </div>
        
      </div>
      <div style={{textAlign:'center', width:'1000px',margin:'0 auto', paddingTop:'80px'}}>
        <Link to={'/community'}>
            <Button variant="outlined" href="#contained-buttons" 
            sx={[{
              padding:'11px 30px',
              backgroundColor:'#fff', 
              color:'#243579', 
              border:'1px solid #243579' , 
              fontWeight:'bold', 
              marginBottom:'10px', 
              marginRight:'5px'
              },{':hover':{
                backgroundColor:'#f8f8f8'
              }}]}>
                취소
            </Button>
        </Link>
        <Link to={'/communityWrite'}>
            <Button variant="contained" href="#contained-buttons" 
            sx={[{
              padding:'11px 30px', 
              backgroundColor:'#243579', 
              fontWeight:'bold', 
              marginBottom:'10px', 
              border:'1px solid #243579', 
              boxShadow:0,
              marginLeft:'5px'},{':hover':{
                border:'1px solid #1976d2',
                boxShadow:0
              }}]}>
                저장
            </Button>
        </Link>
      </div>
      
      <img src={back} alt="배경" className={style.back} />
    </div>
  );
}
