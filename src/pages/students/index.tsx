import React from "react";
import { Title, Text, Button, Group, Stack } from '@mantine/core';
import { DataTable, useDataTableColumns } from 'mantine-datatable';
import { useStudents } from "../../hooks/students";
import { StudentSchema } from "../../types/api-students";
import AppCopyButton from "../../components/copy-button";


const StudentsPage: React.FC = () => {
    const {data: students, isLoading: isStudentsLoading, refetch: refetchStudents} = useStudents()


    const { effectiveColumns } = useDataTableColumns<StudentSchema>({
        key: "student-columns",
        columns: [
            { accessor: 'studentId', title: "Идентификатор", width: 150,
                render: record => {
                    return (
                        <Group wrap="nowrap" gap={0}>
                            <Text truncate>{record.studentId}</Text>
                            <AppCopyButton value={record.studentId} />
                        </Group>
                    )
                }
             },
            { accessor: 'telegramUsername', title: "Telegram",
                render: record => (
                    <Group wrap="nowrap" gap={2}>
                        <Text truncate>{record.telegramUsername}</Text>
                        <AppCopyButton value={record.telegramUsername} />
                    </Group>
                )
            },
            { accessor: 'githubUsername', title: "GitHub",
                render: record =>  {
                    if (record.githubUsername === null){
                        return <Text fw="bold" c="yellow"> Не подтвержден </Text>
                    }
                    return (
                        <Group wrap="nowrap" gap={2}>
                            <Text truncate>{record.githubUsername}</Text>
                            <AppCopyButton value={record.githubUsername} />
                        </Group>
                    )
                }
            },
            { accessor: 'registeredAt', title: "Зарегистрирован", 
                render: record => (
                    <Text>
                    {new Date(record.registeredAt * 1000).toLocaleDateString()}
                    </Text>
                )
            }
        ],
      });


    return (
        <>
            <Stack>
                <Title h={"36px"} order={2}>Студенты</Title>
                <Group>
                    <Button onClick={() => refetchStudents()} size="xs">
                        Обновить
                    </Button>
                </Group>
                <DataTable
                    withTableBorder
                    columns={effectiveColumns}
                    records={students}
                    noRecordsText="Нет студентов"
                    minHeight={150}
                    fetching={isStudentsLoading}
                />
            </Stack>
        </>
    )
}
export default StudentsPage;