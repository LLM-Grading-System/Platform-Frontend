import { useParams } from "react-router";
import { useTaskById, useEditTask  } from "../../hooks/tasks";
import { Stack, Title, Skeleton, Group, Text, Button, TextInput, Select, TagsInput, Switch, Tabs, Textarea } from "@mantine/core";
import { useEffect, useState } from "react";
import { showWarning } from "../../utils/notifications";
import { getTaskPath, TASKS_PATH } from "../../app/paths";
import AppBreadcrumbs from "../../components/breadcrumbs";
import { EditTaskRequest } from "../../types/api-tasks";
import { taskLevel } from "../../services/api/tasks";
import { IconFileDescription, IconInfoCircle } from "@tabler/icons-react";
import MDEditor from "@uiw/react-md-editor";
import { SystemInstructionTemplate } from "../../app/settings";


const TaskEditPage = () => {
    const {taskId} = useParams();
    const {data: fetchedTask, isLoading: isTaskLoading, isError} = useTaskById(taskId);
    const [currentTask, setCurrentTask] = useState<EditTaskRequest | null>(null);
    const {mutateAsync: updateTask, isPending: isUpdateLoading} = useEditTask();

    useEffect(() => {
        if (fetchedTask){
            setCurrentTask(fetchedTask);
        }
    }, [fetchedTask]);

    const handleUpdateModel = () => {
        if (!fetchedTask || !currentTask){
            return
        }
        if (currentTask.name === ""){
            showWarning("Название не может быть пустым");
            return;
        }
        if (currentTask.githubRepoUrl === ""){
            showWarning("Ссылка на GitHub-репозиторий не может быть пустой");
            return;
        }
        updateTask({taskId: fetchedTask?.taskId, data: currentTask});
    }

    const handleGenerateTemplate = () => {
        if (currentTask !== null) {
            setCurrentTask(({...currentTask, systemInstructions: SystemInstructionTemplate}))
        }
    }

    if (isError){
        return (
            <Stack gap={"xs"}>
                <Title order={2}>
                    Модель не найдена
                </Title>
                <Text>
                    Запрашиваемой модели не существует или ее слаг был изменен
                </Text>
            </Stack>
        )
    }

    const breadcrumbs = [
        {label: "Каталог", url: TASKS_PATH},
        {label: fetchedTask?.name || "", url: getTaskPath(fetchedTask?.taskId || "")},
        {label: "Редактирование", url: null},
    ]

    return (
        <Stack>
            {
                isTaskLoading
                ? <Skeleton w={"400px"} height={18} radius="md" />
                : <AppBreadcrumbs breadcrumbs={breadcrumbs} /> 
            }

            <Tabs variant="default" defaultValue="general">
                <Tabs.List>
                    <Tabs.Tab value="general" rightSection={<IconInfoCircle size={16} />}>
                        Общее
                    </Tabs.Tab>
                    <Tabs.Tab value="system" rightSection={<IconFileDescription size={16} />}>
                        Системная инструкция
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="general">
                    <Stack mt="sm" gap={"xs"} maw={"600px"}>                   
                        {
                            isTaskLoading
                            ? (
                                <div>
                                    <Group h={24}>
                                        <Skeleton w={"100px"} height={18} radius="md" /> 
                                    </Group>
                                    <Group h={35}>
                                        <Skeleton w={"600px"} height={32} radius="md" /> 
                                    </Group>
                                </div>
                            ): currentTask && (
                                <TextInput
                                    variant="filled"
                                    flex={1}
                                    value={currentTask.name}
                                    onChange={e => setCurrentTask({...currentTask, name: e.currentTarget.value})}
                                    label={<Text>Название</Text>}
                                    placeholder="Начните писать здесь"
                                />
                            )
                        }

                        {
                            isTaskLoading
                            ? (
                                <div>
                                    <Group h={24}>
                                        <Skeleton w={"100px"} height={18} radius="md" /> 
                                    </Group>
                                    <Group h={35}>
                                        <Skeleton w={"600px"} height={32} radius="md" /> 
                                    </Group>
                                </div>
                            ): currentTask && (
                                <TextInput
                                    variant="filled"
                                    flex={1}
                                    value={currentTask.githubRepoUrl}
                                    onChange={e => setCurrentTask({...currentTask, githubRepoUrl: e.currentTarget.value})}
                                    label={<Text>GitHub-репозиторий</Text>}
                                    placeholder="Вставьте ссылку сюда"
                                />
                            )
                        }

                        {
                            isTaskLoading
                            ? (
                                <div>
                                    <Group h={24}>
                                        <Skeleton w={"100px"} height={18} radius="md" /> 
                                    </Group>
                                    <Group h={35}>
                                        <Skeleton w={"600px"} height={32} radius="md" /> 
                                    </Group>
                                </div>
                            ): currentTask && (
                                <Select 
                                    variant="filled"
                                    label={<Text>Уровень сложности</Text>}
                                    defaultValue={taskLevel.low}
                                    data={[taskLevel.low, taskLevel.medium, taskLevel.high]} 
                                    value={currentTask.level} 
                                    onChange={value => value && setCurrentTask({...currentTask, level: value})} 
                                />
                            )
                        }

                        {
                            isTaskLoading
                            ? (
                                <div>
                                    <Group h={24}>
                                        <Skeleton w={"100px"} height={18} radius="md" /> 
                                    </Group>
                                    <Group h={56}>
                                        <Skeleton w={"600px"} height={50} radius="md" /> 
                                    </Group>
                                </div>
                            ): currentTask && (
                                <Textarea
                                    variant="filled"
                                    flex={1}
                                    value={currentTask.ideas}
                                    onChange={e => setCurrentTask({...currentTask, ideas: e.currentTarget.value})}
                                    label={<Text>Идеи</Text>}
                                    placeholder="Вставьте ссылку сюда"
                                    resize="vertical"
                                    minRows={3}
                                />
                            )
                        }

                        {
                            isTaskLoading
                            ? (
                                <div>
                                    <Group h={24}>
                                        <Skeleton w={"100px"} height={18} radius="md" /> 
                                    </Group>
                                    <Group h={35}>
                                        <Skeleton w={"600px"} height={32} radius="md" /> 
                                    </Group>
                                </div>
                            ): currentTask && (
                                <TagsInput
                                    variant="filled"
                                    label={<Text>Теги</Text>}
                                    placeholder="Ввведите категорию или технологию"
                                    value={currentTask.tags}
                                    onChange={value => setCurrentTask({...currentTask, tags: value})}
                                    clearable
                                />
                            )
                        }
                        
                        {
                            isTaskLoading
                            ? (
                                <div>
                                    <Group h={24}>
                                        <Skeleton w={"100px"} height={18} radius="md" /> 
                                    </Group>
                                    <Group h={35}>
                                        <Skeleton w={"600px"} height={32} radius="md" /> 
                                    </Group>
                                </div>
                            ): currentTask && (
                                <Switch
                                    label={<Text>Черновик</Text>}
                                    checked={currentTask.isDraft}
                                    onChange={(e) => setCurrentTask({...currentTask, isDraft: e.currentTarget.checked})}
                                />
                            )
                        }

                    </Stack>
                </Tabs.Panel>
                
                <Tabs.Panel value="system" p="sm">
                    <Stack>
                    {
                        isTaskLoading
                        ? (
                            <Group h={500}>
                                <Skeleton height={500} radius="md" /> 
                            </Group>
                        ): currentTask && (
                            <>
                                <Button w={"240px"} variant="light" onClick={handleGenerateTemplate}>
                                    Сгенерировать по шаблону
                                </Button>
                                <MDEditor 
                                    preview="edit" 
                                    height={500} 
                                    value={currentTask.systemInstructions} 
                                    onChange={value => setCurrentTask({...currentTask, systemInstructions: value || ""})} 
                                />
                            </>
                            
                        )
                    }
                    </Stack>
                </Tabs.Panel>
            </Tabs>
            <Group>
                <Button 
                    size="sm"
                    variant="filled" 
                    radius="md"
                    w="200px"
                    loading={isUpdateLoading}
                    onClick={handleUpdateModel}
                >
                    Сохранить
                </Button>
            </Group>
        </Stack>
    )
}
export default TaskEditPage;