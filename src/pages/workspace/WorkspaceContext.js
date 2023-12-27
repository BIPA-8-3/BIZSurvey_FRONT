import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkPermissions } from './api';

const WorkspaceContext = createContext();

export const WorkspaceProvider = ({ children }) => {
    // 워크스페이스 목록
    const [workspaceList, setWorkspaceList] = useState([]);

    // 선택된 워크스페이스
    const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(0);
    const [selectedWorkspaceType, setSelectedWorkspaceType] = useState(null);

    // 선택된 설문지 [context 안해도 될듯 ? 나중에보고 ㄱㄱ]
    const [selectedSurvey, setSelectedSurvey] = useState({
        surveyId: null,
        title: null,
        menuNum: null,
    });

    // 선택된 설문지 (상세 조회)
    const navigate = useNavigate();
    const [selectedSurveyId, setSelectedSurveyId] = useState(0);
    const [permission, setPermission] = useState(false);

    useEffect(() => {
        checkPermissions()
            .then((data) => {
                setPermission(data);
                if (!data && window.confirm('플랜에 가입하시거나 관리자로 초대받으셔야 이용 가능합니다.\n플랜 페이지로 이동하시겠습니까?')) {
                    navigate("/mypagePlan");
                } else if (!data) {
                    navigate(-2);
                }
            }).catch((error) => {
                if (window.confirm('로그인 하셔야 이용하실 수 있습니다.\n로그인 페이지로 이동하시겠습니까?')) {
                    navigate("/login");
                } else {
                    navigate(-2);
                }
            })
    }, [])

    useEffect(() => {
        if (selectedSurveyId) {
            navigate("/workspace/info");
        } else {
            navigate("/workspace");
        }
    }, [selectedSurveyId]);

    if (!permission) {
        return;
    }

    const isPersonal = (method) => {
        return selectedWorkspaceType === "PERSONAL";
    };


    return (
        <WorkspaceContext.Provider value={{
            workspaceList,
            setWorkspaceList,
            selectedWorkspaceId,
            setSelectedWorkspaceId,
            selectedWorkspaceType,
            setSelectedWorkspaceType,
            selectedSurvey,
            setSelectedSurvey,
            selectedSurveyId,
            setSelectedSurveyId,
            isPersonal,
        }}>
            <>
                {children}
            </>
        </WorkspaceContext.Provider >
    )
}

export const useWorkspaceContext = () => useContext(WorkspaceContext);