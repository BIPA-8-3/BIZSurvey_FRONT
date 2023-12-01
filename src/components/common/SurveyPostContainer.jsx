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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))

function SurveyPostContainer(){
    const fadeIn = useFadeIn();
    return(
        <div className={`fade-in ${fadeIn ? 'active' : ''}`}>
            <div className={style.titleWrap}>
                <h1 className='textCenter title textBold'>설문 참여</h1>
                <p className='textCenter subTitle'>쉽고 빠른 설문 플랫폼 어쩌고 저쩌고 입니다.</p>
            </div>
            <Search></Search>
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
            <SurveyCard data={[
                {id: 1, title: '21년 상반기 설문조사', nickname: '닉네임', comment: 15, participant: 20, view : 10, date : '2020-03-13' }, 
                {id: 2, title: '21년 상반기 설문조사', nickname: '닉네임', comment: 15, participant: 20, view : 10, date : '2020-03-13' },
                {id: 3, title: '21년 상반기 설문조사', nickname: '닉네임', comment: 15, participant: 20, view : 10, date : '2020-03-13' }, 
                {id: 4, title: '21년 상반기 설문조사', nickname: '닉네임', comment: 15, participant: 20, view : 10, date : '2020-03-13' },
                {id: 5, title: '21년 상반기 설문조사', nickname: '닉네임', comment: 15, participant: 20, view : 10, date : '2020-03-13' }, 
                {id: 6, title: '21년 상반기 설문조사', nickname: '닉네임', comment: 15, participant: 20, view : 10, date : '2020-03-13' },
                {id: 7, title: '21년 상반기 설문조사', nickname: '닉네임', comment: 15, participant: 20, view : 10, date : '2020-03-13' }, 
                {id: 8, title: '21년 상반기 설문조사', nickname: '닉네임', comment: 15, participant: 20, view : 10, date : '2020-03-13' }
            ]} />
            
            <img src={back} alt="배경" className={style.back}/>
        </div>
    )
}

export default SurveyPostContainer;