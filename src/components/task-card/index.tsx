import {useNavigate} from "react-router";
import { Card, Title, Text, Badge, Skeleton, Group, Space } from '@mantine/core';
import { TaskResponse } from '../../types/api-tasks';
import { getTaskPath } from "../../app/paths";


interface TaskCardProps {
    task: TaskResponse | null
}


const TaskCard: React.FC<TaskCardProps> = ({task}) => {
    let navigate = useNavigate();
    return (
        <Card shadow="md" mih={"150px"} h="100%" padding="md" radius="md" withBorder style={{cursor: "pointer"}} onClick={() => task && navigate(getTaskPath(task.taskId))}>
            {
                task
                ? (
                    <Group>
                        <Title style={{ flex: 1 }} order={3} lineClamp={1}>{task.name}</Title>
                        {
                            task.isDraft && <Badge>Черновик</Badge>
                        }
                    </Group>
                )
                : (
                    <Group h={30}>
                        <Skeleton style={{ flex: 1 }} height={20} radius="md" /> 
                        <Skeleton w="25%" height={20} radius="lg" />
                    </Group>
                )
            }
            
            <Space h={4} />

            {
                task
                ? (
                    <Text fz={16} lineClamp={2}>
                        {task.description}
                    </Text>
                ): (
                    <Group h={50}>
                        <Skeleton height={44} radius="md" /> 
                    </Group>
                )
            }   

            <Space h={8} />

            {
                task
                ? (
                    <Group mt="auto" style={{rowGap: "4px", columnGap: "8px", flexWrap: "wrap", flexGrow: 1, maxHeight: "26px", overflow: "hidden"}}>
                        <Badge p="sm" variant="default" color="blue">{`${task.level}`}</Badge>
                        {
                            task.tags.map(tag => (
                                <Badge key={tag} p="sm" variant="default" color="blue">{`${tag}`}</Badge>
                            ))
                        }
                    </Group>
                )
                : (
                    <Group mt="auto" h={26} gap={8}>
                        {
                            [1, 2, 3].map(element => (
                                <Skeleton key={element} w="20%" height={22} radius="lg" /> 
                            ))
                        }
                    </Group>
                )
            }
        </Card>
  );
}

export default TaskCard;