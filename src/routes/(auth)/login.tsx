import { createEffect, onMount } from "solid-js"
import { createRouteAction, Navigate, useNavigate } from "solid-start"
import { FormError, useRouteData } from "solid-start/data"
import { createServerData$, redirect } from "solid-start/server"
import LoginSection from "~/components/sections/LoginSection"
import { authenticator } from "~/server/auth"
import { alreadyLogged } from "~/server/db/session"
import { authClient } from "~/utils/auth"
import { useSessionRefetch } from "~/utils/authProvider"

function checkFields(form: FormData) {
   const email = form.get("email")
   const password = form.get("password")
   const redirectTo = form.get("redirectTo") || "/"

   if (typeof email !== "string" || typeof password !== "string" || typeof redirectTo !== "string") {
      throw new FormError(`Form not submitted correctly.`)
   }

   return { email, password, redirectTo }
}

export const routeData = () => {
   return createServerData$(async (_, { request }) => {
      const user = await authenticator.isAuthenticated(request)
      if (user) {
         console.log(user)
         throw redirect("/author/stories") // It doesn't work and I don't know why.
      }
      return {}

      // return await alreadyLogged(request, "/") // Not working either.
   })
}
export default function Login() {
   const [loggingIn, { Form }] = createRouteAction(async (form: FormData) => {
      const fields = checkFields(form)

      try {
         const res = await authClient.login("credentials", { input: fields })
         if (res.success) {
            return redirect("/author")
         } else {
            throw new FormError("Something went wrong! Please try again.")
         }
      } catch (e: any) {
         console.log("auth error", e)
         if (e.message) throw new FormError(e.message)
      }
   })

   return <LoginSection Form={Form} loggingIn={loggingIn} />
}
