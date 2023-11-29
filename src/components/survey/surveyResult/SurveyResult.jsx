import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { useEffect, useState } from "react";
import PostResult from "./PostResult";

export default function SurveyResult() {
  const [postId, setPostId] = useState("");

  const [postInfo, setPostInfo] = useState([
    {
      postId: 1,
      title: "123",
    },
    {
      postId: 2,
      title: "1234",
    },
    {
      postId: 3,
      title: "12345",
    },
  ]);

  const handleChange = (event) => {
    setPostId(event.target.value);
  };

  return (
    <>
      <div style={{ width: "700px", margin: "0 auto", textAlign: "center" }}>
        <FormControl sx={{ minWidth: 700 }}>
          <Select
            value={postId}
            onChange={handleChange}
            displayEmpty
            inputProps={{
              "aria-label": "Without label",
            }}
          >
            <MenuItem value="">
              <em style={{ color: "grey" }}>== 게시물 선택 ==</em>
            </MenuItem>
            {postInfo.map((post) => (
              <MenuItem key={post.postId} value={post.postId}>
                {post.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* 통계영역 */}
      {/* 전체 Or 개별  */}

      <PostResult />

      <div></div>
    </>
  );
}
