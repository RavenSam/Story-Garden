import { db } from "."
import { getUser } from "./session"

export const createStory = async (request: Request, fields: { title: string; description: string }) => {
   const user = await getUser(request)

   if (!user) throw new Error("user not found")

   return await db.story.create({ data: { title: fields.title, authorId: user?.id } })
}

export const getStories = async (request: Request, count: number) => {
   const user = await getUser(request)

   if (!user) throw new Error("user not found")

   return await db.story.findMany({ where: { authorId: user.id }, take: count, orderBy: { updatedAt: "desc" } })
}
