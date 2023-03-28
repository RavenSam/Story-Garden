import { createEffect } from "solid-js"
import { useParams, useRouteData, createRouteAction } from "solid-start"
import { FormError } from "solid-start/data"
import { createServerAction$, createServerData$, redirect } from "solid-start/server"
import toast from "solid-toast"
import LoginSection from "~/components/sections/LoginSection"
import { authenticator } from "~/server/auth"
import { createUserSession, getUserId, getUserSession } from "~/server/db/session"
import { authClient } from "~/utils/auth"

function checkFields(form: FormData) {
   const email = form.get("email")
   const password = form.get("password")
   const redirectTo = form.get("redirectTo") || "/"

   if (typeof email !== "string" || typeof password !== "string" || typeof redirectTo !== "string") {
      throw new FormError(`Form not submitted correctly.`)
   }

   const penName = email.split("@")[0]

   return { email, password, redirectTo, penName }
}

export const routeData = () => {
   return createServerData$(async (_, { request }) => {
      const user = await authenticator.isAuthenticated(request)
      console.log(user)
      return user
   })
}

export default function Login() {
   // const user = useRouteData<typeof routeData>()

   const [loggingIn, { Form }] = createRouteAction(async (form: FormData) => {
      const fields = checkFields(form)

      try {
         const res = await authClient.login("credentials", { input: fields })
         return res
      } catch (e: any) {
         console.log("auth error", e)
         if (e.message) throw new FormError(e.message)
      }
   })

   return <LoginSection Form={Form} loggingIn={loggingIn} />
}
