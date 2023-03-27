import { createEffect, Show } from "solid-js"
import { useParams, useRouteData } from "solid-start"
import { FormError } from "solid-start/data"
import { createServerAction$, createServerData$, redirect } from "solid-start/server"
import Input from "~/components/ui/Input"
import ToastProvider, { createToast } from "~/components/ui/Toast"
import { db } from "~/db"
import { createUserSession, getUser, login, register } from "~/db/session"

function validateUsername(username: unknown) {
   if (typeof username !== "string" || username.length < 3) {
      return `Usernames must be at least 3 characters long`
   }
}

function validatePassword(password: unknown) {
   if (typeof password !== "string" || password.length < 6) {
      return `Passwords must be at least 6 characters long`
   }
}

function checkFields(form: FormData) {
   const loginType = form.get("loginType")
   const username = form.get("username")
   const password = form.get("password")
   const redirectTo = form.get("redirectTo") || "/"

   if (
      typeof loginType !== "string" ||
      typeof username !== "string" ||
      typeof password !== "string" ||
      typeof redirectTo !== "string"
   ) {
      throw new FormError(`Form not submitted correctly.`)
   }

   const fields = { username, password, redirectTo }

   const fieldErrors = {
      username: validateUsername(username),
      password: validatePassword(password),
   }
   if (Object.values(fieldErrors).some(Boolean)) {
      throw new FormError("Fields invalid", { fieldErrors, fields })
   }

   return fields
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
   const params = useParams()

   const [loggingIn, { Form }] = createServerAction$(async (form: FormData) => {
      const fields = checkFields(form)

      const user = await login({ username: fields.username, password: fields.password })
      if (!user) {
         throw new FormError(`Username/Password combination is incorrect`, {
            fields,
         })
      }
      return createUserSession(`${user.id}`, fields.redirectTo)
   })

   createEffect(() => {
      if (loggingIn?.error?.message) {
         createToast(loggingIn?.error?.message)
      }
   })

   return (
      <main class="min-h-screen flex items-center">
         <div class="grid grid-cols-1 md:grid-cols-2 w-full items-center max-w-7xl mx-auto">
            <div class="relative max-h-screen overflow-hidden  ">
               <div class="md:fade" />
               <img
                  src="/img/g-1.jpg"
                  alt="Garden"
                  class="block h-full w-full object-cover fixed inset-0 md:relative"
               />
            </div>

            <div class="relative z-10 bg-white/60 shadow-5 md:shadow-none backdrop-blur-sm rounded-xl max-w-md w-full mx-auto px-4 py-6">
               <h1 class="text-3xl font-extrabold text-center">Login</h1>
               <Form class="space-y-10">
                  <input type="hidden" autofocus name="redirectTo" value={params.redirectTo ?? "/"} />

                  <Input
                     name="email"
                     type="email"
                     placeholder="kody66@mail.com"
                     error={loggingIn.error?.fieldErrors?.username}
                  />

                  <Input name="username" placeholder="kody" error={loggingIn.error?.fieldErrors?.username} />

                  <Input
                     name="password"
                     type="password"
                     placeholder="twixrox"
                     error={loggingIn.error?.fieldErrors?.password}
                  />

                  <button type="submit" class="btn btn-solid-primary btn-pill px-10 py-2.5 mx-auto">
                     Login
                  </button>
               </Form>
            </div>
         </div>
      </main>
   )
}

// case "register": {
//    const userExists = await db.user.findUnique({ where: { username } })
//    if (userExists) {
//       throw new FormError(`User with username ${username} already exists`, {
//          fields,
//       })
//    }
//    const user = await register({ username, password })
//    if (!user) {
//       throw new FormError(`Something went wrong trying to create a new user.`, {
//          fields,
//       })
//    }
//    return createUserSession(`${user.id}`, redirectTo)
// }
