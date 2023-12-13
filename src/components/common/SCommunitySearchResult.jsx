import style from"../../style/Container.module.css"
import '../../style/Common.css'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import back from '../../assets/img/back.png'
import SurveyCard from "./SurveyCard";
import Search from './Search'
import useFadeIn from "../../style/useFadeIn";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import axios from 'axios'
import Loader from "../../pages/loader/Loader"
import { useLocation } from "react-router-dom";
import SCommunitySearch from "./SCommunitySearch";



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))

function SurveyCommunitySearchResult(){

  const [page, setPage] = useState(0); // 현재 페이지 번호 (페이지네이션)
  const [ref, inView] = useInView();

  const location = useLocation();
  let keyword = location.state.keyword;
  let result = location.state.result; // content
  //alert("넘겨 받은 친구(설문 검색 결과)"+JSON.stringify(result));

  const [data, setData] = useState({
    content:[]
  });

    useEffect(()=> {
      setData(result)
    }, [result])
  
    

  const dataFetch = () => {

      console.log('데이터 라스트'+ data.last)

      let plag = true;

      if(data.last){

        plag = false;
      }
      
      if(plag){
      axios
      .get(`http://localhost:8080/s-community/search?keyword=${keyword}&page=${page}`)
      .then((res) => {
        setData((prevData) => {
          return {
            ...res.data,
            content: [...prevData.content, ...res.data.content],
          };
        });
         setPage((prevPage) => prevPage + 1);
     })
      .catch((err) => {
        console.log(err);
     });

    }
  
  };

  useEffect(() => {
    // inView가 true 일때만 실행한다.
    if (inView) {
      console.log(inView, '무한 스크롤 요청 🎃')
      dataFetch();
    }
    }, [inView]);

    const fadeIn = useFadeIn();
    return(
        <div className={`fade-in ${fadeIn ? 'active' : ''}`}>
            <div className={style.titleWrap}>
                <h1 className='textCenter title textBold'>설문 게시물 결과</h1>
                <p className='textCenter subTitle'>쉽고 빠른 설문 플랫폼 어쩌고 저쩌고 입니다.</p>
            </div>
            <SCommunitySearch />
            <div style={{textAlign:'right'}}>
                <Link to={'/surveyCommunityWrite'}>
                    <Button variant="contained" href="#contained-buttons" 
                    sx={{
                    padding:'11px 30px', 
                    backgroundColor:'#243579', 
                    fontWeight:'bold',
                    marginBottom:'10px',
                    boxShadow:0,}}>
                        설문 등록
                    </Button>
                </Link>
            </div>
            <SurveyCard data={data.content} />
            
            <img src={back} alt="배경" className={style.back}/>
            <div ref={ref}></div>
        </div>
    )
}

export default SurveyCommunitySearchResult;