import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';

export const BASE_URL = 'http://localhost:4000/api/v1';

// Tạo instance axios với cấu hình mặc định
const axiosInstance = axios.create({
	baseURL: BASE_URL, // Sử dụng BASE_URL
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
});

axios.interceptors.request.use(
	(config) => {
		console.log('config');
		const token = localStorage.getItem('token') ?? '';

		console.log('token: ', token);

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

export default axiosInstance;
