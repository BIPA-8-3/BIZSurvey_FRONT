import AddCircleIcon from "@mui/icons-material/AddCircle";
import style from "../../style/workspace/ButtonItem.module.css";

function ButtonItem() {
  return (
    <div>
      <button id={style.ButtonItem}>
        <AddCircleIcon fontSize="medium"></AddCircleIcon>
        <span className={style.btnFont}> 새로운 워크스페이스 </span>
      </button>
    </div>
  );
}

export default ButtonItem;
