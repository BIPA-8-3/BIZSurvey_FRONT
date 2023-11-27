import * as React from 'react';
import style from"../../style/Container.module.css"
import '../../style/Common.css'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { Tabs, Tab } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PersonIcon from '@mui/icons-material/Person';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Search from '../common/Search';
import { useState } from 'react';

import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


export default function CommunityPost() {

  const [value, setValue] = useState(0); // Initial value, change as needed
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 
  return (

   

    <>
    <TableContainer sx={{ marginTop: 20}}>
    <Search></Search>

    <div className={style.titleWrap}>
        <h1 className='textCenter title textBold'>게시판</h1>
        <p className='textCenter subTitle'>비즈서베이 커뮤니티입니다.</p>
    </div>
    
    <Tabs value={value} onChange={handleChange} centered>
      <Tab
        label="실시간 인기"
        sx={{ fontWeight: value === 0 ? 'bold' : 'normal' }}
      />
      <Tab
        label="최근순"
        sx={{ fontWeight: value === 1 ? 'bold' : 'normal' }}
      />
    </Tabs>
      <Table sx={{ margin: 'auto', width: 1200}} aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0} }}
            >
              <TableCell align="left">"제목입니다"</TableCell>
              <TableCell align="center"><AlternateEmailIcon />닉네임</TableCell>
              <TableCell align="center"><PersonIcon /> [120]</TableCell>
              <TableCell align="right"><CommentIcon />[50]</TableCell>
              <TableCell align="right"><AccessTimeIcon />12:57</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <div style={{width : '1200px', margin : '0 auto'}} >
    <Stack spacing={1} sx={{margin: 'auto', float : 'right' }}>
      <Pagination
        count={10}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </Stack>
    </div>

    </>
  );
}