import { redirect } from "solid-start/server"
import { sessionStorage } from "~/utils/auth"
import { db } from "~/server/db"

type LoginForm = {
   email: string
   password: string
}

export async function register({ email, password }: LoginForm) {
   return db.user.create({
      data: { email, password },
   })
}

export function getUserSession(request: Request) {
   return sessionStorage.getSession(request.headers.get("Cookie"))
}

export async function getUserId(request: Request) {
   const session = await getUserSession(request)
   const userId = session.get("userId")
   if (!userId || typeof userId !== "string") return null
   return userId
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

export async function createUserSession(userId: string, redirectTo: string) {
   const session = await sessionStorage.getSession()
   session.set("userId", userId)
   return redirect(redirectTo, {
      headers: {
         "Set-Cookie": await sessionStorage.commitSession(session),
      },
   })
}
