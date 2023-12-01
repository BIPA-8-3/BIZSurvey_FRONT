import style from "../../style/workspace/Item.module.css";

function Item() {
  return (
    <div id={style.Item} className={style.workspaces}>
      <div className={style.textFont}>New Workspace</div>
      <div className={style.labelBox}>free</div>
      <style></style>
    </div>
  );
}

export default Item;
