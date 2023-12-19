import style from "../../style/workspace/ContactItem.module.css";
import { IoCloseSharp } from "react-icons/io5";

export default function ContactItem({ btnVisible, id, email, name, handleClickRemoveBtn }) {
  if (typeof btnVisible === "undefined") {
    btnVisible = true;
  }
  return (
    <div className={style.contactWrap}>
      <div>
        <span className={style.contactText} style={{ marginBottom: "3px" }}>
          {name}
        </span>
        <span className={style.contactText}>{email}</span>
      </div>
      {btnVisible ? (
        <IoCloseSharp
          className={style.closeBtn}
          onClick={() => {
            handleClickRemoveBtn(id);
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
}
