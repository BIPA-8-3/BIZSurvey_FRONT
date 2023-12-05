import AddIcon from "@mui/icons-material/Add";
import Item from "./Item";
import ButtonItem from "./ButtonItem";
import style from "../../style/workspace/Navbar.module.css";

function Navbar() {
  return (
    <div id={style.Navbar}>
      {/* header start */}
      <div className={style.NavbarHeader}>
        <div className={style.HeaderProfile}>
          <img src="https://via.placeholder.com/45X45" className={style.profileRadius}></img>
          <div className={style.profileInfo}>
            <span className={style.profileName}>
              <span style={{ marginRight: "3px" }}>🎖️</span>비즈서베이
            </span>
            <span className={style.profileEmail}>hws6745@naver.com</span>
          </div>
        </div>

        <div className={style.headerWorkspace}>
          <span className={style.headerWorkspaceFont}>워크스페이스</span>
          <span>
            <AddIcon className={style.addIcon}></AddIcon>
          </span>
        </div>
      </div>
      {/* header end */}

      {/* body start */}
      <div className={style.NavbarBody}>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <div>
          <ButtonItem></ButtonItem>
        </div>
      </div>
      {/* body end */}

      {/* footer */}
      <div className={style.NavbarFooter}>
        {/* <div className={style.planBox}>
          <p>😁 일반 플랜</p>
        </div> */}
        <div className={style.planText}>
          <span>플랜 변경하기</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
