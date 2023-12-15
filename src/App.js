import "./App.css";
import { Reset } from "styled-reset";
import React, { Suspense, createContext, useState, useEffect } from 'react';
import { useRoutes } from "react-router-dom";
import ThemeRoutes from "./routes/Router";

export const LoginContext = createContext();
export const LoginFunContext = createContext();

const App = () => {
  const storedUserInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const [userInfo, setUserInfo] = useState(storedUserInfo);

  const updateUserInfo = (newUserInfo) => {
    localStorage.setItem("userInfo", JSON.stringify({ ...userInfo, ...newUserInfo }));
    setUserInfo((prevUserInfo) => ({ ...prevUserInfo, ...newUserInfo }));
  };

  const routing = useRoutes(ThemeRoutes);

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
    setUserInfo(storedUserInfo);
  }, []);
  
  return (
    <>
      <LoginContext.Provider value={userInfo}>
        <LoginFunContext.Provider value={{ setUserInfo: updateUserInfo }}>
          <Reset />
          <div>{routing}</div>
        </LoginFunContext.Provider>
      </LoginContext.Provider>
    </>
  );
};

export default App;
