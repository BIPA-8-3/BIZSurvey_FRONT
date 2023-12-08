import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";
import style from "../../../../style/survey/UserLIst.module.css";
import { useState } from "react";

export default function UserList({ userList, setUser }) {
  // const [users, setUsers] = useState([
  //   {
  //     userId: 1,
  //     nickname: "nick",
  //   },
  //   {
  //     userId: 1,
  //     nickname: "nick",
  //   },
  //   {
  //     userId: 1,
  //     nickname: "nick",
  //   },
  //   {
  //     userId: 1,
  //     nickname: "nick",
  //   },
  //
  // ]);

  return (
    <>
      {/* 응답한 사용자 목록  */}
      <div className={style.userContainer}>
        <div className={style.userTitle}>응답한 사용자</div>
        <div className={style.userList}>
          {userList.map((user, index) =>
            user.userId !== 0 ? (
              <User key={index} nickname={user.nickname} setUser={setUser} />
            ) : (
              <p>응답자가 존재하지 않습니다.</p>
            )
          )}
        </div>
      </div>
    </>
  );
}

function User({ nickname, setUser }) {
  return (
    <>
      <button className={style.userButton} onClick={() => setUser(nickname)}>
        <div>{nickname}</div>
      </button>
    </>
  );
}
