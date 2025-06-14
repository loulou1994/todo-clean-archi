type TaskTag = {
  id: number;
  taskId: string;
  tagId: string;
};

type InsertTaskTag = Omit<TaskTag, "id">;
