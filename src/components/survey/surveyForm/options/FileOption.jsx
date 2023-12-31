import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export default function FileOption() {
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

  return (
    <>
      <div style={{ width: "600px", margin: "0 auto", paddingTop: "15px" }}>
        <Button
          component="label"
          disabled
          variant="contained"
          startIcon={<CloudUploadIcon />}
          size="small"
        >
          파일 업로드
          <VisuallyHiddenInput type="file" />
        </Button>
      </div>
    </>
  );
}
