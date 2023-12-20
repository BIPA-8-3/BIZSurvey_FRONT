import axios from "axios";
import { useNavigate } from 'react-router-dom';
import call from '../../pages/workspace/api';


let URI = '';

if (process.env.NODE_ENV === 'development') {
  console.log('NODE_EVN: ' + process.env.NODE_ENV);
  URI = 'http://www.localhost:8080';
} else {
  console.log('NODE_EVN: ' + process.env.NODE_ENV);
  URI = 'http://www.bizsurvey.shop/api';
}


const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  }
});

const useApiCall = () => {
  const navigate = useNavigate();

  const call = async (api, method, request, flag) => {
    try {
      const config = {
        url: URI + api,
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

      if (flag) {
        instance.headers = {
          "Content-Type": "multipart/form-data",
        }
      }

      const response = await instance(config);

      return response.data;
    } catch (error) {
      console.log('error11', error)
      if (error.response.data.errorCode === 401) {
        navigate('/login');  // 로그인 페이지로 이동
      } else if (error.response.data.errorCode === 402) {
        RefreshRequest();
      } else {
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




// 로컬 스토리지에 엑세스 토큰 저장
const saveAccessTokenToLocalStorage = (token) => {
  localStorage.setItem("accessToken", token);
};

// 리프레시 토큰을 로컬 스토리지에 저장
const saveRefreshTokenToLocalStorage = (token) => {
  localStorage.setItem("refreshToken", token);
};

export const login = async (formData) => {
  try {
    const response = await axios.post(URI + "/login", formData)

    const headers = response.headers;
    console.log("response: ", response);
    console.log("header: ", headers);

    const authorization = headers["authorization"];
    const refreshAuthorization = headers["refreshauthorization"];

    saveAccessTokenToLocalStorage(authorization);
    saveRefreshTokenToLocalStorage(refreshAuthorization);

    return true;
  }
  catch (error) {
    if (error.response.data.errorCode === 403) {
      alert(error.response.data.errorMessage);
    } else {
      alert('아이디 비밀번호를 확인하세요');
    }
    return;
  }
};

//카카오 로그인
export const loginKaKao = async () => {
  try {
    const respons = await axios.get(URI + "/kakao/clientId");
    const KakaoLoginAPI = `https://kauth.kakao.com/oauth/authorize?client_id=${respons.data.clientId}&redirect_uri=${respons.data.redirectUri}&response_type=code`;

    window.location.href = KakaoLoginAPI;
  } catch (error) { }
};


export const additional = async (formData) => {
  try{
    const response = await axios.patch(URI + '/signup/additional', formData)
    if (response.status === 200) {
      const headers = response.headers;
      const authorization = headers['authorization'];
      const refreshAuthorization = headers['refreshauthorization'];

      saveAccessTokenToLocalStorage(authorization);
      saveRefreshTokenToLocalStorage(refreshAuthorization);
    }

  }catch(error){

  }
}

export const userInfoUpdate = async (formdata) => {
  try {
    const response = await axios.patch(
      URI + '/user/info', formdata,
      {
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      }
    );

    if (response.status === 200) {
      const headers = response.headers;
      const authorization = headers['authorization'];
      saveAccessTokenToLocalStorage(authorization);
      
    }

    alert(response.data)
  } catch (error) {
    // 에러 처리
  } finally {
    // 정리 코드
  }
}


export const adminLogin = async (formdata) => {
  try {
    const response = await axios.post("/admin/login", formdata);
    if (response.status === 200) {
      const headers = response.headers;
      const authorization = headers["authorization"];
      const refreshAuthorization = headers["refreshauthorization"];

      saveAccessTokenToLocalStorage(authorization);
      saveRefreshTokenToLocalStorage(refreshAuthorization);

      
    }
  } catch (error) {
    console.log("실패");
    if (error.response.data.errorCode === 403) {
      alert(error.response.data.errorMessage);
    } else {
      alert("계정을 확인해주세요")
    }
  }
}

export const planUpdate = async (name) =>{
  axios.patch(URI + `/plan/${name}`, {}, {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      }
  }).then((response) => {
          const headers = response.headers;
          const authorization = headers["authorization"];
          saveAccessTokenToLocalStorage(authorization);
          
          localStorage.removeItem("userInfo");
  });
}