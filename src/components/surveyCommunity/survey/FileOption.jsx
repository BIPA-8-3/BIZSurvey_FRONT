import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { IoIosClose } from "react-icons/io";
import IconButton from "@mui/material/IconButton";
import { IoCloseOutline } from "react-icons/io5";

import { useState } from "react";
import axios from "axios";
import { ConstructionOutlined } from "@mui/icons-material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function FileOption({ setFileAnswer, questionId, fileAnswer }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    let url = "";

    if (file === undefined) {
      return;
    }

    // url 받아오기
    const data = new FormData();
    data.append("file", file);
    data.append("surveyId", 11);
    data.append("shareId", 1);
    data.append("shareType", "INTERNAL");
    data.append("questionId", questionId);
    data.append("domain", "SURVEY");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.post("/storage/", data, config);
      url = response.data;
    } catch (error) {
      console.log(error);
    }

    setSelectedFile(file);
    setFileAnswer([{ name: file.name, url: url }]);
  };

  const handleDeleteFile = async () => {
    try {
      const response = await axios.delete("/storage/file/" + fileAnswer[0].url);
    } catch (error) {
      console.log(error);
    }

    setSelectedFile(null);
    setFileAnswer([{ name: "", url: "" }]);
  };

  return (
    <>
      {/* 선택된 파일 정보 출력 */}
      {selectedFile ? (
        <div>
          <TextField
            disabled
            id="outlined-disabled"
            value={selectedFile.name}
            size="small"
            inputProps={{ style: { fontSize: "11pt" } }}
          />

          <IconButton aria-label="delete" onClick={handleDeleteFile}>
            <IoCloseOutline />
          </IconButton>
        </div>
      ) : (
        <>
          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            onChange={handleFileChange}
            size="small"
          >
            파일 업로드
            <VisuallyHiddenInput type="file" />
          </Button>
        </>
      )}
    </>
  );
}
