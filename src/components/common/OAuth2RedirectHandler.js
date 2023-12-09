// Header.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';

const OAuth2RedirectHandler = () => {
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
          const response = await Axios.get(`/login/oauth2/code/kakao?code=${code}`);
          const headers = response.headers;
          
          if (headers && headers.authorization) {

            const checkResponse = await Axios.get(`/nickname/existence?id=${response.data.loginInfoRequest.id}`);
                
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

                    navigate('/');
                }
          } else {
            console.error('Authorization header not found in the response.');
          }
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
