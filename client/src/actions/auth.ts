import { Dispatch } from 'react';
import { NavigateFunction } from 'react-router-dom';
import * as api from '../api';
import { AUTH, LOGOUT } from '../constants/actionTypes';
import { formData } from '../types';

type authProps = {
	formData: formData;
	navigate: NavigateFunction;
};

const signin =
	({ formData, navigate }: authProps) =>
	async (dispatch: Dispatch<any>) => {
		try {
			const { data } = await api.signIn(formData);
			dispatch({ type: AUTH, data });
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

const signup =
	({ formData, navigate }: authProps) =>
	async (dispatch: Dispatch<any>) => {
		try {
			const { data } = await api.signUp(formData);
			dispatch({ type: AUTH, data });
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

export { signin, signup };
