import { db } from "."
import { getUser } from "./session"

export const createStory = async (request: Request, fields: { title: string; description: string }) => {
   const user = await getUser(request)

   if (!user) {
      throw new Error("user not found")
   }

   return await db.story.create({ data: { title: fields.title, authorId: user?.id } })
}
