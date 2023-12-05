import style from "../../../style/survey/ButtonTab.module.css";
import ButtonGroup from "@mui/material/ButtonGroup";
export default function ButtonTab({ handleChangeTab, page, first, second }) {
  return (
    <>
      <ButtonGroup variant="text" aria-label="text button group">
        <button
          onClick={(e) => handleChangeTab(e, 0)}
          className={style.wrap}
          style={{
            borderBottom: page === 0 ? "3px solid #154dca" : "",

            color: page === 0 ? "#154dca" : "black",
            fontWeight: page === 0 ? "bold" : "normal",
          }}
        >
          {first}
        </button>
        <button
          onClick={(e) => handleChangeTab(e, 1)}
          className={style.wrap}
          style={{
            borderBottom: page === 1 ? "3px solid #154dca" : "",
            color: page === 1 ? "#154dca" : "black",
            fontWeight: page === 1 ? "bold" : "normal",
          }}
        >
          {second}
        </button>
      </ButtonGroup>
    </>
  );
}
