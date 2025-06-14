type Attachment = {
    id: number;
    taskId: string;
    fileUrl: string;
}

// const attachmentSchema = z.object({
//     id: z.string(),
//     task_id: z.string(),
//     file_url: z.string().url()
// })