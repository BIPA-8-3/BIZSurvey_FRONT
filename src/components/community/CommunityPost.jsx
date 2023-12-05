import React, { useState, useEffect }  from 'react';
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
import CommunityTable from './CommunityTable';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Loader from "../../pages/loader/Loader"



export default function CommunityPost() {

  const [data, setData] = useState([]);
  console.log("데이타"+data)
  console.log("총 페이지 수"+data.totalPages)
  const [loading, setLoading] = useState(true);
  const fadeIn = useFadeIn();
  
  useEffect(() => {
    // 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/community');
        console.log(response);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // 데이터 로딩이 끝났음을 표시
      }
    };

    fetchData(); // 함수 호출
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행되도록 함

  if (loading) {
    return <>
      <Loader />
    </>; // 데이터 로딩 중에는 로딩 표시
  }

  const handlePage = (event) => {
    const nowPageInt = parseInt(event.target.outerText)
    // page에 해당하는 페이지로 GET 요청을 보냄
    axios.get(`http://localhost:8080/community?page=${nowPageInt-1}`)
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
          <h1 className='textCenter title textBold'>커뮤니티</h1>
          <p className='textCenter subTitle'>쉽고 빠른 설문 플랫폼 어쩌고 저쩌고 입니다.</p>
      </div>
      <Search></Search>

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