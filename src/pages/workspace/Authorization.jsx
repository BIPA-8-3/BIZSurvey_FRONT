import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { linkVerification } from "./authenticationApi";
export default function Authorization() {
  const { type, token } = useParams();
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    linkVerification(token)
      .then((data) => {
        sessionStorage.setItem("INVITE_TOKEN", data);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        setResult(error.response.data);
      });
  }, []);

  return (
    <>
      <h1>{result}</h1>
    </>
  );
}
