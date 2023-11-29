import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import ListItem from "@mui/material/ListItem";
import { FixedSizeList } from "react-window";

import * as React from "react";
import DraftsIcon from "@mui/icons-material/Drafts";
import { useState } from "react";
import Chart from "./fields/Chart";
import Text from "./fields/Text";
import TextResult from "./fields/Text";

export default function PostResult() {
  const chartData = [
    {
      value: 1048,
      name: "Search Engiasdfasdsadffffffffdfdsafsafsadfdsfsdfsfdsafdsafasdnasdfe",
    },
    { value: 735, name: "Direct" },
    { value: 580, name: "Email" },

    { value: 735, name: "Diredt" },
    { value: 580, name: "Emagil" },
    { value: 484, name: "Union sfAds" },
    { value: 300, name: "Video dfAds" },
  ];

  const [userInfo, serUserInfo] = useState([
    {
      userId: 1,
      nickname: "nick1",
    },
    {
      userId: 2,
      nickname: "nick2",
    },
    {
      userId: 3,
      nickname: "nick3",
    },
    {
      userId: 4,
      nickname: "nick4",
    },
    {
      userId: 5,
      nickname: "nick5",
    },
  ]);

  const [result, setResult] = useState({
    ChartAndTextResponse: [
      {
        questionId: 1,
        questionType: "주관식",
        step: 2,
        answers: [
          {
            answer: "asdf",
            count: 1,
          },
          {
            answer: "432",
            count: 1,
          },
          {
            answer: "546",
            count: 3,
          },
        ],
      },
      {
        questionId: 1,
        questionType: "객관식(택1)",
        step: 1,
        answers: [
          {
            answer: "asdf",
            count: 3,
          },
          {
            answer: "432",
            count: 2,
          },
          {
            answer: "546",
            count: 3,
          },
        ],
      },
    ],
    FileResultResponse: [
      {
        questionId: 4,
        questionType: "FILE",
        step: 3,
        fileInfos: [
          {
            filename: "file1",
            url: "url1",
          },
          {
            filename: "file2",
            url: "url2",
          },
        ],
      },
    ],
  });

  return (
    <>
      {/* 응답한 사용자 목록  */}
      <div
        style={{
          width: "700px",
          backgroundColor: "white",
          borderRadius: "10px",
          minHeight: "150px",
          border: "1px solid #D6D6D6",
          borderTop: "10px solid #119FB3",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          margin: "0 auto",
          marginBottom: "25px",
        }}
      >
        <div
          style={{
            padding: "16px 0 16px 30px",
            fontSize: "18px",
            fontWeight: " 500",
            borderBottom: "1px solid #D6D6D6",
          }}
        >
          응답한 사용자
        </div>
        <div style={{ width: "680px", margin: "0 auto" }}>
          <FixedSizeList
            height={200}
            width={680}
            itemSize={46}
            itemCount={userInfo.length}
            overscanCount={5}
          >
            {({ index }) => <UserList index={index} userInfo={userInfo} />}
          </FixedSizeList>
        </div>
      </div>

      {/* 통계들  */}

      <QuestionPostResult chartData={chartData} />
    </>
  );
}

function UserList({ index, userInfo }) {
  const user = userInfo[index];

  return (
    <ListItem
      style={{ width: "650px", margin: "0 auto" }}
      key={user.userId}
      component="div"
      disablePadding
    >
      <ListItemButton>
        <ListItemText primary={`${index + 1}: ${user.nickname}`} />
      </ListItemButton>
    </ListItem>
  );
}

function QuestionPostResult({ chartData }) {
  return (
    <>
      <div>
        <div
          style={{
            width: "700px",
            backgroundColor: "white",
            borderRadius: "10px",
            minHeight: "150px",
            border: "1px solid #D6D6D6",
            borderTop: "10px solid #0171D1",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            margin: "0 auto",
            marginBottom: "25px",
          }}
        >
          {/* 제목 */}
          <div style={{ marginTop: "20px" }}>
            <div style={{ margin: "0 auto", width: "600px" }}>
              <p
                style={{
                  fontWeight: "bold",
                  width: "600px",
                }}
              >
                제목
              </p>
            </div>
          </div>

          {/*옵션들 */}
          <div>
            <div
              style={{
                marginBottom: "30px",
                backgroundColor: "white",
                width: "600px",
                height: "240px",
                margin: "0 auto",
                marginBottom: "30px",
              }}
            >
              <Chart chartData={chartData} />
              {/* <TextResult /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
