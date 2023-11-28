
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../../../style/Common.css'
import { FaListOl } from "react-icons/fa";
import {IoPersonOutline} from "react-icons/io5";
import IconWithText from "../../common/IconWithText";
import { GrTextAlignFull } from "react-icons/gr";
import { MdDateRange } from "react-icons/md";
import { IoMdCloudUpload } from "react-icons/io";





export default function OptionSelect({option, setOption, idx}){

    const handleChange = (event) => {
        setOption(idx, event.target.value);
        console.log(option);
    };

    const menuItemStyle = {
        padding: '5px 0 5px 10px !important',
        width: '150px',
        height: '37px',
        backgroundColor:'white'
    };

    return(

            <FormControl sx={{ m: 1, minWidth: 100, height: 35 , padding: 0}} >
                <Select
                    value={option}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label'}}
                    sx={menuItemStyle}
                >
                    <MenuItem value="" sx={{fontSize : 12}}>
                        <p style={{fontSize: '13px'}}>옵션</p>
                    </MenuItem>
                    <MenuItem value={'객관식(택1)'} sx={{width: 150, padding: 1.5}}>
                        <div style={{borderRadius: "40px",backgroundColor: "#dfebff", width: "50px", padding:"1px 4px 1px 6px", textAlign: "center"}}>
                            <IconWithText text={'객관식'} fontsize={'10.5px'} fontweight={'bold'} fontcolor={"#304eb9"}>
                                <FaListOl />
                            </IconWithText>
                        </div>
                    </MenuItem>
                    <MenuItem value={'객관식(복수선택)'} sx={{width: 150, padding: 1.5}}>
                        <div style={{borderRadius: "40px",backgroundColor: "#dfebff", width: "90px", padding:"1px 4px 1px 6px", textAlign: "center"}}>
                            <IconWithText text={'객관식(다중선택)'} fontsize={'10.5px'} fontweight={'bold'} fontcolor={"#304eb9"}>
                                <FaListOl />
                            </IconWithText>
                        </div>
                    </MenuItem>
                    <MenuItem value={'주관식'} sx={{width: 150, padding: 1.5}}>
                        <div style={{borderRadius: "40px", backgroundColor: "#f1fde6", width: "50px", padding:"1px 4px 1px 6px",textAlign: "center"}}>
                        <IconWithText text={'주관식'} fontsize={'10.5px'} fontweight={'bold'} fontcolor={'#48940c'}>
                            <GrTextAlignFull />
                        </IconWithText>
                        </div>
                    </MenuItem>
                    <MenuItem value={'날짜'} sx={{width: 150, padding: 1.5}}>
                        <div style={{borderRadius: "40px", backgroundColor: "#f3e3ff", width: "50px", padding:"1px 4px 1px 6px", textAlign: "center"}}>
                        <IconWithText text={'날짜'} fontsize={'10.5px'} fontweight={'bold'} fontcolor={'#7a33b0'}>
                            <MdDateRange />
                        </IconWithText>
                        </div>
                    </MenuItem>
                    <MenuItem value={'파일'} sx={{width: 150, padding: 1.5}}>
                        <div style={{borderRadius: "40px", backgroundColor: "#ffedee", width: "50px", padding:"1px 4px 1px 6px", textAlign: "center"}}>
                        <IconWithText text={'파일'} fontsize={'10.5px'} fontweight={'bold'} fontcolor={'#d02322'}>
                            <IoMdCloudUpload />
                        </IconWithText>
                        </div>
                    </MenuItem>
                </Select>
            </FormControl>


    );

}