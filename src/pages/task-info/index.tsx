import { useParams, useNavigate } from "react-router";
import { useTaskById, useRemoveTask  } from "../../hooks/tasks";
import { Stack, Title, Skeleton, Group, Text, Badge, Button, Modal, Tabs, Menu, ActionIcon, Anchor } from "@mantine/core";
import {useDisclosure} from "@mantine/hooks"
import { IconFileDescription, IconInfoCircle, IconPencil, IconSettings, IconStar, IconTrashX } from "@tabler/icons-react";
import { getEditTaskPath, LOGIN_PATH, TASKS_PATH } from "../../app/paths";
import AppBreadcrumbs from "../../components/breadcrumbs";
import MDEditor from "@uiw/react-md-editor";
import { AxiosError } from "axios";
import { useEffect } from "react";



const TaskInfoPage = () => {
    const {taskId} = useParams();
    const {data: task, isLoading: isTaskLoading, isError: isTaskError, error: taskError} = useTaskById(taskId);
    const {mutateAsync: removeTask, isPending: isRemoveLoading} = useRemoveTask();
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isTaskError) {
            if ((taskError as AxiosError).response?.status === 401) {
                navigate(LOGIN_PATH);
            }
        }
    }, [isTaskError, taskError, navigate]); 

    if (isTaskError){
        return (
            <Stack gap={"xs"}>
                <Title order={2}>
                    Задание не найдено
                </Title>
                <Text>
                    Запрашиваемого задания не существует
                </Text>
            </Stack>
        )
    }

    const breadcrumbs = [
        {label: "Каталог", url: TASKS_PATH},
        {label: task?.name || "", url: null},
    ]

    return (
        <Stack gap={"xs"}>
            <Modal opened={opened} onClose={close} title={<Text fw={600}>Удаление задачи</Text>} centered>
                <Stack>
                    <Text>
                        Вы действительно хотите удалить задачу?
                    </Text>
                    <Group grow>
                        <Button variant="light" color="red" loading={isRemoveLoading} onClick={() => task && removeTask({taskId: task.taskId})}>
                            Да, удалить
                        </Button>
                        <Button variant="light" color="grey" onClick={close}>
                            Отмена
                        </Button>
                    </Group>
                </Stack>
            </Modal>
            {
                isTaskLoading
                ? <Skeleton w={"400px"} height={18} radius="md" />
                : <AppBreadcrumbs breadcrumbs={breadcrumbs} /> 
            }

            {
                isTaskLoading
                ? (
                    <Group h={35}>
                        <Skeleton w={"600px"} height={32} radius="md" /> 
                    </Group>
                ):  task && (
                    <Group>
                        <Title order={3} flex={1}>{task.name}</Title>
                        <Menu shadow="md" width={200}>
                            <Menu.Target>
                            <ActionIcon variant="transparent" c="black">
                                <IconSettings size={24} />
                            </ActionIcon>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Item onClick={() => navigate(getEditTaskPath(task.taskId))} leftSection={<IconPencil size={18} />}>
                                    Редактировать
                                </Menu.Item>
                                <Menu.Item onClick={open} leftSection={<IconTrashX size={18} />}>
                                    Удалить
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                )
            }

            <Tabs variant="default" defaultValue="general" mb="md">
                <Tabs.List>
                    <Tabs.Tab value="general" rightSection={<IconInfoCircle size={16} />}>
                        Общее
                    </Tabs.Tab>
                    <Tabs.Tab value="system" rightSection={<IconFileDescription size={16} />}>
                        Системная инструкция
                    </Tabs.Tab>
                    <Tabs.Tab value="statistics" rightSection={<IconStar size={14} />}>
                        Статистика
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="general" p="sm">
                    <Stack gap={"xs"} maw={"600px"}>
                    {
                        isTaskLoading
                        ? <Group h={24}><Skeleton w={"250px"} height={18} radius="md" /></Group>
                        : <Text>Уровень сложности: {task && task.level}</Text>
                    } 

                    {
                        isTaskLoading
                        ? <Group h={24}><Skeleton w={"250px"} height={18} radius="md" /></Group>
                        : <Text>Статус: {task && task.isDraft && "черновик" || "опубликован"}</Text>
                    } 

                    {
                        isTaskLoading
                        ? <Group h={24}><Skeleton w={"250px"} height={18} radius="md" /></Group>
                        : (
                            <Text>
                                Репозиторий: <Anchor href={task && task.githubRepoUrl} target="_blank" underline="always">
                                    GitHub
                                </Anchor>
                            </Text>
                            
                        )
                    } 

                    {
                        isTaskLoading
                        ? (
                            <Group>
                                <Skeleton w={"150px"} height={20} radius="md" />
                                <Skeleton w={"150px"} height={20} radius="md" />
                                <Skeleton w={"150px"} height={20} radius="md" />
                            </Group>
                        )
                        : (
                            <Group gap={"xs"}>
                                {
                                    task && task.tags.map(tag => (
                                        <Badge variant="dot" key={tag}>{tag}</Badge>
                                    ))
                                }
                            </Group>
                        )
                    }
                    </Stack>
                </Tabs.Panel>

                <Tabs.Panel value="system" p="sm">
                    {
                        isTaskLoading
                        ? <Group h={24}><Skeleton w={"600px"} height={18} radius="md" /></Group>
                        : task && (<MDEditor.Markdown source={task.description} />)
                    }
                </Tabs.Panel>

                <Tabs.Panel value="statistics" p="sm">
                    <Text>Статистика</Text>
                </Tabs.Panel>
            </Tabs>
            

        </Stack>
    )
}
export default TaskInfoPage;

