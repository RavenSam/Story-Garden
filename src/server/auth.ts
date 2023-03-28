import { db } from "~/server/db"
import type { User } from "@prisma/client"
import { sessionStorage } from "~/utils/auth"
import { Authenticator } from "@solid-auth/core"
import { CredentialsStrategy } from "@solid-auth/credentials"

export const authenticator = new Authenticator<Omit<User, "password">>(sessionStorage)

authenticator.use(
   new CredentialsStrategy(async ({ input }) => {
      const user = await db.user.findUnique({ where: { email: input.email } })

      if (!user) {
         throw new Error("Email not registered")
      }

      if (user.password !== input.password) {
         throw new Error("Username/Password combination is incorrect")
      }

      return { email: user.email, penName: user.penName, id: user.id }
   })
)
