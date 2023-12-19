import style from "../../style/workspace/Item.module.css";

function Item({ workspaceName, id, workspaceType, changeWorkspace, selectable }) {
  return (
    <div
      id={style.Item}
      className={`${style.workspaces} ${selectable ? style.active : ""}`}
      onClick={() => {
        changeWorkspace(id);
      }}
    >
      <span className={style.textFont}>{workspaceName}</span>
      <div className={style.labelBox}>{workspaceType}</div>
    </div>
  );
}

export default Item;
