import style from "../../style/workspace/ShareItem.module.css";
import { IoCloseSharp } from "react-icons/io5";

export default function ShareItem({ btnVisible, info, handleClickShareItem }) {
  if (typeof btnVisible === "undefined") {
    btnVisible = true;
  }

  return (
    <div
      className={style.contactWrap}
      onClick={(e) => {
        handleClickShareItem(info.id, btnVisible);
      }}
    >
      <div>
        <span className={style.contactText} style={{ marginBottom: "3px" }}>
          {info.name}
        </span>
        <span className={style.contactText}>{info.email}</span>
      </div>
      {btnVisible ? (
        <IoCloseSharp
          className={style.closeBtn}
          onClick={(e) => {
            handleClickShareItem(info.id, btnVisible);
          }}
        />
      ) : (
        ""
      )}

      {(() => {
        if (info.response || info.response === 0) {
          return info.response > 0 ? (
            <span className={style.fontResponse}>응답</span>
          ) : (
            <span className={style.fontNoResponse}>미응답</span>
          );
        } else {
          return null;
        }
      })()}
    </div>
  );
}
