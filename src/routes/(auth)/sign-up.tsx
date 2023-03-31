import { createRouteAction, FormError, redirect } from "solid-start"
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

// export const routeData = () => {
//    return createServerData$(async (_, { request }) => {
//       const user = await authenticator.isAuthenticated(request)

//       if (user) {
//          throw redirect("/author/stories")
//       }

//       return {}
//    })
// }

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

   return <SignUpSection Form={Form} enrolling={enrolling} />
}
