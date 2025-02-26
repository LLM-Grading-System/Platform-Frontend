import { Stack, Title, TextInput, Textarea, Text, Button, Group, TagsInput, Select, Switch, Tabs } from "@mantine/core";
import { useState } from "react";
import MDEditor, { selectWord } from "@uiw/react-md-editor";
import { useCreateTask } from "../../hooks/tasks";
import { showWarning } from "../../utils/notifications";
import { CreateTaskRequest } from "../../types/api-tasks";
import { taskLevel } from "../../services/api/tasks";
import { IconFileDescription, IconInfoCircle, IconSettings } from "@tabler/icons-react";


const initialModel: CreateTaskRequest ={
    name: "",
    description: "",
    tags: [],
    githubRepoUrl: "",
    level: taskLevel.low,
    isDraft: true
}


const TaskCreatePage = () => {
    const [currentTask, setCurrentTask] = useState<CreateTaskRequest>(initialModel);
    const {mutateAsync: createTask, isPending: isCreateLoading} = useCreateTask();

    const handleCreateTask = () => {
        if (currentTask.name === ""){
            showWarning("Название не может быть пустым");
            return;
        }
        if (currentTask.description === ""){
            showWarning("Описание не может быть пустым");
            return;
        }
        if (currentTask.githubRepoUrl === ""){
            showWarning("Ссылка на GitHub-репозиторий не может быть пустой");
            return;
        }
        createTask(currentTask);
    }

    return (
        
        <Stack maw={"800px"}>
            <Title order={2}>Новая задача</Title>
            <Tabs variant="default" defaultValue="base">
                <Tabs.List>
                    <Tabs.Tab value="base" leftSection={<IconInfoCircle size={16} />}>
                        Общее
                    </Tabs.Tab>
                    <Tabs.Tab value="description" leftSection={<IconFileDescription size={16} />}>
                        Описание
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="base" p="sm">
                    <Stack>
                        <TextInput
                            variant="filled"
                            flex={1}
                            value={currentTask.name}
                            onChange={e => setCurrentTask({...currentTask, name: e.currentTarget.value})}
                            label={<Text>Название</Text>}
                            placeholder="Начните писать здесь"
                        />

                        <TextInput
                            variant="filled"
                            flex={1}
                            value={currentTask.githubRepoUrl}
                            onChange={e => setCurrentTask({...currentTask, githubRepoUrl: e.currentTarget.value})}
                            label={<Text>GitHub-репозиторий</Text>}
                            placeholder="Вставьте ссылку сюда"
                        />

                        <Select 
                            variant="filled"
                            label={<Text>Уровень сложности</Text>}
                            defaultValue={taskLevel.low}
                            data={[taskLevel.low, taskLevel.medium, taskLevel.high]} 
                            value={currentTask.level} 
                            onChange={value => value && setCurrentTask({...currentTask, level: value})} 
                        />

                        <TagsInput
                            variant="filled"
                            label={<Text>Теги</Text>}
                            placeholder="Ввведите тематику или используемые инструменты"
                            value={currentTask.tags}
                            onChange={value => setCurrentTask({...currentTask, tags: value})}
                            data={[]}
                            clearable
                        />

                        <Switch
                            variant="filled"
                            label={<Text>Черновик</Text>}
                            checked={currentTask.isDraft}
                            onChange={(e) => setCurrentTask({...currentTask, isDraft: e.currentTarget.checked})}
                        />


                    </Stack>
                </Tabs.Panel>

                <Tabs.Panel value="description" p="sm">
                    <MDEditor preview="edit" height={500} value={currentTask.description} onChange={value => setCurrentTask({...currentTask, description: value || ""})} />
                </Tabs.Panel>
            </Tabs>


            <Group mb="lg">
                <Button w={"150px"} onClick={handleCreateTask} loading={isCreateLoading}>
                    Создать
                </Button>
            </Group>
            
        </Stack>
    )
}

export default TaskCreatePage;