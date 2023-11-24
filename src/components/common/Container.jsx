import style from"../../style/Container.module.css"
import '../../style/Common.css'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import BizCard from './BizCard'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { BiComment } from "react-icons/bi";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import logo1 from '../../assets/img/1.jpg';
import logo2 from '../../assets/img/2.jpg';
import logo3 from '../../assets/img/3.jpeg';
import logo4 from '../../assets/img/4.jpg';
import { IoIosSearch } from "react-icons/io";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))

function Container(){
    return(
        <div className={style.container}>
            <h1 className='textCenter title textBold'>설문조사</h1>
            <p className='textCenter subTitle'>쉽고 파른 설문 플랫폼 어쩌고 저쩌고 입니다.</p>
            <div className={style.searchWrap}>
                <div>
                    <input type="text" className={style.searchInput} placeholder="검색어를 입력하세요"/>
                </div>
                <div className={style.searchBtn}>
                    <IoIosSearch size={35} color="#f8f8f8"/>
                </div>
            </div>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6} lg={3}>
                    <Card sx={{ maxWidth: '100%', width: '100%' }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="220"
                                image={logo1}
                                alt="thumbnail"
                            />
                            <CardContent>
                                <Typography gutterBottom component="div" >
                                    <div style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}><b>21년도 상반기 설문조사</b></div>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                                        <BiComment/>
                                        <span style={{margin: "0 5px 0 5px"}}>15</span>
                                    </div>
                                    <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                                        <IoPersonOutline />
                                        <span style={{margin: "0 5px 0 5px"}}>20</span>
                                    </div>
                                    <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                                        <MdOutlineRemoveRedEye />

                                        <span style={{margin: "0 5px 0 5px"}}>10</span>
                                    </div>
                                    <div style={{ border: "0.5px solid #D6D6D6", margin: "5px 0px 5px 0px"}}></div>
                                    <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                                    <MdDateRange />
                                        <span style={{margin: "0 5px 0 5px"}}>~ 2020-03-19</span></div>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Card sx={{ maxWidth: '100%', width: '100%' }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="220"
                                image={logo2}
                                alt="thumbnail"
                            />
                            <CardContent>
                                <Typography gutterBottom component="div" >
                                    <div style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}><b>21년도 상반기 설문조사</b></div>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                                        <BiComment/>
                                        <span style={{margin: "0 5px 0 5px"}}>15</span>
                                    </div>
                                    <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                                        <IoPersonOutline />
                                        <span style={{margin: "0 5px 0 5px"}}>20</span>
                                    </div>
                                    <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                                        <MdOutlineRemoveRedEye />

                                        <span style={{margin: "0 5px 0 5px"}}>10</span>
                                    </div>
                                    <div style={{ border: "0.5px solid #D6D6D6", margin: "5px 0px 5px 0px"}}></div>
                                    <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                                    <MdDateRange />
                                        <span style={{margin: "0 5px 0 5px"}}>~ 2020-03-19</span></div>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Card sx={{ maxWidth: '100%', width: '100%' }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="220"
                                image={logo3}
                                alt="thumbnail"
                            />
                            <CardContent>
                                <Typography gutterBottom component="div" >
                                    <div style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}><b>21년도 상반기 설문조사</b></div>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                                        <BiComment/>
                                        <span style={{margin: "0 5px 0 5px"}}>15</span>
                                    </div>
                                    <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                                        <IoPersonOutline />
                                        <span style={{margin: "0 5px 0 5px"}}>20</span>
                                    </div>
                                    <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                                        <MdOutlineRemoveRedEye />

                                        <span style={{margin: "0 5px 0 5px"}}>10</span>
                                    </div>
                                    <div style={{ border: "0.5px solid #D6D6D6", margin: "5px 0px 5px 0px"}}></div>
                                    <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                                    <MdDateRange />
                                        <span style={{margin: "0 5px 0 5px"}}>~ 2020-03-19</span></div>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Card sx={{ maxWidth: '100%', width: '100%' }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="220"
                                image={logo4}
                                alt="thumbnail"
                            />
                            <CardContent>
                                <Typography gutterBottom component="div" >
                                    <div style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}><b>21년도 상반기 설문조사</b></div>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                                        <BiComment/>
                                        <span style={{margin: "0 5px 0 5px"}}>15</span>
                                    </div>
                                    <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                                        <IoPersonOutline />
                                        <span style={{margin: "0 5px 0 5px"}}>20</span>
                                    </div>
                                    <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                                        <MdOutlineRemoveRedEye />

                                        <span style={{margin: "0 5px 0 5px"}}>10</span>
                                    </div>
                                    <div style={{ border: "0.5px solid #D6D6D6", margin: "5px 0px 5px 0px"}}></div>
                                    <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                                    <MdDateRange />
                                        <span style={{margin: "0 5px 0 5px"}}>~ 2020-03-19</span></div>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Card sx={{ maxWidth: '100%', width: '100%' }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="220"
                                image={logo3}
                                alt="thumbnail"
                            />
                            <CardContent>
                                <Typography gutterBottom component="div" >
                                    <div style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}><b>21년도 상반기 설문조사</b></div>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                                        <BiComment/>
                                        <span style={{margin: "0 5px 0 5px"}}>15</span>
                                    </div>
                                    <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                                        <IoPersonOutline />
                                        <span style={{margin: "0 5px 0 5px"}}>20</span>
                                    </div>
                                    <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                                        <MdOutlineRemoveRedEye />

                                        <span style={{margin: "0 5px 0 5px"}}>10</span>
                                    </div>
                                    <div style={{ border: "0.5px solid #D6D6D6", margin: "5px 0px 5px 0px"}}></div>
                                    <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                                    <MdDateRange />
                                        <span style={{margin: "0 5px 0 5px"}}>~ 2020-03-19</span></div>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Card sx={{ maxWidth: '100%', width: '100%' }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="220"
                                image={logo1}
                                alt="thumbnail"
                            />
                            <CardContent>
                                <Typography gutterBottom component="div" >
                                    <div style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}><b>21년도 상반기 설문조사</b></div>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                                        <BiComment/>
                                        <span style={{margin: "0 5px 0 5px"}}>15</span>
                                    </div>
                                    <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                                        <IoPersonOutline />
                                        <span style={{margin: "0 5px 0 5px"}}>20</span>
                                    </div>
                                    <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                                        <MdOutlineRemoveRedEye />

                                        <span style={{margin: "0 5px 0 5px"}}>10</span>
                                    </div>
                                    <div style={{ border: "0.5px solid #D6D6D6", margin: "5px 0px 5px 0px"}}></div>
                                    <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                                    <MdDateRange />
                                        <span style={{margin: "0 5px 0 5px"}}>~ 2020-03-19</span></div>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Card sx={{ maxWidth: '100%', width: '100%' }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="220"
                                image={logo4}
                                alt="thumbnail"
                            />
                            <CardContent>
                                <Typography gutterBottom component="div" >
                                    <div style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}><b>21년도 상반기 설문조사</b></div>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                                        <BiComment/>
                                        <span style={{margin: "0 5px 0 5px"}}>15</span>
                                    </div>
                                    <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                                        <IoPersonOutline />
                                        <span style={{margin: "0 5px 0 5px"}}>20</span>
                                    </div>
                                    <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                                        <MdOutlineRemoveRedEye />

                                        <span style={{margin: "0 5px 0 5px"}}>10</span>
                                    </div>
                                    <div style={{ border: "0.5px solid #D6D6D6", margin: "5px 0px 5px 0px"}}></div>
                                    <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                                    <MdDateRange />
                                        <span style={{margin: "0 5px 0 5px"}}>~ 2020-03-19</span></div>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Card sx={{ maxWidth: '100%', width: '100%' }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="220"
                                image={logo2}
                                alt="thumbnail"
                            />
                            <CardContent>
                                <Typography gutterBottom component="div" >
                                    <div style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}><b>21년도 상반기 설문조사</b></div>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                                        <BiComment/>
                                        <span style={{margin: "0 5px 0 5px"}}>15</span>
                                    </div>
                                    <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                                        <IoPersonOutline />
                                        <span style={{margin: "0 5px 0 5px"}}>20</span>
                                    </div>
                                    <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                                        <MdOutlineRemoveRedEye />

                                        <span style={{margin: "0 5px 0 5px"}}>10</span>
                                    </div>
                                    <div style={{ border: "0.5px solid #D6D6D6", margin: "5px 0px 5px 0px"}}></div>
                                    <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center", fontSize: "12px"}}>
                                    <MdDateRange />
                                        <span style={{margin: "0 5px 0 5px"}}>~ 2020-03-19</span></div>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                
            </Grid>
        </div>
    )
}

export default Container;