import { useNavigate } from "react-router";
import { useCurrentUser } from "../../hooks/auth";
import { Group, Skeleton, Stack, Title } from "@mantine/core";

const HomePage = () => {
    const navigate = useNavigate();
    const {data: currentUser, isLoading: isUserLoading, isError} = useCurrentUser();

    if (isError){
        navigate("/login");
    }


    return (
        <Stack>
            {
                isUserLoading
                ? (
                    <Group h={35}>
                        <Skeleton w={"400px"} height={32} radius="md" /> 
                    </Group>
                ): <Title order={2}>Добро пожаловать, {currentUser && currentUser.login}</Title>
            }

            
        </Stack>
    )
}

export default HomePage;