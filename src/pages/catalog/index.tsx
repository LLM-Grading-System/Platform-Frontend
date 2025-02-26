import React, { useState } from "react";
import { useSearchParams } from "react-router";
import { IconSearch, IconUsers, IconX } from '@tabler/icons-react';
import { useDisclosure, useDebouncedCallback } from '@mantine/hooks';
import { ActionIcon, Grid, TextInput, MultiSelect, ScrollArea, Stack, Drawer, Button, Group, Title, Text } from '@mantine/core';
import TaskCard from "../../components/task-card";
import { useTasks } from "../../hooks/tasks";

interface Filters {
    query?: string,
}


const CatalogPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const initalFilters: Filters = {query: searchParams.get('query') || ''}
    const [opened, { open, close }] = useDisclosure(false);
    const [filters, setFilters] = useState<Filters>(initalFilters)
    const {data: tasks, isLoading: isTasksLoading} = useTasks()

    const handleSearch = useDebouncedCallback(async (query: string) => {
        const updatedParams = { ...filters };
        if (query) {
            updatedParams.query = query;
        } else {
            if ('query' in updatedParams) {
                delete updatedParams.query;
            }
        }
        setSearchParams(updatedParams);
      }, 500);
    
    const handleSearchChange = (query: string) => {
        setFilters({...filters, query: query});
        handleSearch(query);
    }

    return (
        <div>
            <Drawer position="right" opened={opened} onClose={close} title={<Title order={3}>Дополнительные фильтры</Title>}>
                <ScrollArea>
                    <Stack>
                        <MultiSelect
                            leftSection ={<IconUsers size={18} stroke={1.5} />}
                            value={["Dan.Solovev@mail.x5.ru"]}
                            onChange={() => null}
                            label="Владельцы модели"
                            placeholder="Выберите владельца"
                            data={[{email: "Dan.Solovev@mail.x5.ru", firstname: "Daniil", lastname: "Solovev"}].map(owner => ({value: owner.email, label: `${owner.firstname} ${owner.lastname}`}))}
                            searchable
                            comboboxProps={{ shadow: 'md' }}
                        />
                        <Button variant="outline" onClick={() => null}>
                            Очистить
                        </Button>
                    </Stack>
                </ScrollArea>
            </Drawer>
            <Group mb={"md"}>
                <TextInput
                    value={filters.query}
                    onChange={e => handleSearchChange(e.currentTarget.value)}
                    flex={1}
                    radius="lg"
                    size="md"
                    placeholder="Поиск по названию и описанию модели"
                    rightSectionWidth={42}
                    leftSection={<IconSearch size={18} stroke={1.5} />}
                    rightSection={
                        <ActionIcon onClick={() => handleSearchChange("")} style={{borderWidth: 0}} loading={isTasksLoading} variant="default">
                            <IconX size={18} stroke={1.5} />
                        </ActionIcon>
                    }
                />
                <Button style={{display: "none"}} size="md" radius="lg" onClick={open}>
                    Фильтры
                </Button>
            </Group>

            <Grid>
                {
                    tasks && tasks.map(task => (
                        <Grid.Col key={task.taskId} span={{ base: 12, sm: 10, md: 8, lg: 6 }}>
                            <TaskCard task={task}/>
                        </Grid.Col>
                    ))
                }
                {
                    isTasksLoading && [1, 2, 3, 4, 5, 6, 7, 8, 9].map(element => (
                        <Grid.Col key={element} span={{ base: 12, sm: 10, md: 8, lg: 6 }}>
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