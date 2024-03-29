import { redirect } from "solid-start/server"
import { sessionStorage } from "~/utils/auth"
import { db } from "~/server/db"
import { User } from "@prisma/client"

type LoginForm = {
   email: string
   password: string
}

// export async function register({ email, password }: LoginForm) {
//    return db.user.create({
//       data: { email, password },
//    })
// }

export function getUserSession(request: Request) {
   return sessionStorage.getSession(request.headers.get("Cookie"))
}

export async function getUser(request: Request) {
   const session = await getUserSession(request)
   const user = session.get("user") as User
   if (!user) return null
   return user
}

export async function userExists(request: Request) {
   const sessUser = await getUser(request)

   const user = await db.user.findUnique({ where: { id: sessUser?.id } })

   if (!user) throw redirect(`/sign-up`)

   return user
}

export async function requireUserId(request: Request, redirectTo: string = new URL(request.url).pathname) {
   const session = await getUserSession(request)
   const userId = session.get("userId")
   if (!userId || typeof userId !== "string") {
      const searchParams = new URLSearchParams([["redirectTo", redirectTo]])
      throw redirect(`/login?${searchParams}`)
   }
   return userId
}

export async function alreadyLogged(request: Request, redirectTo: string) {
   const session = await getUserSession(request)
   const user = session.get("user")
   if (user) {
      throw redirect(redirectTo)
   }
   return false
}

export async function createUserSession(userId: string, redirectTo: string) {
   const session = await sessionStorage.getSession()
   session.set("userId", userId)
   return redirect(redirectTo, {
      headers: {
         "Set-Cookie": await sessionStorage.commitSession(session),
      },
   })
}
