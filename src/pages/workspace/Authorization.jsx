import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { inviteLinkVerification, sharedLinkVerification } from "./authenticationApi";

export default function Authorization() {
  const navigate = useNavigate();
  const [result, setResult] = useState("");
  const { type, token } = useParams();
  const { state } = useLocation();

  useEffect(() => {
    switch (type) {
      case "invite":
        inviteLinkVerification(token)
          .then((data) => {
            sessionStorage.setItem("INVITE_TOKEN", data);
            navigate("/login", { replace: true });
          })
          .catch((error) => {
            console.log(error);
            setResult(error.response.data);
          });
        break;
      case "shared":
        let splitIndex = token.indexOf("_");
        let sharedSurveyId = token.substring(0, splitIndex);
        let parseToken = token.substring(splitIndex + 1);

        sharedLinkVerification(sharedSurveyId, parseToken)
          .then((data) => {
            // sessionStorage.setItem("SHARED_TOKEN", parseToken);
            // sessionStorage.setItem("SHARED_SURVEY_ID", sharedSurveyId);
            // sessionStorage.setItem("SURVEY_ID", data);
            navigate("/survey/participate/external", {
              state: {
                token: parseToken,
                sharedSurveyId: sharedSurveyId,
                surveyId: data,
              },
            });
          })
          .catch((error) => {
            setResult(error.response.data);
          });
        break;
      default:
        setResult(state.message);
        break;
    }
  }, []);

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "60px", fontWeight: "bold" }}>{result}</h1>
      </div>
    </>
  );
}
