import React, { useContext, useEffect, useState } from "react";
import { getURI } from "../../pages/workspace/api";
import { NativeEventSource, EventSourcePolyfill } from "event-source-polyfill";
import { LoginContext } from "../../App";

const SSEComponent = () => {
  const [sseData, setSseData] = useState("");
  // const EventSourcePolyfill = require("event-source-polyfill");
  const EventSource = NativeEventSource || EventSourcePolyfill;
  const userInfo = useContext(LoginContext);

  useEffect(() => {
    // 토큰 값 가져오기 (예: 로컬 스토리지 또는 다른 곳에서)
    alert("안녕안녕");

    const accessToken = localStorage.getItem("accessToken");
    alert(accessToken);

    // SSE 연결 설정
    const eventSource = new EventSource(getURI() + "/sse/connect?userId=" + userInfo.id, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    eventSource.onopen = () => {
      console.log("SSE 연결이 열렸습니다.");
    };

    // 이벤트 수신 시 처리 로직
    eventSource.onmessage = (event) => {
      alert("들어오기하나");
      const eventData = JSON.parse(event.data);
      setSseData(eventData.message);
      console.log(eventData.message); // 콘솔에 기록
      alert(eventData.message);
    };

    // 에러 처리
    eventSource.onerror = (error) => {
      console.error("SSE error:", error);
      eventSource.close(); // 에러 발생 시 SSE 연결 종료
    };

    // 컴포넌트 언마운트 시 SSE 연결 해제
    return () => {
      eventSource.close();
    };
  }, []); // 빈 배열은 컴포넌트 마운트 시에만 실행되도록 함

  return (
    <div>
      <p>SSE Data: {sseData}</p>
    </div>
  );
};

export default SSEComponent;
