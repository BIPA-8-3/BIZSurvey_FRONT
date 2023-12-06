import style from "../../style/workspace/AdminItem.module.css";

export default function AdminItem() {
  return (
    <div className={style.adminProfile}>
      <div className={style.profileInfo}>
        <img src="https://via.placeholder.com/35X35" className={style.profileRadius}></img>
        <div className={style.profileDetail}>
          <span className={style.profileName}>비즈서베이</span>
          <span className={style.profileEmail}>hws6745@naver.com</span>
        </div>
      </div>
      <span className={style.profileState}>총 관리자</span>
    </div>
  );
}
