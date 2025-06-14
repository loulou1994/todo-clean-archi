type Tag = {
    id: number,
    name: string,
    userId: string
}

type TagInsert = Omit<Tag, "id">