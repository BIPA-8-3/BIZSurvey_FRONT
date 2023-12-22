import Button from "@mui/material/Button";
import { FaFileDownload } from "react-icons/fa";
import style from "../../../../../style/survey/FileLIst.module.css";
import IconWithText from "../../../../common/IconWithText";
import { IoMdDownload } from "react-icons/io";
import { getURI } from "../../../../../pages/workspace/api";

export default function FileList({ files, surveyId, questionId }) {
  const index = files[0].url.indexOf("/images");
  const result = index !== -1 ? files[0].url.substring(0, index) : files[0].url;

  const zipURL = getURI() + "/storage/folder/" + result;

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
  const handleDownload = async (e, url) => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = getURI() + "/storage/file/" + url;
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
