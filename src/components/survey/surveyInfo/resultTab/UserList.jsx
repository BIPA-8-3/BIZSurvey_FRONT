import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";
import style from "../../../../style/survey/PersonalResult.module.css";
import { useState } from "react";

export default function UserList() {
  const [userInfo, setUserInfo] = useState([
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
          <FixedSizeList
            minHeight={100}
            height={150}
            width={680}
            itemSize={46}
            itemCount={userInfo.length}
            overscanCount={5}
          >
            {({ index }) => <User index={index} userInfo={userInfo} />}
          </FixedSizeList>
        </div>
      </div>
    </>
  );
}

function User({ index, userInfo }) {
  const user = userInfo[index];

  return (
    <>
      <ListItem
        style={{ width: "650px", margin: "0 auto" }}
        key={user.userId}
        component="div"
        disablePadding
      >
        <ListItemButton>
          <ListItemText primary={`${index + 1}: ${user.nickname}`} />
        </ListItemButton>
      </ListItem>
    </>
  );
}
