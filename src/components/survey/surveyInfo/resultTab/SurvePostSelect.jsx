import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import * as React from "react";
import { useState } from "react";

export default function SurveyPostSelect() {
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
      {/* 게시물 선택 select  */}
      <div
        style={{
          width: "700px",
          margin: "0 auto",
          textAlign: "center",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
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
    </>
  );
}
