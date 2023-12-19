import React, { useState } from "react";
import BizModal from "./BizModal";
import { Divider, Checkbox, Button, Box, List, ListItem, ListItemText } from "@mui/material";
import call from "../surveyCommunity/checkLogin";
import { json } from "react-router-dom";

const ClaimReasonModal = ({ onSelect, onClose, props, id }) => {

  const type = props;
  const seltedId = id;

  alert("신고 당할 예정인 ~"+id)

  const claimReasons = [
    "스팸홍보/도배글",
    "음란물/불법정보/불법촬영물",
    "욕설/혐오/차별적/불쾌한 표현",
    "개인정보 노출",
    "명예훼손/저작권 침해",
    "허위 신고자"
  ];

  const [selectedReason, setSelectedReason] = useState(null);

  const handleCheckboxChange = (reason) => {
    // 선택한 이유가 현재 선택한 이유와 같으면 해제, 아니면 선택
    setSelectedReason((prevSelected) =>
      prevSelected === reason ? null : reason
    );
  };

  const handleApply = () => {
    // 선택한 이유를 배열에 담아서 전달
    const selectedReasons = selectedReason ? selectedReason : '';
    onSelect(selectedReasons);
    onClose();
    alert("선택된 이유"+JSON.stringify(selectedReasons))

    let selctedType = null;
    if(type === 'post'){
      selctedType = '게시글';
    }else if(type === 'comment'){
      selctedType = '댓글';
    }else if(type === 'child'){
      selctedType = '대댓글';
    }
    
    const data = {
      id : seltedId,
      claimReason : selectedReasons,
      claimType : selctedType
    }

    alert(JSON.stringify(data))

    call("/claim/accept", "POST", data)
    .then((data) => {
      alert("넘어온 데이터 : " + data)
    }).catch((error) => {
      console.log(error)
    })

  };

  return (
    <BizModal isOpen={true} handleClose={onClose} title="신고 사유 선택">
      <Divider />
      <List sx={{ width: "400px", overflowY: "auto", maxHeight: "300px" }}>
        {claimReasons.map((reason) => (
          <ListItem key={reason} divider>
            <ListItemText primary={reason} />
            <Checkbox
              checked={selectedReason === reason}
              onChange={() => handleCheckboxChange(reason)}
            />
          </ListItem>
        ))}
      </List>
    
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
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
  );
};

export default ClaimReasonModal;