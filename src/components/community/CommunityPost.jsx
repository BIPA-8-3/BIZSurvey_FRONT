import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { Tabs, Tab } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Search from '../common/Search';
import { useState } from 'react';

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
    
    <TableContainer component={Paper} sx={{ marginTop: 20}}>
    <Search></Search>
      
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
              <TableCell align="center">"제목입니다"</TableCell>
              <TableCell align="center">"(사람 아이콘)조회수"</TableCell>
              <TableCell align="right">"(댓글 아이콘)댓글수"</TableCell>
              <TableCell align="right">"(시계 아이콘) 생성시간"</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}