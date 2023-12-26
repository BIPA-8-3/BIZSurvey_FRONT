import style from "../../style/workspace/Item.module.css";

function Item({ workspaceName, id, workspaceType, changeWorkspace, selectable }) {
  return (
    <div
      id={style.Item}
      className={`${style.workspaces} ${selectable ? style.active : ""}`}
      onClick={() => {
        changeWorkspace(id, workspaceType);
      }}
    >
      <span className={style.textFont}>{workspaceName}</span>
      <div className={style.labelBox}>{workspaceType === "COMPANY" ? "GROUP" : workspaceType}</div>
    </div>
  );
}

export default Item;
