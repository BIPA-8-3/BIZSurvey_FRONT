import React, { useState } from "react";
import BizModal from "../common/BizModal";
import { Divider, Paper, Checkbox, Button, Box } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import style from "../../style/surveyCommunity/SurveyListModal.module.css";


const SurveyListModal = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [surveyList, setSurveyList] = useState([
      { id: 1, title: "설문지 1ssssssssssssssssssss설문지 1ssssssssssssssssssss설문지 1ssssssssssssssssssss", workspaceName: '개인 워크스페이스' },
      { id: 2, title: "설문지 2ssssssssssssss", workspaceName: 'oo 워크스페이스' },
      { id: 3, title: "설문지 3", workspaceName: 'oo 워크스페이스' },
      { id: 4, title: "설문지 4", workspaceName: 'oo 워크스페이스'  },
      { id: 5, title: "설문지 5", workspaceName: 'oo 워크스페이스'  },
      { id: 6, title: "설문지 6", workspaceName: 'oo 워크스페이스' },
      { id: 7, title: "설문지 7", workspaceName: 'oo 워크스페이스'  },
      { id: 8, title: "설문지 8", workspaceName: 'oo 워크스페이스'  }
      // 다른 설문지들...
    ]);
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
    };
  
    const handleApply = () => {
      // 선택된 설문이 없으면 오류 메시지 표시
      if (selectedSurvey === null) {
        setError("하나의 설문만 체크할 수 있습니다.");
        return;
      }
  
      // 선택된 설문을 사용하여 필요한 작업 수행
      console.log("선택된 설문:", selectedSurvey);
      // 여기에 선택된 설문을 사용한 로직을 추가하세요.
      // 예를 들면 선택된 설문을 서버로 전송하는 등의 작업이 있을 수 있습니다.
  
      // 모달 닫기
      handleCloseModal();
    };
  
    return (
      <div>
        
        <button onClick={handleOpenModal}>설문지 추가</button>
  
        
        <BizModal isOpen={modalOpen} handleClose={handleCloseModal} title="내가 만든 설문">
          
          <div className={style.surveyModalWrap} style={{ maxHeight: "350px", overflow: "auto", borderBottom:'0px'}}>
            <List sx={{width : "600px"}}>
              {surveyList.map((survey) => (
                <ListItem key={survey.id} divider 
                sx={[{
                  },{':hover':{
                    backgroundColor:'#f7f7f7'
                  }}]}
                >
                  <span className={style.workspaceName}>{survey.workspaceName}</span>
                  <span className={style.modalSurveyName}>{survey.title} </span>
                  <Checkbox
                    checked={selectedSurvey === survey.id}
                    onChange={() => handleCheckboxChange(survey.id)} 
                    id={survey.id}
                  />
                </ListItem>
              ))}
            </List>
          </div>
          {/* 오류 메시지 표시 */}
          {error && <p className={style.errorMsg} style={{ color: "red", fontSize: "0.8rem", marginTop: "10px" }}>{error}</p>}
      
          {/* 적용 버튼 */}
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
    </div>
  );
};

export default SurveyListModal;