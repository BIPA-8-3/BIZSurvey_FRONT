import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import call from '../../pages/workspace/api';

function EmailValidation() {
    const navigate = useNavigate();
    const { key } = useParams();

    useEffect(() => {
        const loadData = async () => {

                call(`/email-validation/${key}`, "GET").then((data) => {
                    navigate("/changePassword", { state: { email: data} });
                }).catch((error) => {
                    console.error("Error in fetchData:", error);
                    alert(error.response.data.errorMessage);
                    navigate("/")
                })
                
        };
        loadData();
    }, [key]);

    return <></>;
};
  
export default EmailValidation;
