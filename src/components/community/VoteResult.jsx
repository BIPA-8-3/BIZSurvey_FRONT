import React from 'react';
import { Container, Paper, Typography, Divider } from '@mui/material';
import SaveButton from '../common/SaveButton';
import { PieChart } from '@mui/x-charts/PieChart';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const VoteResult = () => {
  // 투표 결과 데이터 (임시 데이터 예시)
  const seriesData = [
    { id: 0, value: 15, label: '산책하자' },
    { id: 1, value: 40, label: '하지말자' },
    { id: 2, value: 20, label: '하자자자' },
    { id: 3, value: 20, label: '미쳤다' },
  ];

  // 최대값을 가진 항목 찾기
  const maxItem = seriesData.reduce((prev, current) => (prev.value > current.value ? prev : current), {});

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" gutterBottom>
          투표 결과
        </Typography>
        <Divider sx={{ my: 2, width: '100%' }} />

        <PieChart
          series={[
            {
              data: seriesData,
            },
          ]}
          width={400}
          height={200}
        />

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <h2>
            1위 : {maxItem.label}
            <EmojiEventsIcon style={{ fontSize: '20px', verticalAlign: 'middle', marginLeft: '5px' }} />
          </h2>
        </div>

        {/* 구분선 */}
        <Divider sx={{ my: 2, width: '100%' }} />
        <SaveButton></SaveButton>
      </Paper>
    </Container>
  );
};

export default VoteResult;