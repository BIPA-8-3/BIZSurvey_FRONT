import style from "../../style/workspace/ContactItem.module.css";
import { IoCloseSharp } from "react-icons/io5";

export default function ContactItem({ btnVisible }) {
  if (typeof btnVisible === "undefined") {
    btnVisible = true;
  }
  return (
    <div className={style.contactWrap}>
      <div>
        <span className={style.contactText} style={{ marginBottom: "3px" }}>
          비즈서베이
        </span>
        <span className={style.contactText}>hws6745@naver.com</span>
      </div>
      {btnVisible ? <IoCloseSharp className={style.closeBtn} /> : ""}
    </div>
  );
}
