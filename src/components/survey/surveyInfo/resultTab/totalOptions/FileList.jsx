import { FaFileDownload } from "react-icons/fa";
import IconWithText from "../../../../common/IconWithText";
import { Hidden } from "@mui/material";
import style from "../../../../../style/survey/FileLIst.module.css";
import { call } from "../../../../../pages/survey/Login";
import Button from "@mui/material/Button";

import { IoMdDownload } from "react-icons/io";

import axios from "axios";

export default function FileList({ files, surveyId, questionId }) {
  const zipURL =
    "http://localhost:8080/storage/folder/bizsurvey-bucket.s3.ap-northeast-2.amazonaws.com/survey/" +
    surveyId +
    "/internal-1/" +
    questionId +
    "/images/";

  const handleFolderDownload = (e) => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = zipURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className={style.fileList}>
        {files.map((file, index) => (
          <File filename={file.filename} url={file.url} key={index}></File>
        ))}
      </div>
      <div
        style={{
          width: "580px",
          textAlign: "right",
          paddingTop: "20px",

          margin: "0 auto",
        }}
      >
        <Button
          onClick={handleFolderDownload}
          variant="text"
          startIcon={<IoMdDownload />}
          sx={[
            {
              color: "#f56942",
            },
            {
              ":hover": {
                backgroundColor: "#fff9f7",
              },
            },
          ]}
        >
          전체 다운받기
        </Button>
      </div>
    </>
  );
}

export function File({ filename, url }) {
  console.log("url!!!!!!!!", url);

  const handleDownload = async (e, url) => {
    e.preventDefault();
    console.log("여기파일!!!!!!!!", url);
    const link = document.createElement("a");
    link.href = "http://localhost:8080/storage/file/" + url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <button
        className={style.fileButton}
        onClick={(e) => handleDownload(e, url)}
      >
        <IconWithText text={filename} fontsize={"16px"}>
          <FaFileDownload />
        </IconWithText>
        <input type="hidden" name={filename} value={url}></input>
      </button>
    </>
  );
}
