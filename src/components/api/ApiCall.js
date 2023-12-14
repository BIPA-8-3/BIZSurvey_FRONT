import axios from "axios";
import { useNavigate } from 'react-router-dom';

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  }
});

const useApiCall = () => {
  const navigate = useNavigate();

  const call = async (api, method, request) => {
    try {
      const config = {
        url: api,
        method: method,
        headers: {},
      };

      if (method.toUpperCase() === 'GET') {
        config.params = request;
      } else {
        config.data = request;
      }

      // 토큰 추가
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers.Authorization = "Bearer " + accessToken;
      }

      const response = await instance(config)
      return response.data;
    } catch (error) {
      if (error.response.data.errorCode === 401) {
        alert("로그인 필요");
        navigate('/login');  // 로그인 페이지로 이동
      } else if (error.response.data.errorCode === 402) {
        RefreshRequest();
      } else{
        console.log(error.response.data.error.Message)
      }
    }
  };

  const RefreshRequest = async () => {
    const saveAccessTokenToLocalStorage = (token) => {
      localStorage.setItem('accessToken', token);
    };

    const response = await axios.get('/refresh', {
      headers: {
        refreshAuthorization: localStorage.getItem("refreshToken"),
      },
    });

    const headers = response.headers;
    const authorization = headers['authorization'];
    saveAccessTokenToLocalStorage(authorization);
  };

  return { call, RefreshRequest };
};

export default useApiCall;
