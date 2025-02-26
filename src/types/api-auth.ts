interface UserResponse {
    userId: string;
    login: string;
    role: string;
    createdAt: number;
}

interface LoginRequest {
    login: string;
    password: string;
    userAgent: string;
}

interface TokenResponse {
    token: string;
}

interface RegisterRequest {
    login: string;
    password: string;
    role: string;
}


export type {UserResponse, LoginRequest, RegisterRequest, TokenResponse};