import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EmailValidation() {
    const navigate = useNavigate();
    const { key } = useParams();

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await Axios.get(`/email-validation/${key}`);
                console.log(response.data);
                navigate("/changePassword", { state: { email: response.data } });
            } catch (error) {
                console.error("Error in fetchData:", error);
                alert(error.response.data.errorMessage);
                navigate("/")
            } 
        };
        loadData();
    }, [key]);

    return <></>;
};
  
export default EmailValidation;
