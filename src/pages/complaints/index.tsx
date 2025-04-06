import React, { useState } from "react";
import { Title, Text, Modal, Stack, Textarea, Button, Anchor, Group, Blockquote } from '@mantine/core';
import { Link } from "react-router";
import { useComplaints, useCreateComplaintAnswer } from "../../hooks/complaints";
import { DataTable, useDataTableColumns } from 'mantine-datatable';
import { useDisclosure } from "@mantine/hooks";
import { ComplaintSchema } from "../../types/api-complaints";
import { getTaskPath } from "../../app/paths";
import AppCopyButton from "../../components/copy-button";
import AppNavButton from "../../components/nav-button";
import { IconAtom, IconSchool } from "@tabler/icons-react";

interface ComplaintModalProps {
    currentComplaint: ComplaintSchema | null,
    saveTeacherResponseLoading: boolean,
    onSaveTeacherResponse: (teacherResponse: string) => void
}

const ComplaintModal: React.FC<ComplaintModalProps> = ({currentComplaint, onSaveTeacherResponse, saveTeacherResponseLoading}) => {
    const [teacherResponse, setTeacherResponse] = useState(""); 

    return currentComplaint && (
        <Stack>
            <Stack gap="xs">
                <Group wrap="nowrap" justify="space-between">
                    <Text>Жалоба</Text>
                    <Text truncate>{currentComplaint.complaintId}</Text>
                    <Group wrap="nowrap" gap={0}>
                        <AppCopyButton value={currentComplaint.complaintId} />
                    </Group>
                </Group>
                <Group wrap="nowrap" justify="space-between">
                    <Text>Задача</Text>
                    <Text truncate>{currentComplaint.taskId}</Text>
                    <Group wrap="nowrap" gap={0}>
                        <AppNavButton value={getTaskPath(currentComplaint.taskId)} />
                        <AppCopyButton value={currentComplaint.taskId} />
                    </Group>
                </Group>
                <Group wrap="nowrap" justify="space-between">
                    <Text>Студент</Text>
                    <Text truncate>{currentComplaint.studentId}</Text>
                    <Group wrap="nowrap" gap={0}>
                        <AppCopyButton value={currentComplaint.studentId} />
                    </Group>
                </Group>
                <Group wrap="nowrap">
                    <Text>Создана</Text>
                    <Text truncate>
                        {new Date(currentComplaint.createdAt * 1000).toLocaleString()}
                    </Text>
                </Group>
            </Stack>
            <Blockquote color="blue" iconSize={28} cite="Вопрос студента" icon={<IconSchool size={20} />} >
                {currentComplaint.studentRequest}
            </Blockquote>
            {
                currentComplaint.teacherResponse !== ""
                ? (
                    <Blockquote color="blue" iconSize={28} cite="Ответ преподавателя" icon={<IconAtom size={20} />} >
                        {currentComplaint.teacherResponse}
                    </Blockquote>
                ): (
                    <Stack gap="xs">
                        <Textarea
                            label="Написать ответ"
                            placeholder="Начните писать здесь"
                            variant="filled"
                            error={teacherResponse === ""? "Ответ не может быть пустым": ""}
                            value={teacherResponse}
                            onChange={e => setTeacherResponse(e.currentTarget.value)}
                        />
                        <Group>
                            <Button 
                                onClick={() => teacherResponse !== "" && onSaveTeacherResponse(teacherResponse)}
                                loading={saveTeacherResponseLoading}
                                size="xs"
                                variant="light"
                            >
                                Сохранить
                            </Button>
                        </Group>
                        
                    </Stack>
                )
            }
            
        </Stack>
    )
}


const ComplaintsPage: React.FC = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const [currentComplaint, setCurrentComplaint] = useState<ComplaintSchema | null>(null);
    const {data: complaints, isLoading: isComplaintsLoading, refetch: refetchComplaints} = useComplaints()
    const {mutateAsync, isPending: createAnswerLoading} = useCreateComplaintAnswer()

    const choiceComplaint = (complaint: ComplaintSchema) => {
        setCurrentComplaint(complaint);
        open();
    }

    const saveTeacherResponse = (teacherResponse: string) => {
        if (currentComplaint)
            mutateAsync({
                complaintId: currentComplaint.complaintId, 
                complaintData: {teacherResponse: teacherResponse}
            })
            .then(_ => {
                setCurrentComplaint({...currentComplaint, teacherResponse: teacherResponse});
            })
    }

    const { effectiveColumns } = useDataTableColumns<ComplaintSchema>({
        key: "resizable",
        columns: [
            { accessor: 'taskId', title: "Задача", width: 100,
                render: record => {
                    return (
                        <Link to={getTaskPath(record.taskId)}>
                            <Anchor fz={14} component="span" lineClamp={1}>
                                {record.taskId}
                            </Anchor> 
                        </Link>
                    )
                }
             },
            { accessor: 'studentId', title: "Студент", width: 100,
                render: record => (
                    <Text lineClamp={1}>{record.studentId}</Text>
                )
            },
            { accessor: 'createdAt', title: "Создана",  width: 100,
                render: record => (
                    <Text>
                    {new Date(record.createdAt * 1000).toLocaleDateString()}
                    </Text>
                )
            },
            { accessor: 'studentRequest', title: "Вопрос", resizable: true,
                render: record => (
                    <Text lineClamp={1}>{record.studentRequest}</Text>
                ) },
            { accessor: 'teacherResponse', title: "Ответ", resizable: true,
                render: record => (
                    <Text lineClamp={1}>{record.teacherResponse}</Text>
                ) 
            },
        ],
      });


    return (
        <>
            <Modal opened={opened} onClose={close} title={<Title h={"20px"} order={3}>Карточка жалобы</Title>}>
                <ComplaintModal 
                    currentComplaint={currentComplaint} 
                    onSaveTeacherResponse={saveTeacherResponse} 
                    saveTeacherResponseLoading={createAnswerLoading} 
                />
            </Modal>
            <Stack>
                <Title h={"36px"} order={2}>Каталог жалоб</Title>
                <Group>
                    <Button onClick={() => refetchComplaints()} size="xs">
                        Обновить
                    </Button>
                </Group>
                <DataTable
                    withTableBorder
                    columns={effectiveColumns}
                    records={complaints}
                    noRecordsText="Нет жалоб"
                    minHeight={150}
                    onRowClick={({ record }) => choiceComplaint(record)}
                    fetching={isComplaintsLoading}
                />
            </Stack>
        </>
    )
}
export default ComplaintsPage;