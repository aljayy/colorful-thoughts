import React, { useState } from "react";
import { auth } from "../lib/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const AuthContext = React.createContext({
  createUser: () => {},
  currentUser: {},
  loginUser: () => {},
});

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});

  async function createUser(email, password, userName) {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(auth.currentUser, {
      displayName: userName,
    });

    setCurrentUser(userCredentials.user);
  }

  async function loginUser(email, password) {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    setCurrentUser(userCredentials.user);
  }

  const value = {
    createUser: createUser,
    currentUser: currentUser,
    loginUser: loginUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
