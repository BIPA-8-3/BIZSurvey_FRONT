import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";
import style from "../../../../style/survey/UserLIst.module.css";
import { useState } from "react";

export default function UserList({ userList, setUser, sharedType }) {
  return (
    <>
      {/* 응답한 사용자 목록  */}
      <div className={style.userContainer}>
        <div className={style.userTitle}>응답한 사용자</div>
        <div className={style.userList}>
          {sharedType === "INTERNAL"
            ? createInternalItem(userList, setUser, sharedType)
            : createExternalItem(userList, setUser, sharedType)}
        </div>
      </div>
    </>
  );
}

function User({ nickname, setUser, sharedType, contact }) {
  if (sharedType === "INTERNAL") {
    return (
      <>
        <button className={style.userButton} onClick={() => setUser(nickname)}>
          <div>{nickname}</div>
        </button>
      </>
    );
  } else {
    return (
      <>
        <button
          className={style.userButton}
          onClick={() => setUser(contact.id)}
        >
          <div style={{ display: "flex" }}>
            <span style={{ width: "50%" }}>이름: {contact.name}</span>
            <span>이메일: {contact.email}</span>
          </div>
          <div></div>
        </button>
      </>
    );
  }
}

function createInternalItem(userList, setUser, sharedType) {
  return userList.map((user, index) =>
    user.userId !== 0 ? (
      <User
        key={index}
        nickname={user.nickname}
        setUser={setUser}
        sharedType={sharedType}
      />
    ) : (
      <p>응답자가 존재하지 않습니다.</p>
    )
  );
}

function createExternalItem(userList, setUser, sharedType) {
  return userList.map((user) =>
    user.userId !== 0 ? (
      <User
        key={user.id}
        contact={user}
        sharedType={sharedType}
        setUser={setUser}
      />
    ) : (
      <p>응답자가 존재하지 않습니다.</p>
    )
  );
}
