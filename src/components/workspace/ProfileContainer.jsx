import { useEffect, useState } from "react";
import style from "../../style/workspace/ProfileContainer.module.css";

const ProfileContainer = ({ owner, adminList }) => {
  const profileImages = ["https://via.placeholder.com/45X45"];

  let temp = [{ ...owner }, ...adminList];

  return (
    <div className={style.ProfileContainer}>
      {temp.map((admin, index) => (
        <div key={index} className={style.imgBox}>
          <img
            key={index}
            src={
              (admin.profileUrl && "https://" + admin.profileUrl) ||
              "https://ui-avatars.com/api/?name=" + admin.email + "&background=random"
            }
            alt={`Profile ${index + 1}`}
            className={style.profilePicture}
            style={{
              position: "absolute",
              right: `${index * 35}px`,
              zIndex: index + 1,
            }}
          />
          <div
            className={style.description}
            style={{
              position: "absolute",
              top: 45,
              left: index * -35 - 45,
            }}
          >
            {admin.nickName}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileContainer;
