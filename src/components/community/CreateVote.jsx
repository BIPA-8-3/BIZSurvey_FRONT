// CreateVote.jsx

import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import style from "../../style/community/CommunityWrite.module.css";
import Button from "@mui/material/Button";

const CreateVote = ({
  handleClose,
  setTitle,
  setOptions,
  voteTitle,
  voteOptions,
  setVote,
}) => {
  const [pass, setPass] = useState(true);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...voteOptions];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...voteOptions, ""]);
  };

  const handleRemoveOption = (index) => {
    if (voteOptions.length > 1) {
      const newOptions = [...voteOptions];
      newOptions.splice(index, 1);
      setOptions(newOptions);
    } else {
      return;
    }
  };

  const handleVoteSubmit = () => {
    // 여기에서 투표를 서버에 제출하는 로직을 추가할 수 있습니다.
    const isEmptyTitle = voteTitle.trim() === "" ? true : false;
    const isEmptyOption = voteOptions.some((option) => option.trim() === "");
    if (isEmptyTitle || isEmptyOption) {
      setPass(false);
      return;
    }
    setVote(true);
    handleClose();
  };

  const handleBlurTitle = () => {
    if (voteTitle.trim() === "") {
      setPass(false);
    } else {
      setPass(true);
    }
  };

  const handleBlurOption = (index) => {
    const selected = voteOptions[index];
    if (selected.trim() === "") {
      setPass(false);
    } else {
      setPass(true);
    }
  };

  const borderStyle = pass ? "1px solid #243579" : "0";

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      {/* 투표 제목 입력 */}
      <TextField
        label="투표 제목"
        value={voteTitle}
        onChange={handleTitleChange}
        sx={{ width: "100%", mb: 2 }}
        onBlur={handleBlurTitle}
      />

      {/* 투표 항목 목록 */}
      <List sx={{ width: "100%" }}>
        {voteOptions.map((option, index) => (
          <ListItem key={index} sx={{ display: "flex" }}>
            <ListItemText>
              <TextField
                label={`투표 항목 ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                sx={{ width: "100%" }}
                onBlur={() => handleBlurOption(index)}
              />
            </ListItemText>
            <IconButton onClick={() => handleRemoveOption(index)} color="error">
              <RemoveIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      {/* 투표 항목 추가 버튼 */}
      <div style={{ width: "100%", textAlign: "center" }}>
        <IconButton
          onClick={handleAddOption}
          color="primary"
          sx={{ textAlign: "center" }}
        >
          <AddIcon />
        </IconButton>
      </div>

      {/* 구분선 */}
      <Divider sx={{ my: 2, width: "100%" }} />
      {pass ? null : (
        <p
          style={{
            textAlign: "center",
            marginBottom: "5px",
            fontSize: "14px",
            color: "red",
          }}
        >
          모든 항목을 입력해주세요.
        </p>
      )}

      <div style={{ width: "100%", textAlign: "center" }}>
        <div className={style.btnWrap}>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={[
              {
                padding: "11px 30px",
                backgroundColor: "#fff",
                color: "#243579",
                border: "1px solid #243579",
                fontWeight: "bold",
                marginBottom: "10px",
                marginRight: "5px",
              },
              {
                ":hover": {
                  backgroundColor: "#f8f8f8",
                  border: "0",
                },
              },
            ]}
          >
            취소
          </Button>
          <Button
            onClick={handleVoteSubmit}
            variant="contained"
            disabled={!pass}
            sx={[
              {
                padding: "11px 30px",
                backgroundColor: "#243579",
                fontWeight: "bold",
                marginBottom: "10px",
                border: { borderStyle },
                boxShadow: 0,
                marginLeft: "5px",
              },
              {
                ":hover": {
                  border: "1px solid #1976d2",
                  boxShadow: 0,
                },
              },
            ]}
          >
            저장
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default CreateVote;
