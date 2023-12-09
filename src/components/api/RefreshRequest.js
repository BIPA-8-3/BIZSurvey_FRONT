import React, { useEffect } from 'react';
import Axios from "axios";


const RefrechRequest = async (e) => {
    const saveAccessTokenToLocalStorage = (token) => {
        localStorage.setItem('accessToken', token);
    };
    
    const response = await Axios.get('/refresh',
    {
        headers: {
            refreshAuthorization: localStorage.getItem("refreshToken"),
        },
    });

    const headers = response.headers;
    const authorization = headers['authorization'];
    saveAccessTokenToLocalStorage(authorization);
    
  }
  



export default RefrechRequest;
