import React, { useContext } from "react";
import styles from "./UserDashboard.module.scss";
import AuthContext from "../../store/auth-context";
function UserDashboard() {
  const userCtx = useContext(AuthContext);
  console.log(userCtx.currentUser);
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.greeting}>
        Good morning, {userCtx.currentUser.displayName}
      </h2>
      <div>
        <ul>
          <li>Account Settings</li>
          <li>Purchases</li>
          <li>Wishlist</li>
        </ul>
      </div>
    </div>
  );
}

export default UserDashboard;
