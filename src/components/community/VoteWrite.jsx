import * as React from 'react';
import style from"../../style/community/VoteWrite.module.css"
import '../../style/Common.css'
import useFadeIn from '../../style/useFadeIn';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


export default function CommunityPost() {
    const [value, setValue] = React.useState('female');

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const fadeIn = useFadeIn();
 
    return (
        <div className={style.voteWriteWrap}>
            <div className={style.voteTitleWrap}>
                <h2><span className={style.voteSpan}>투표</span> 여러분들은 무슨 커피를 좋아하시나요?</h2>
            </div>
            <div className={style.voteContentWrap}>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={value}
                        onChange={handleChange}>
                        <FormControlLabel value="아이스 아메리카노" control={<Radio />} label="아이스 아메리카노" />
                        <FormControlLabel value="따듯한 아메리카노" control={<Radio />} label="따듯한 아메리카노" />
                        <FormControlLabel value="카페 라떼" control={<Radio />} label="카페 라떼" />
                        <FormControlLabel value="카푸치노" control={<Radio />} label="카푸치노" />
                        <FormControlLabel value="맥심 믹스 커피" control={<Radio />} label="맥심 믹스 커피" />
                    </RadioGroup>
                </FormControl>
            </div>
            <div className={style.btnWrap}>
                <Button variant="contained" href="#contained-buttons" 
                sx={[{
                padding:'8px 20px', 
                backgroundColor:'#243579', 
                fontWeight:'bold', 
                marginBottom:'10px', 
                border:'1px solid #243579', 
                boxShadow:0,
                marginLeft:'5px'},{':hover':{
                    border:'1px solid #1976d2',
                    boxShadow:0
                }}]}>
                    투표하기
                </Button>
            </div>
        </div>
    );
}