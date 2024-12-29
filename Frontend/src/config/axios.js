import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';

export const BASE_URL = 'http://localhost:4000';

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
});

axiosInstance.interceptors.request.use(
	(config) => {
		const { authState } = useContext(AuthContext);
		const token = authState.token ?? '';

		if (token) {
			config.headers['authorization'] = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosInstance;
