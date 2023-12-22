import React, { useState } from "react";
import BizModal from "../common/BizModal";
import { Divider, Paper, Checkbox, Button, Box } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";



const SurveyListModal = ({ props }) => {
  const data = props.list;
  const modalTitle = props.title;

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [error, setError] = useState("");

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedSurvey(null); // 모달이 닫힐 때 선택된 설문 초기화
    setError(""); // 모달이 닫힐 때 오류 메시지 초기화
  };

  const handleCheckboxChange = (surveyId) => {
    // 선택된 설문 업데이트
    setSelectedSurvey(surveyId);
    setError(""); // 체크할 때마다 오류 메시지 초기화

    // const selectedSurvey = data.find(survey => survey.surveyId === surveyId);
    // props.setSurvey(selectedSurvey);
  };

  const handleApply = () => {
    // 선택된 설문이 없으면 오류 메시지 표시
    if (selectedSurvey === null) {
      setError("하나의 설문만 체크할 수 있습니다.");
      return;
    }
    const selected = data.find((survey) => survey.surveyId === selectedSurvey);
    props.setSurvey(selected);
    handleCloseModal();
  };

  return (
    <div>

      <button onClick={handleOpenModal}>{modalTitle}</button>
      <BizModal
        isOpen={modalOpen}
        handleClose={handleCloseModal}
        title={modalTitle}
      >
        <List
          sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
        >
          {/* 목차 표시 */}
          <ListItemText primary={`설문지 이름`}  sx={{width:'350px', fontWeight:'bold'}}/>
          <ListItemText primary={`워크스페이스 이름`} />
        </List>
        <Divider />
        {/* 목록 표시 */}
        <List sx={{ width: "700px", overflowY: "auto", maxHeight: "400px" }}>
          {data.map((survey) => (
            <ListItem key={survey.surveyId} divider>
              {/* 스키마 표시 */}
              <ListItemText primary={survey.title} sx={{width:'350px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}/>
              <ListItemText primary={survey.workspaceName} />
              {/* 선택 체크박스 */}
              <Checkbox
                checked={selectedSurvey === survey.surveyId}
                onChange={() => handleCheckboxChange(survey.surveyId)}
              />
            </ListItem>
          ))}
        </List>
        {/* 오류 메시지 표시 */}
        {error && (
          <p style={{ color: "red", fontSize: "0.8rem", marginTop: "10px" }}>
            {error}
          </p>
        )}
        {/* 적용 버튼 */}
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
        >
          <Button
            onClick={handleApply}
            variant="contained"
            sx={{
              padding: "11px 30px",
              backgroundColor: "#243579",
              fontWeight: "bold",
              border: "1px solid #243579",
              boxShadow: 0,
              marginLeft: "5px",
              ":hover": {
                border: "1px solid #1976d2",
                boxShadow: 0,
              },
            }}
          >
            적용
          </Button>
        </Box>
      </BizModal>
    </div>
  );
};

export default SurveyListModal;