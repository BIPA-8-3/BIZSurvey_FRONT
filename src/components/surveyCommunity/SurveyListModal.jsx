import React, { useState } from "react";
import BizModal from "../common/BizModal";
import { Divider, Paper, Checkbox, Button, Box } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import style from "../../style/BizModal.module.css";

const SurveyListModal = ({ props }) => {
  const data = props.list;
  const modalTitle = props.title;

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleOpenModal = () => {
    if (props.list.length === 0) {
      if (
        window.confirm(
          "등록된 설문이 없네요! 사용자의 워크스페이스로 이동하시겠습니까?\n" +
            "이동하시게 된다면 작성한 게시글 정보는 유지되지 않습니다."
        )
      ) {
        navigate("/workspace");
      }
    } else {
      setModalOpen(true);
    }
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
      setError("설문지를 선택해주세요.");
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
        
      <div className={style.mobileSurveyTableWrap}>
          <table className={style.mobileSurveyTable}>
            <thead>
                <tr>
                    <td>설문지 이름</td>
                    <td>워크스페이스 이름</td>
                    <td>선택</td>
                </tr>
            </thead>
            <tbody>
            {data.map((survey) => (
                <tr>
                    <td className={style.mobileSurveyTableTitle}>
                      <p>{survey.title}</p>
                    </td>
                    <td className={style.mobileSurveyTableWorkspaceName}>
                      <p>{survey.workspaceName}</p>
                    </td>
                    <td>
                      <Checkbox
                        checked={selectedSurvey === survey.surveyId}
                        onChange={() => handleCheckboxChange(survey.surveyId)}
                      />  
                    </td>
                </tr>
            ))}
            </tbody>
          </table>
      </div>
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
