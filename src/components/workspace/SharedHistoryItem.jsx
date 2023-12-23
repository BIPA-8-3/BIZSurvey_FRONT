import style from "../../style/workspace/SharedHistoryItem.module.css";
import { IoCloseSharp } from "react-icons/io5";

export default function SharedHistoryItem({ info, setSelectedHistory }) {
  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Seoul",
  });

  console.log(info);
  if (!info.id) {
    return null;
  }
  return (
    <div className={style.container}>
      <div
        className={style.historyWrap}
        onClick={(e) => {
          setSelectedHistory(info.id);
        }}
      >
        <div style={{ width: "210px" }}>
          <span className={style.historyText}>
            공유날짜: {formattedDate.format(new Date(info.regDate))}
          </span>
          <span className={style.historyText}>
            마감날짜: {formattedDate.format(new Date(info.dueDate))}
          </span>
        </div>
        <div className={style.wrap}>
          {info.deadline ? (
            <div className={style.labelBox}>마감</div>
          ) : (
            <button className={style.button}>연장</button>
          )}
        </div>
      </div>
      {/* <div className={style.inputWrap}>
        <span>연장 기한(일): </span>
        <form>
          <input className={style.input} type="number" min="10" max="30" step="3"></input>
        </form>
      </div> */}
    </div>
  );
}
