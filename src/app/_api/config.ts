import axios, { AxiosInstance } from "axios";

const config = {
  backend: {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  },
};

const server = config.backend.baseURL;
const REFRESH_URL = "/user-service/auth/reissue";

const api: AxiosInstance = axios.create({
  baseURL: server,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const getNewAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await api.post(
      REFRESH_URL,
      {},
      { headers: { Refresh: refreshToken } }
    );
    console.log(response);
  } catch (err) {
    // refreshToken이 유효하지 않을 경우 로그아웃
    console.log(err);
  }
};

api.interceptors.response.use(
  (response) => response,
  async (err) => {
    const {
      config,
      response: { status },
    } = err;
    // 401 에러가 아닌 경우 단순 reject
    if (config.url === REFRESH_URL || status !== 401 || config.sent) {
      return Promise.reject(err);
    }

    // 401 에러인 경우 accessToken 재발급 후 API 재호출
    config.sent = true;
    const accessToken = await getNewAccessToken();
  }
);

export default api;
