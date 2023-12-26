import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { IoIosClose } from "react-icons/io";
import IconButton from "@mui/material/IconButton";
import { IoCloseOutline } from "react-icons/io5";

import { useEffect, useState } from "react";
import axios from "axios";
import { ConstructionOutlined } from "@mui/icons-material";
import Loader from "../../../pages/loader/Loader";
import { getURI } from "../../../pages/workspace/api";

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

export default function FileOption({
  setFileAnswer,
  questionId,
  fileAnswer,
  surveyId,
  sharedId,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const MAX_FILE_SIZE_MB = 5;

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    let url = "";

    // 파일 크기 제한
    const fileSizeMB = file.size / (1024 * 1024);
    if (file && fileSizeMB > MAX_FILE_SIZE_MB) {
      alert("파일 크기는 5MB를 초과할 수 없습니다.");
      event.target.value = null;
      return;
    }
    if (file === undefined) {
      return;
    }

    // url 받아오기
    const data = new FormData();
    data.append("file", file);
    data.append("surveyId", surveyId);
    data.append("shareId", sharedId);
    data.append("shareType", "INTERNAL");
    data.append("questionId", questionId);
    data.append("domain", "SURVEY");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    setLoading(true);

    try {
      const response = await axios.post(
        getURI() + "/storage/survey",
        data,
        config
      );
      url = response.data;
      console.log("url!!!!!!!!!!!!!" + response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    setSelectedFile(file);
    setFileAnswer([{ name: file.name, url: url }]);
  };

  const handleDeleteFile = async () => {
    try {
      const response = await axios.delete(
        getURI() + "/storage/file/" + fileAnswer[0].url
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    setSelectedFile(null);
    setFileAnswer([{ name: "", url: "" }]);
  };

  return (
    <>
      {loading ? <Loader /> : null}
      {/* 선택된 파일 정보 출력 */}
      {selectedFile ? (
        <div style={{ marginBottom: "10px" }}>
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
          <div style={{ marginBottom: "10px" }}>
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
          </div>
        </>
      )}
    </>
  );
}
