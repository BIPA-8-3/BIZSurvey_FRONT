import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import MoreMenu from "./MoreMenu";
import {FaCirclePlus} from "react-icons/fa6";


export default function BizCard2({}){

    if (true){
        return (
            <Card sx={{ maxWidth: 345, height: 160, width: 260}}>
                <CardActionArea style={{height: "100%"}}>
                    <div style={{textAlign:"right"}}>
                        <div style={{display: "inline-block", transform :"rotate(90deg)", marginRight: "10px"}}>
                            <MoreMenu></MoreMenu>
                        </div>
                    </div>

                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            <div style={{fontSize: "17px",whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                                설문지 제목1231232132131231
                            </div>
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            <div style={{marginTop: "15px"}}>등록일</div>

                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );

    }else {
        return (
            <Card sx={{ maxWidth: 345, height: 180, width: 260}}>
                <CardActionArea style={{height: "100%", backgroundColor: "#f4f4f4"}}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            <div style={{padding: "40px", height:"100%", textAlign:"center"}}>
                            <span style={{textAlign:"center", color:"#c2c2c2", fontSize:"46pt"}}>
                                <FaCirclePlus /></span>
                            </div>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }


}