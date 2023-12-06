import axios from 'axios';

const instance = axios.create({
    headers: {
        "Content-Type": "application/json",
    }
});

async function call(api, method, request) {
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

        // token 추가
        const accessToken = localStorage.getItem("ACCESS_TOKEN");
        if (accessToken) {
            config.headers.Authorization = "Bearer " + accessToken;
        }

        const response = await instance(config);

        return response.data;
    } catch (error) {
        throw error;
    }

export const login = async () => {
    const loginData = {
        email: '404444@naver.com',
        password: "qkrthdud6032!",
    };

    call("/login", 'POST', loginData)
        .then(data => {
            localStorage.setItem("ACCESS_TOKEN", data.token);
            localStorage.setItem("REFRESH_TOKEN", data.refreshToken);
        }).catch(error => {
            console.error(error);
        });
}

export const createWorkspace = (workspaceName) => {
    const data = {
        workspaceName: workspaceName,
    };

    return call("/workspace/", 'POST', data);
}

export const getWorkspaceList = () => {
    return call("/workspace/list", "GET");
}

export const getSurveyList = (workspaceId) => {
    return call(`/survey/list/${workspaceId}?type=`, "GET");
}


export const modifyWorkspace = (workspaceId, workspaceName) => {
    const data = {
        workspaceName: workspaceName,
    };

    return call(`/workspace/${workspaceId}`, 'PATCH', data);
}

export const removeWorkspace = (workspaceId) => {
    return call(`/workspace/${workspaceId}`, "DELETE");
}

// 유저 정보 조회
export const getUserInfo = () => {
    return call("/user/info", "GET");
}

// 설문지 삭제
export const removeSurvey = (surveyId) => {
    return call(`/survey/${surveyId}`, "DELETE");
}