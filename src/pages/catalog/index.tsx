import React from "react";
import { Grid, Skeleton, Title, Text, Group } from '@mantine/core';
import TaskCard from "../../components/task-card";
import { useTasks } from "../../hooks/tasks";


const CatalogPage: React.FC = () => {
    const {data: tasks, isLoading: isTasksLoading} = useTasks()


    return (
        <div>
            <Group mb={"md"}>
                {
                    isTasksLoading
                    ? <Skeleton h={"36px"} w="400px" radius="md" />
                    : <Title h={"36px"} order={2}>Каталог заданий</Title>
                }
            </Group>
            <Grid>
                {
                    tasks && tasks.map(task => (
                        <Grid.Col key={task.taskId} span={{ base: 12, sm: 12, md: 6, lg: 4 }}>
                            <TaskCard task={task}/>
                        </Grid.Col>
                    ))
                }
                {
                    isTasksLoading && [1, 2, 3, 4, 5, 6, 7, 8, 9].map(element => (
                        <Grid.Col key={element} span={{ base: 12, sm: 12, md: 6, lg: 4 }}>
                            <TaskCard task={null}/>
                        </Grid.Col>
                    ))
                }
            </Grid>
            
            {
                tasks && tasks.length === 0 && <Text mt={"sm"} ms={"sm"}>Ни одной задачи не найдено</Text>
            }
        </div>
    )
}
export default CatalogPage;