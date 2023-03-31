import { PrismaClient } from "@prisma/client"
import slugify from "slugify"

let db: PrismaClient

declare global {
   var __db: PrismaClient | undefined
}

if (import.meta.env.PROD) {
   db = new PrismaClient()
   db.$connect()
} else {
   if (!global.__db) {
      global.__db = new PrismaClient()
      global.__db.$connect()
   }

   db = global.__db
}

// DB Model that have a slug field
const modelsWithSlug = ["Story", "Chapter", "Place", "Character"]
// Slugify Middleware --------
db.$use(async (params, next) => {
   const createAction = params.action === "create"
   const updateAction = params.action === "update"
   const hasSlug = params.model ? modelsWithSlug.includes(params.model) : null

   if ((updateAction || createAction) && hasSlug) {
      let {
         args: { data },
      } = params
      // Check if slug exists by `findUnique` (did not test)
      data.slug = slugify(`${data.title}`, { lower: true, strict: true, remove: /[*+~.()'"!:@]/g })
   }
   const result = await next(params)
   return result
})

export { db }
