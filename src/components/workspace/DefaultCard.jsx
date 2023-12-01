import style from "../../style/workspace/DefaultCard.module.css";
import { IoAddCircleSharp } from "react-icons/io5";

export default function DefaultCard() {
  return (
    <div id={style.DefaultCard}>
      <IoAddCircleSharp className={style.addBtn}></IoAddCircleSharp>
    </div>
  );
}
