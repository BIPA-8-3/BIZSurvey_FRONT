import call from "./api.js";

// 관리자 API
const adminURI = '/workspace/admin';

// 관리자 초대 코드로 입장 시 유효성 체크 및 페이지 이동
export const inviteLinkVerification = (token) => {
    return call(`${adminURI}/invite/${token}`, "GET");
}

// 초대코드로 입장해서 로그인 완료했을때
export const acceptInvite = () => {
    let token = sessionStorage.getItem("INVITE_TOKEN");

    if (!token) {
        return null;
    }

    const request = {
        userId: null,
        token: token,
    }
    call(`${adminURI}`, "POST", request)
        .then((data) => {
        })
        .catch((error) => {
            console.error(error);
            error && error.response && error.response.data && alert(error.response.data);
        })
        .finally(() => {
            sessionStorage.removeItem("INVITE_TOKEN");
        });

    return "Success";
}

// 공유 API
const sharedURL = '/workspace/shared-survey';

// 공유 링크로 입장했을 때
export const sharedLinkVerification = (sharedsurveyId, token) => {
    return call(`${sharedURL}/link/${sharedsurveyId}/${token}`, "GET");
}