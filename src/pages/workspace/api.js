import axios from 'axios';

// sse
const instanceOfSse = axios.create({
    headers: {
        "Accept": "text/event-stream",
        "Cache-Control": "no-cache",
    }
})

// 이벤트 이름을 설정해 클라이언트에서 해당 이름으로 이벤트를 수신함
const connectWorkspace = () => {
    const sse = new EventSource("/connect");

    sse.addEventListener('connect', e => {
        const { data: receivedConnectData } = e;
        console.log('connect event data: ', receivedConnectData); // "connected!"
    })
}

const acceptInvite = (workspaceId) => {
    const sse = new EventSource(`/acceptInvite/${workspaceId}`);

    sse.addEventListener('acceptInvite', e => {
        const { data: receivedConnectData } = e;
        console.log('acceptAdmin event data: ', receivedConnectData); // "connected!"
        return receivedConnectData;
    })
}




// 일반 api
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

// 연락처 API
const contactURI = '/workspace/contact';


// 연락처 등록
export const createContact = (createRequest) => {
    return call(contactURI, "POST", createRequest);
}

// 연락처 조회
export const getContactList = (workspaceId) => {
    return call(`${contactURI}/list`, "GET", workspaceId);
}

// 연락처 삭제
export const removeContact = (id) => {
    return call(`${contactURI}/${id}`, "DELETE");
}

// 관리자 API
const adminURI = '/workspace/admin';

// 관리자 조회
export const getAdminList = (workspaceId) => {
    return call(`${adminURI}/list/${workspaceId}`, "GET");
}

// 관리자 초대
export const inviteAdmin = (inviteRequest) => {
    return call(`${adminURI}/invite`, "POST", inviteRequest);
}

// 관리자 삭제

export const removeAdmin = (id) => {
    return call(`${adminURI}/${id}`, "DELETE");
}