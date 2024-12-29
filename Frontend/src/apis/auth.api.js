import { useMutation } from '@tanstack/react-query';
import { BASE_URL } from '../config/api';
import axios from 'axios';

const URI_AUTH = `${BASE_URL}/api/auth`;

const URI = {
	login: `${URI_AUTH}/login`,
	register: `${URI_AUTH}/register`,
};

const auth = {
	login: (payload) => {
		return axios.post(URI.login, payload);
	},
	register: (payload) => {
		return axios.post(URI.register, payload);
	},
};

export const useLogin = ({ onSuccess, onError }) => {
	return useMutation({
		mutationFn: (payload) => auth.login(payload),
		mutationKey: ['auth', 'login'],
		onSuccess: (data, variables) => {
			onSuccess(data, variables);
		},
		onError: (error, variables) => {
			onError(error, variables);
		},
	});
};

export const useRegister = ({ onSuccess, onError }) => {
	return useMutation({
		mutationFn: (payload) => auth.register(payload),
		mutationKey: ['auth', 'register'],
		onSuccess: (data, variables) => {
			onSuccess(data, variables);
		},
		onError: (error, variables) => {
			onError(error, variables);
		},
	});
};
