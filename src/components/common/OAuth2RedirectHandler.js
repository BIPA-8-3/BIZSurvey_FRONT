// Header.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import useApiCall, {loginKaKaoCode, loginKaKaoNicknameCheck} from "../api/ApiCall";
import { LoginContext, LoginFunContext } from "../../App";

const OAuth2RedirectHandler = () => {
    const { call } = useApiCall();
    const userInfo = useContext(LoginContext)
    const {setUserInfo} = useContext(LoginFunContext)
    const [authorization, setAuthorization] = useState(null);

    const navigate = useNavigate();
    // 로컬 스토리지에 엑세스 토큰 저장
    const saveAccessTokenToLocalStorage = (token) => {
        localStorage.setItem('accessToken', token);
    };

    // 리프레시 토큰을 로컬 스토리지에 저장
    const saveRefreshTokenToLocalStorage = (token) => {
        localStorage.setItem('refreshToken', token);
    };

    useEffect(() => {
      const fetchData = async () => {
        const code = new URL(window.location.href).searchParams.get('code');
  
        try {
          loginKaKaoCode(code).then((response) => {
              
            console.log("data header : " + response.headers)
            const headers = response.headers;

            if (headers && headers.authorization) {


              loginKaKaoNicknameCheck(response.data.loginInfoRequest.id).then((checkResponse)=>{
                  if(!checkResponse.data){
                      navigate("/additionalJoin", {state : {
                          info : response.data.loginInfoRequest
                      }})
                  }else{
                      const headers = response.headers;
                      const authorization = headers['authorization'];
                      const refreshAuthorization = headers['refreshauthorization'];

                      saveAccessTokenToLocalStorage(authorization);
                      saveRefreshTokenToLocalStorage(refreshAuthorization);

                      try {
                          call("/user/info", "GET").then((data) =>{
                          console.log("/user/info : " + data);
                          setUserInfo(data);
                        })
                        
                      } catch (error) {
                        console.error("사용자 정보 가져오기 실패:", error);
                      }

                      navigate('/');
                  }
              });
                  
            } else {
              console.error('Authorization header not found in the response.');
            }
         })
         
          
          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []); 

    return(
        <div className='customLoadingWrap'>
            <CircularProgress size='100px'/>
        </div>
    )
}

export default OAuth2RedirectHandler;
