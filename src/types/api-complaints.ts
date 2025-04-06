interface ComplaintSchema {
    "complaintId": string,
    "taskId": string,
    "studentId": string,
    "studentRequest": string,
    "teacherResponse": string,
    "createdAt": number
}

interface ComplaintAnswerRequest {
    "teacherResponse": string,
}

export type {ComplaintSchema, ComplaintAnswerRequest};