import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../config/axios';

const URI = {
	login: `/auth/login`,
	register: `/auth/register`,
};

const auth = {
	login: (payload) => {
		return axiosInstance.post(URI.login, payload);
	},
	register: (payload) => {
		return axiosInstance.post(URI.register, payload);
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
