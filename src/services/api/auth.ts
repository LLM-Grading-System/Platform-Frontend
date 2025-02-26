import { LoginRequest, RegisterRequest, TokenResponse, UserResponse } from "../../types/api-auth";
import { SuccessResponse } from "../../types/api-general";
import { axiosInstance } from "./axios-config";


const LOGIN_URL = '/api/auth/login';
const REGISTER_URL = '/api/auth/register';
const CURRENT_USER_URL = '/api/auth/me';


const login = async (loginData: LoginRequest): Promise<TokenResponse> => {
    const response = await axiosInstance.post<TokenResponse>(LOGIN_URL, loginData);
    return response.data;
};

const register = async (registerData: RegisterRequest): Promise<SuccessResponse> => {
    const response = await axiosInstance.post<SuccessResponse>(REGISTER_URL, registerData);
    return response.data;
};

const getCurrentUser  = async (): Promise<UserResponse> => {
    const response = await axiosInstance.get<UserResponse>(CURRENT_USER_URL);
    return response.data;
};

export {login, register, getCurrentUser};