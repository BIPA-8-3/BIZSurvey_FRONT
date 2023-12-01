import { FaFileDownload } from "react-icons/fa";
import IconWithText from "../../../../common/IconWithText";
import { Hidden } from "@mui/material";
import style from "../../../../../style/survey/FileLIst.module.css";

export default function FileList({ files }) {
  return (
    <>
      <div className={style.fileList}>
        {files.map((file, index) => (
          <File filename={file.name} url={file.url} key={index}></File>
        ))}
      </div>
    </>
  );
}

export function File({ filename, url }) {
  return (
    <>
      <button className={style.fileButton}>
        <IconWithText text={filename} fontsize={"16px"}>
          <FaFileDownload />
        </IconWithText>
        <input type="hidden" name={filename} value={url}></input>
      </button>
    </>
  );
}
