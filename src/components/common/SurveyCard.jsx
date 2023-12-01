import React, { useState } from 'react';
import style from '../../style/Card.module.css';
import '../../style/Common.css';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { BiComment } from 'react-icons/bi';
import { IoPersonOutline } from 'react-icons/io5';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { MdDateRange } from 'react-icons/md';
import logo1 from '../../assets/img/1.jpg';
import logo from '../../assets/img/avatar.png'
import Search from './Search';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function SurveyCard({ data }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleMouseOver = (index) => {
    setHoveredCard(index);
  };

  const handleMouseOut = () => {
    setHoveredCard(null);
  };

  const renderCard = (cardData) => (
    
    <Grid item xs={12} md={6} lg={3} key={cardData.id}>
      <Link to={'/surveyCommunityDetail'}>
        <div
        key={cardData.id}
        className={`${style.cardWrap}`}
        onMouseOver={() => handleMouseOver(cardData.id)}
        onMouseOut={handleMouseOut}
        >
        <div className={style.cardThumnail}>
            <img src='http://localhost:3000/static/media/1.85b24f5bdde08e1546d7.jpg' alt="logo" 
            className={`${style.img} ${hoveredCard === cardData.id ? `${style.scaleUp}` : ''}`}
            />
        </div>
        <div className={`${style.cardText} ${hoveredCard === cardData.id ? `${style.colorCh}` : ''}`}>
            <div className={style.profil}>
                <span className={style.photo}>
                    <img className='' src={logo}/>
                </span>
                <span className={style.nickname}>{cardData.nickname}</span>
            </div>
            <h1>{cardData.title}</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className={style.count}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
                        <BiComment />
                        <span style={{ margin: '0 5px 0 5px' }}>{cardData.comment}</span>
                    </div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
                        <IoPersonOutline />
                        <span style={{ margin: '0 5px 0 5px' }}>{cardData.participant}</span>
                    </div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
                        <MdOutlineRemoveRedEye />
                        <span style={{ margin: '0 5px 0 5px' }}>{cardData.view}</span>
                    </div>
                </div>
                <div className={style.count}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
                        <MdDateRange />
                        <span style={{ margin: '0 5px 0 5px' }}>{cardData.date}</span>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </Link>
        </Grid>
       
  );
  return (
    <Grid container spacing={4}>
      {data.map(renderCard)}
    </Grid>
  );
}

export default SurveyCard;
