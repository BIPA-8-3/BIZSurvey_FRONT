import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkPermissions } from './api';

const WorkspaceContext = createContext();

export const WorkspaceProvider = ({ children }) => {
    // 워크스페이스 목록
    const [workspaceList, setWorkspaceList] = useState([]);

    // 선택된 워크스페이스
    const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null);
    const [selectedWorkspaceType, setSelectedWorkspaceType] = useState(null);

    // 선택된 설문지 [context 안해도 될듯 ? 나중에보고 ㄱㄱ]
    const [selectedSurvey, setSelectedSurvey] = useState({
        surveyId: null,
        title: null,
        menuNum: null,
    });
    // 선택된 설문지 (상세 조회)
    const [selectedSurveyId, setSelectedSurveyId] = useState(0);
    const navigate = useNavigate();
    const [permission, setPermission] = useState(false);

    useEffect(() => {
        checkPermissions()
            .then((data) => {
                setPermission(true);
            }).catch((error) => {
                alert('접근 권한이 없습니다.');
                navigate("/");
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
            {children}
        </WorkspaceContext.Provider >
    )
}

export const useWorkspaceContext = () => useContext(WorkspaceContext);