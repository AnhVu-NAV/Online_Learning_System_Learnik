import axios from 'axios';

export const BASE_URL = 'http://localhost:4000/api';
export const URL_REFRESH_TOKEN = `${BASE_URL}/auth/refresh-token`;

const axiosInstance = axios.create({
	timeout: 10000,
	baseURL: BASE_URL,
});

axios.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token') ?? '';

		if (token) {
			config.headers['authorization'] = `Bearer ${token}`;
		}

		console.log('config: ', config);

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
				const refreshToken = localStorage.getItem('refreshToken');
				const response = await axios.post(URL_REFRESH_TOKEN, { refreshToken });
				localStorage.setItem('token', response.data.token);
				originalRequest.headers[
					'Authorization'
				] = `Bearer ${response.data.token}`;
				return axios(originalRequest);
			} catch (refreshError) {
				console.error('Error refreshing token:', refreshError);
				localStorage.removeItem('token');
				window.location.reload();
			}
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
