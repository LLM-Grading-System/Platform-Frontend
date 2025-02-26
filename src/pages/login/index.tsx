import { Title, Stack, Text, Container, TextInput, PasswordInput, Button } from "@mantine/core";
import { useState } from "react";
import { useLogin } from "../../hooks/auth";


interface LoginData {
    login: string,
    password: string
}


const LoginPage = () => {
    const [loginData, setLoginData] = useState<LoginData>({login: "", password: ""})
    const {mutateAsync: login, isPending: isLoginLoading} = useLogin();

    const handleLogin = () => {
        login({...loginData, userAgent: navigator.userAgent})
    }

    return (
        <Container fluid px={0} >
            <Stack gap={"xs"} w={"400px"} mx="auto" mt="200px">
                <Title ta="center" order={2}>
                    Вход
                </Title>
                <TextInput
                    variant="filled"
                    value={loginData.login}
                    onChange={e => setLoginData({...loginData, login: e.currentTarget.value})}
                    label={<Text>Логин</Text>}
                    placeholder="Начните писать здесь"
                />
                <PasswordInput
                    variant="filled"
                    value={loginData.password}
                    onChange={e => setLoginData({...loginData, password: e.currentTarget.value})}
                    label={<Text>Пароль</Text>}
                    placeholder="Начните писать здесь"
                />
                <Button mt="md" onClick={handleLogin} loading={isLoginLoading} loaderProps={{type: "dots"}}>
                    Войти
                </Button>
            </Stack>
        </Container>
    )
    
}
export default LoginPage;