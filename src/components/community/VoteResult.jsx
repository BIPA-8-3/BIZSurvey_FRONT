import React, { useEffect, useRef, useState } from "react";
import { Container, Paper, Typography, Divider } from '@mui/material';
import SaveButton from '../common/SaveButton';



const VoteResult = () => {
  

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" gutterBottom>
          투표 결과
        </Typography>
        <Divider sx={{ my: 2, width: '100%' }} />



       

        {/* 구분선 */}
        <Divider sx={{ my: 2, width: '100%' }} />
        <SaveButton></SaveButton>
      </Paper>
    </Container>
  );
};

export default VoteResult;
