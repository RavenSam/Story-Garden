import { useParams, useRouteData } from "solid-start"
import { FormError } from "solid-start/data"
import { createServerAction$, createServerData$, redirect } from "solid-start/server"
import LoginSection from "~/components/sections/LoginSection"
import { createUserSession, login } from "~/db/session"

function checkFields(form: FormData) {
   const email = form.get("username")
   const password = form.get("password")
   const redirectTo = form.get("redirectTo") || "/"

   if (typeof email !== "string" || typeof password !== "string" || typeof redirectTo !== "string") {
      throw new FormError(`Form not submitted correctly.`)
   }

   return { email, password, redirectTo }
}

// export function routeData() {
//    return createServerData$(async (_, { request }) => {
//       if (await getUser(db, request)) {
//          throw redirect("/")
//       }
//       return {}
//    })
// }

export default function Login() {
   // const data = useRouteData<typeof routeData>()

   const [loggingIn, { Form }] = createServerAction$(async (form: FormData) => {
      const fields = checkFields(form)

      const user = await login({ username: fields.email, password: fields.password })
      if (!user) {
         throw new FormError(`Username/Password combination is incorrect`, {
            fields,
         })
      }
      return createUserSession(`${user.id}`, fields.redirectTo)
   })

   return <LoginSection Form={Form} loggingIn={loggingIn} />
}
