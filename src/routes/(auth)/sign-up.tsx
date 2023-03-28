import { FormError } from "solid-start"
import { createServerAction$ } from "solid-start/server"
import SignUpSection from "~/components/sections/SignUpSection"
import { db } from "~/server/db"
import { createUserSession, register } from "~/server/db/session"

function checkFields(form: FormData) {
   const penName = form.get("penName")
   const email = form.get("email")
   const password = form.get("password")
   const redirectTo = form.get("redirectTo") || "/"

   if (
      typeof penName !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof redirectTo !== "string"
   ) {
      throw new FormError(`Form not submitted correctly.`)
   }

   return { penName, email, password, redirectTo }
}

export default function SignUp() {
   const [signingIn, { Form }] = createServerAction$(async (form: FormData) => {
      const fields = checkFields(form)

      const userExists = await db.user.findUnique({ where: { email: fields.email } })
      if (userExists) {
         throw new FormError(`Email already exists`, {
            fields,
         })
      }
      const user = await register(fields)
      if (!user) {
         throw new FormError(`Something went wrong trying to create a new user.`, {
            fields,
         })
      }
      return createUserSession(`${user.id}`, fields.redirectTo)
   })

   return <SignUpSection Form={Form} signingIn={signingIn} />
}
