import { useState } from "react";
import style from "../../style/workspace/ProfileContainer.module.css";

const ProfileContainer = () => {
  const profileImages = [
    "https://via.placeholder.com/45X45",
    "https://ui-avatars.com/api/?name=won-sik&background=random",
    // "https://ui-avatars.com/api/?name=s-y&background=random",
    "https://ui-avatars.com/api/?name=123&background=random",
  ];
  const [profiles, setProfiles] = useState(profileImages);

  return (
    <div className={style.ProfileContainer}>
      {profiles.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Profile ${index + 1}`}
          className={style.profilePicture}
          style={{
            position: "absolute",
            right: `${index * 35}px`,
            zIndex: index + 1,
          }}
        />
      ))}
    </div>
  );
};

export default ProfileContainer;
