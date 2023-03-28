import { db } from "~/server/db"
import type { User } from "@prisma/client"
import { sessionStorage } from "~/utils/auth"
import { Authenticator } from "@solid-auth/core"
import { CredentialsStrategy } from "@solid-auth/credentials"

export const authenticator = new Authenticator<Omit<User, "password">>(sessionStorage)

authenticator.use(
   new CredentialsStrategy(async ({ input }) => {
      const userExists = await db.user.findUnique({ where: { email: input.email } })

      // SIGN UP CASE
      if (input.register) {
         if (userExists) {
            throw new Error("Email already registered. Login or try another email")
         }

         // save the sign up user to the database
         const data = { email: input.email, password: input.password, penName: input.penName }
         const user = await db.user.create({ data })

         if (!user) {
            throw new Error("Something went wrong trying to create a new user.")
         }

         return { email: user.email, penName: user.penName, id: user.id }
      } else {
         // LOGIN CASE
         if (!userExists) {
            throw new Error("Email not registered")
         }

         if (userExists.password !== input.password) {
            throw new Error("Username/Password combination is incorrect")
         }

         return { email: userExists.email, penName: userExists.penName, id: userExists.id }
      }
   })
)
