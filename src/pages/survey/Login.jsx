import axios from "axios";

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export async function call(api, method, request) {
  try {
    const config = {
      url: api,
      method: method,
      headers: {},
    };

    if (method.toUpperCase() === "GET") {
      config.params = request;
    } else {
      config.data = request;
    }

    // token 추가
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = "Bearer " + accessToken;
    }

    const response = await instance(config);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const login = () => {
  const loginData = {
    email: "404444@naver.com",
    password: "qkrthdud6032!",
  };

  call("/login", "POST", loginData)
    .then((data) => {
      localStorage.setItem("ACCESS_TOKEN", data.token);
      localStorage.setItem("REFRESH_TOKEN", data.refreshToken);
    })
    .catch((error) => {
      console.error(error);
    });
};
