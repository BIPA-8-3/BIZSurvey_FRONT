import axios from 'axios';

let URI = '';

if (process.env.NODE_ENV === 'development') {
    URI = 'http://www.localhost:8080';
} else {
    URI = 'http://www.bizsurvey.shop/api';
}

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

const acceptInviteSSE = (workspaceId) => {
    const sse = new EventSource(`/acceptInvite/${workspaceId}`);

    sse.addEventListener('acceptInvite', e => {
        const { data: receivedConnectData } = e;
        console.log('acceptAdmin event data: ', receivedConnectData); // "connected!"
        return receivedConnectData;
    })
}

// 일반 api
// 공유 API
const shareURI = '/workspace/shared-survey';

// 연락처 API
const contactURI = '/workspace/contact';


// 관리자 API
const adminURI = '/workspace/admin';

const workspaceURI = '/workspace';

let instance = axios.create({
    headers: {
        "Content-Type": "application/json",
    }
});

const RefreshRequest = async () => {
    const saveAccessTokenToLocalStorage = (token) => {
      localStorage.setItem('accessToken', token);
    };

    try{
        const response = await axios.get(URI + '/refresh', {
            headers: {
                refreshAuthorization: localStorage.getItem("refreshToken"),
            },
        });
    
        const headers = response.headers;
        const authorization = headers['authorization'];
        saveAccessTokenToLocalStorage(authorization);
        return true;
    }catch(error){
        console.error("Error refreshing token:", error);
        return false;
    }
  };

export default async function call(api, method, request, file) {
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

        // token 추가
        // const accessToken = localStorage.getItem("ACCESS_TOKEN");
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = "Bearer " + accessToken;
        }

        if (file) {
            config.headers = {
                "Content-Type": "multipart/form-data",
            }
        }

        const response = await instance(config);

        return response.data;
    } catch (error) {
        if (error.response.data.errorCode === 402) {
            const refreshTokenSuccess = await RefreshRequest();
            if (refreshTokenSuccess) {
                return call(api, method, request, file);
            } else {
                throw new Error("Failed to refresh token.");
            }
        }else{
            throw error;
        }
    }
    
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



// 공유 실행
export const shareSurvey = (sharedRequest) => {
    return call(`${shareURI}`, "POST", sharedRequest);
}

// 공유 히스토리 조회
export const getSharedSurveyHistory = (id) => {
    return call(`${shareURI}/${id}`, "GET");
}

// 공유 상세 내역 조회
export const getSharedContactList = (id) => {
    return call(`${shareURI}/survey/${id}`, "GET");
}

// 설문지 이름 수정
export const modifySurveyName = (id, title) => {
    const request = {
        surveyId: id,
        title: title,
    }
    return call(`/workspace/survey`, "PATCH", request);
}

// 기본형 개인 외부 집계
export const getPersonalResult = (sharedListId) => {
    return call(`${shareURI}/personal/result/${sharedListId}`, "GET");
}

// 기본형 전체 외부 집계
export const getSharedSurveyResult = (sharedSurveyId) => {
    return call(`${shareURI}/external/${sharedSurveyId}`, "GET");
}

// 점수형 개인 외부 집계
export const getdPersonalScoreResult = (sharedSurveyId) => {
    return call(`${shareURI}/personal/score/result/${sharedSurveyId}`, "GET");
}

// 점수형 전체 외부 집계
export const getSharedSurveyScoreResult = (surveyId, sharedSurveyId) => {
    return call(`${shareURI}/score/result/${surveyId}/${sharedSurveyId}`, "GET");
}

// 권한 체크
export const checkPermissions = () => {
    return call(`${workspaceURI}/permission/check`, "GET");
}