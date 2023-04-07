import { createRouteAction, FormError, Meta, redirect, Title } from "solid-start"
import { createServerData$ } from "solid-start/server"
import SignUpSection from "~/components/sections/SignUpSection"
import { authenticator } from "~/server/auth"
import { authClient } from "~/utils/auth"

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

   return { penName, email, password, redirectTo, register: true }
}

export const routeData = () => {
   return createServerData$(async (_, { request }) => {
      const user = await authenticator.isAuthenticated(request)

      if (user) {
         throw redirect("/author")
      }

      return {}
   })
}

export default function SignUp() {
   const [enrolling, { Form }] = createRouteAction(async (form: FormData) => {
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

   return (
      <>
         <Title>Join Story Garden - Create an Account Today!</Title>
         <Meta
            name="description"
            content="Sign up for Story Garden and start writing your stories today. Organize and structure your writing in a clean and intuitive interface."
         />
         <SignUpSection Form={Form} enrolling={enrolling} />
      </>
   )
}
