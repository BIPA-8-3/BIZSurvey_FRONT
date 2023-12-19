import React from "react";
import { Container, Paper, Typography, Divider } from "@mui/material";
import SaveButton from "../common/SaveButton";
import Chart from "../common/Chart";

const VoteResult = ({ data }) => {
  const chartData = [
    { value: 15, name: "산책하자" },
    { value: 40, name: "하지말자" },
    { value: 20, name: "집에가자" },
    { value: 20, name: "미쳤다" },
  ];

  // 등수 계산 및 정렬
  const sortedChartData = chartData.slice().sort((a, b) => b.value - a.value);
  const rankData = sortedChartData.map((item, index) => ({
    ...item,
    rank: index + 1,
  }));

  return (
    <Container sx={{ mt: 10, width: 1000 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          투표 결과
        </Typography>
        <Divider sx={{ my: 2, width: "100%" }} />

        <div style={{ display: "flex" }}>
          <div>
            <Chart chartData={chartData} />
          </div>
          <div style={{ marginTop: "30px" }}>
            {rankData.map((item, index) => (
              <div
                key={index}
                style={{ textAlign: "center", marginTop: "20px" }}
              >
                <h2
                  style={{
                    fontSize: "1rem",
                    fontWeight: item.rank === 1 ? "bold" : "normal",
                  }}
                >
                  {item.rank === 1
                    ? `${item.rank}등: ${item.name} (${item.value}%) 👑`
                    : `${item.rank}등: ${item.name} (${item.value}%)`}
                </h2>
              </div>
            ))}
          </div>
        </div>
        {/* 구분선 */}
        <Divider sx={{ my: 2, width: "100%" }} />
        <SaveButton></SaveButton>
      </Paper>
    </Container>
  );
};

export default VoteResult;
