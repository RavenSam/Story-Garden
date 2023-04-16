import { redirect } from "solid-start"
import { db } from "."
import { userExists } from "./session"

/***************************************************************
 *
 * @param request
 * @param fields
 * @description creating a stoty if the user exists - the slug is within prisma middleware
 * @returns the created story
 */
export const createStory = async (request: Request, fields: { title: string; description: string }) => {
   const user = await userExists(request)

   const storyTitleExists = await db.story.findFirst({ where: { title: fields.title, AND: { authorId: user.id } } })

   if (storyTitleExists) throw new Error("Try another title.")

   return await db.story.create({ data: { title: fields.title, authorId: user?.id } })
}

/***************************************************************
 *
 * @param request
 * @param count
 * @description get a list of stories
 * @returns
 */
export const getStories = async (request: Request, count: number) => {
   const user = await userExists(request)

   return await db.story.findMany({ where: { authorId: user.id }, take: count, orderBy: { updatedAt: "desc" } })
}

/**
 *
 * @param request
 * @param slug
 * @returns
 */
export const getStory = async (request: Request, slug: string) => {
   const user = await userExists(request)

   const story = await db.story.findFirst({ where: { authorId: user.id, AND: { slug } } })

   if (!story) throw redirect("/author")

   return story
}

/***************************************************************
 *
 * @param request
 * @param id the story id
 * @description delete a single story if the story exists AND the authorId = user.id
 * @returns
 */
export const deleteStory = async (request: Request, id: string) => {
   const user = await userExists(request)

   const storyExists = await db.story.findFirst({ where: { id, AND: { authorId: user.id } } })

   if (!storyExists) throw new Error("Story doesn't exist or you you don't have permission.")

   return await db.story.delete({ where: { id } })
}

/**
 *
 * @param request
 * @param slug
 * @returns
 */
export const getStoryChapters = async (request: Request, slug: string) => {
   const user = await userExists(request)

   const story = await db.story.findFirst({ where: { authorId: user.id, AND: { slug } }, include: { chapters: true } })

   if (!story) throw redirect("/author")

   return story
}

/**
 *
 * @param request
 * @param storyId
 * @returns
 */
export const newChapters = async (request: Request, storyId: string) => {
   const user = await userExists(request)

   const chapter = await db.chapter.create({ data: { title: "untitled", storyId } })

   if (!chapter) throw new Error("Something went wrong creating the chapter")

   return chapter
}

/**
 *
 * @param request
 * @param id
 * @returns
 */
export const getChapter = async (request: Request, id: string) => {
   const user = await userExists(request)

   const chapter = await db.chapter.findUnique({ where: { id } })

   if (!chapter) throw new Error("chapter not found")

   return chapter
}
