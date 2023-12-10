import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Divider } from '@mui/material';
import BizModal from "../common/BizModal";
import Typography from '@mui/material/Typography';

const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'claimType', label: '신고 타입', minWidth: 100 },
  { id: 'logicalKey', label: '논리 키', minWidth: 50 },
  { id: 'claimReason', label: '신고 사유', minWidth: 150 },
  { id: 'userId', label: '사용자 ID', minWidth: 50 },
  { id: 'userName', label: '사용자 이름', minWidth: 100 },
];

const createData = (id, claimType, logicalKey, claimReason, userId, userName) => {
  return { id, claimType, logicalKey, claimReason, userId, userName };
};

const rows = [
  createData(1, '대댓글', 1, '스팸홍보/도배글', 2, '박주영'),
  createData(2, '대댓글', 1, '스팸홍보/도배글', 2, '손흥민'),
  createData(3, '대댓글', 1, '스팸홍보/도배글', 2, '손흥민'),
  createData(4, '대댓글', 1, '스팸홍보/도배글', 2, '손흥민'),
  createData(5, '대댓글', 1, '스팸홍보/도배글', 2, '손흥민'),
];

export const ReportedClaimList = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedRecord, setSelectedRecord] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleOpenModal = (recordId) => {
    setSelectedRecord(recordId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedRecord(null);
    setModalOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleApply = () => {
    console.log('Apply button clicked');
    handleCloseModal();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Use full height of the viewport
        backgroundColor: 'lightGray'
      }}
    >
      {/* First Table */}
      <Box sx={{ mb: 5 }}>
        <Paper sx={{ overflow: 'hidden', width: '100%' }} >
          <Typography variant="h6" gutterBottom>
            신고 미처리 내역
          </Typography>
          <Divider />
          <TableContainer sx={{ maxHeight: 440 }} >
            <Table stickyHeader aria-label="sticky table" >
              <TableHead sx={{ backgroundColor: 'red' }}>
                <TableRow sx={{ backgroundColor: 'lightblue' }}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align="center"
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      onClick={() => handleOpenModal(row.id)}
                    >
                      {columns.map((column) => (
                        <TableCell key={column.id} align="center">
                          {row[column.id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>

      {/* Second Table */}
      <Box sx={{ mt: 2 }}>
        <Paper sx={{ overflow: 'hidden', width: '100%' }} >
          <Typography variant="h6" gutterBottom>
            신고 처리 내역
          </Typography>
          <Divider />
          <TableContainer sx={{ maxHeight: 440 }} >
            <Table stickyHeader aria-label="sticky table" >
              <TableHead sx={{ backgroundColor: 'red' }}>
                <TableRow sx={{ backgroundColor: 'lightblue' }}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align="center"
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      onClick={() => handleOpenModal(row.id)}
                    >
                      {columns.map((column) => (
                        <TableCell key={column.id} align="center">
                          {row[column.id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>

      {/* Modal */}
      <BizModal isOpen={modalOpen} handleClose={handleCloseModal} title="신고 상세 내역">
        <Paper style={{ maxHeight: "500px", overflow: "auto" }}>
          {/* ... (your modal content) */}
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <Button onClick={handleApply} variant="contained" sx={{
            padding: '11px 30px',
            backgroundColor: '#243579',
            fontWeight: 'bold',
            border: '1px solid #243579',
            boxShadow: 0,
            marginLeft: '5px',
            ':hover': {
              border: '1px solid #1976d2',
              boxShadow: 0
            }
          }}>
            적용
          </Button>
        </Box>
      </BizModal>
    </Box>
  );
};