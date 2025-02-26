const TOKEN_KEY = "auth_token"


const TokenService = {
    getToken: (): string | null => {
        const value = localStorage.getItem(TOKEN_KEY);
        return value;
    },
    setNewToken: (newToken: string): void => {
        localStorage.setItem(TOKEN_KEY, newToken);
    },
    clear: (): void => {
        localStorage.removeItem(TOKEN_KEY);
    },
}
export default TokenService;