import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";
import style from "../../../../style/survey/UserLIst.module.css";
import { useState } from "react";

export default function UserList() {
  const [users, setUsers] = useState([
    {
      userId: 1,
      nickname: "nick",
    },
    {
      userId: 1,
      nickname: "nick",
    },
    {
      userId: 1,
      nickname: "nick",
    },
    {
      userId: 1,
      nickname: "nick",
    },
    {
      userId: 1,
      nickname: "nick",
    },
    {
      userId: 1,
      nickname: "nick",
    },
    {
      userId: 1,
      nickname: "nick",
    },
    {
      userId: 1,
      nickname: "nick",
    },
    {
      userId: 1,
      nickname: "nick",
    },
  ]);

  return (
    <>
      {/* 응답한 사용자 목록  */}
      <div className={style.userContainer}>
        <div className={style.userTitle}>응답한 사용자</div>
        <div className={style.userList}>
          {users.map((user, index) => (
            <User key={index} userId={user.userId} nickname={user.nickname} />
          ))}
        </div>
      </div>
    </>
  );
}

function User({ userId, nickname }) {
  return (
    <>
      <button className={style.userButton}>
        <div>{nickname}</div>
      </button>
    </>
  );
}
