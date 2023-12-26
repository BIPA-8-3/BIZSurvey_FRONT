import style from "../../style/workspace/AdminItem.module.css";
import { IoCloseSharp } from "react-icons/io5";

export default function AdminItem({ info, handleClickRemoveAdminBtn, isAdmin }) {
  console.log(info);

  return (
    <div className={style.adminProfile}>
      <div className={style.profileInfo}>
        {(() => {
          if (info && info.profileUrl) {
            return <img src={"https://" + info.profileUrl} className={style.profileRadius} />;
          } else if (info.userId) {
            return (
              <img
                src={"https://ui-avatars.com/api/?name=" + info.email + "&background=random"}
                className={style.profileRadius}
              />
            );
          } else {
            return <img src="https://via.placeholder.com/35X35" className={style.profileRadius} />;
          }
        })()}
        <div className={style.profileDetail}>
          <span className={style.profileName}>{info.nickName}</span>
          <span className={style.profileEmail}>{info.email}</span>
        </div>
      </div>
      {info.id == 0 ? <div className={style.ownerBox}>총 관리자</div> : ""}
      {info.id !== 0 && info.userId ? (
        <div className={style.profileState}>
          관리자
          {!isAdmin ? (
            <IoCloseSharp
              className={style.closeBtn}
              onClick={() => {
                handleClickRemoveAdminBtn(info.id, info.userId);
              }}
            />
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
      {info.id < 0 ? <div className={style.ownerBox}>초대중</div> : ""}
      {info.id > 0 && !info.userId ? (
        <div className={style.profileState}>
          대기중
          {!isAdmin ? (
            <IoCloseSharp
              className={style.closeBtn}
              onClick={() => {
                handleClickRemoveAdminBtn(info.id, info.userId);
              }}
            />
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
