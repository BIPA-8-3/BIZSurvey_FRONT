import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { BiComment } from "react-icons/bi";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import logo from '../../assets/img/thumbnail.png';
import Box from '@mui/material/Box';




export default function BizCard({data}) {
    return (

        <Card sx={{ maxWidth: 345, width: 300}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={logo}
                    alt="thumbnail"
                />
                <CardContent>
                    <Typography gutterBottom component="div" >
                        <div style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}><b>{data.title}</b></div>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                            <BiComment/>
                            <span style={{margin: "0 5px 0 5px"}}>{data.comment}</span>
                        </div>
                        <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                            <IoPersonOutline />
                            <span style={{margin: "0 5px 0 5px"}}>{data.participant}</span>
                        </div>
                        <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                            <MdOutlineRemoveRedEye />

                            <span style={{margin: "0 5px 0 5px"}}>{data.view}</span>
                        </div>
                        <div style={{ border: "0.5px solid #D6D6D6", margin: "5px 0px 5px 0px"}}></div>
                        <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                        <MdDateRange />
                            <span style={{margin: "0 5px 0 5px"}}>~ {data.date}</span></div>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>

    );
}