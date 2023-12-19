import React, { useState, useEffect }  from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import style from"../../style/community/CommunityPost.module.css"
import '../../style/Common.css'
import Search from '../common/Search';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useFadeIn from '../../style/useFadeIn';
import back from '../../assets/img/back.png'
import CommunityTable from '../community/CommunityTable';
import Button from '@mui/material/Button';
import logo from "../../assets/img/avatar.png"
import Loader from "../../pages/loader/Loader"


export default function SearchResultTable(){
    // let location = useLocation(); // 넘어온 결과 
    // let result = location.state.result;
    
    const location = useLocation();
    
    let keyword = location.state.keyword;
    let result = location.state.result;
    console.log("키워드드ㅡ드드드드드"+JSON.stringify(keyword));
    console.log(JSON.stringify(result));
    
    
    const fadeIn = useFadeIn();
    const [data, setData] = useState({});

    useEffect(()=> {
      
      setData(result)
      
      
    }, [result])
    
    
   

    const handlePage = (event) => {
        const nowPageInt = parseInt(event.target.outerText)
        // page에 해당하는 페이지로 GET 요청을 보냄
        axios.get(`http://localhost:8080/community/search?keyword=${keyword}&page=${nowPageInt-1}`)
          .then(response => {
            setData(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      };

    return (
      
  
        <div className={`fade-in ${fadeIn ? 'active' : ''}`}>
          <div className={style.titleWrap}>
              <h1 className='textCenter title textBold'>'{keyword}' 검색 결과</h1>
              <p className='textCenter subTitle'>쉽고 빠른 설문 플랫폼 어쩌고 저쩌고 입니다.</p>
          </div>
          <Search> </Search>
    
        <div style={{textAlign:'right'}}>
            <Link to={'/communityWrite'}>
                <Button variant="contained" href="#contained-buttons" 
                sx={{
                  padding:'11px 30px', 
                  backgroundColor:'#243579', 
                  fontWeight:'bold',
                  marginBottom:'10px',
                  boxShadow:0,}}>
                    글쓰기
                </Button>
            </Link>
        </div>
        <CommunityTable props={data.content} />
        <div style={{width : '1200px', margin : '0 auto', marginTop:'20px'}} >
        
        <Stack spacing={1} sx={{margin: '0 auto', float : 'right' }}>
        <Pagination
              count={data.totalPages}
              renderItem={(item) => (
          <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
              />
            )}
            onChange={(e) => handlePage(e)}
        />
        </Stack>
        </div>
        <img src={back} alt="배경" className={style.back}/>
        </div>
      );


}