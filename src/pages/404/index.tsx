import { Title, Stack, Text } from "@mantine/core";


const Page404 = () => {
    return (
        <Stack gap={"xs"}>
            <Title order={2}>
                Страница не найдена
            </Title>
            <Text>
                Запрашиваемой страницы не существует
            </Text>
        </Stack>
    )
    
}
export default Page404;