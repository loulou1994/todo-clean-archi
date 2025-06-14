import { existsSync, mkdirSync } from "fs"

export const createDirIfNotExists = (dir: string) => {
    if (!existsSync(dir)) mkdirSync(dir)
}