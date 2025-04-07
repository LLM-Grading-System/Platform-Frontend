interface StudentSchema {
    studentId: string;
    telegramUsername: string;
    githubUsername: string | null;
    registeredAt: number
}

export type {StudentSchema};