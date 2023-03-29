import { db } from "~/server/db"
import type { User } from "@prisma/client"
import { sessionStorage } from "~/utils/auth"
import { Authenticator } from "@solid-auth/core"
import { CredentialsStrategy } from "@solid-auth/credentials"
import sha256 from "crypto-js/sha256"

export const authenticator = new Authenticator<Omit<User, "password">>(sessionStorage)

authenticator.use(
   new CredentialsStrategy(async ({ input }) => {
      const userExists = await db.user.findUnique({ where: { email: input.email } })

      const pepper = "fkejrfhkierufgibvalkvhieurytilweirj" // Store it in the .env Later

      // SIGN UP CASE
      if (input.register) {
         if (userExists) {
            throw new Error("Email already registered. Login or try another email")
         }

         // Hashing password
         const salt = Math.random().toString(32).slice(2)
         const hashedPW = await sha256(input.password + salt + pepper).toString()

         // save the sign up user to the database
         const data = { email: input.email, password: hashedPW, penName: input.penName, salt }
         const user = await db.user.create({ data })

         if (!user) {
            throw new Error("Something went wrong trying to create a new user.")
         }

         return { email: user.email, penName: user.penName, id: user.id }
      } else {
         // LOGIN CASE
         if (!userExists) {
            throw new Error("This email is not registered")
         }

         // If the account is passwordless
         if (!userExists.password) {
            throw new Error("Something went wrong! Try login with your social account.")
         }

         // Check Password
         const salt = userExists.salt
         const digestedInputPW = await sha256(input.password + salt + pepper).toString()
         const isCorrectPassword = digestedInputPW === userExists.password

         if (!isCorrectPassword) {
            throw new Error("The email/Password combination is incorrect")
         }

         return { email: userExists.email, penName: userExists.penName, id: userExists.id }
      }
   })
)
