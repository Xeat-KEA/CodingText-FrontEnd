import axios, { AxiosInstance } from "axios";
import { useTokenStore } from "../stores";

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
    const {
      data: { accessToken, refreshToken: newRefreshToken },
    } = await api.post(REFRESH_URL, {}, { headers: { Refresh: refreshToken } });
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", newRefreshToken);

    // 전역 변수 갱신
    useTokenStore.getState().setAccessToken(accessToken);

    return accessToken;
  } catch (err) {
    // refreshToken이 유효하지 않을 경우 로그아웃
    localStorage.clear();
    window.location.reload();
    useTokenStore.getState().setAccessToken("");
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
    if (
      config.url === REFRESH_URL ||
      (status !== 401 && status !== 402) ||
      config.sent
    ) {
      return Promise.reject(err);
    }

    if (status === 401) {
      localStorage.clear();
      window.location.reload();
      useTokenStore.getState().setAccessToken("");
      return null;
    }

    if (status === 402) {
      // 402 에러(accessToken 만료)인 경우 accessToken 재발급 후 API 재호출
      config.sent = true;
      const accessToken = await getNewAccessToken();

      if (accessToken) {
        config.headers.Authorization = accessToken;
      }

      return axios(config);
    }
  }
);

export default api;
