import { Show } from "solid-js"
import { useParams, useRouteData } from "solid-start"
import { FormError } from "solid-start/data"
import { createServerAction$, createServerData$, redirect } from "solid-start/server"
import Input from "~/components/ui/Input"
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

export function routeData() {
   return createServerData$(async (_, { request }) => {
      if (await getUser(db, request)) {
         throw redirect("/")
      }
      return {}
   })
}

export default function Login() {
   const data = useRouteData<typeof routeData>()
   const params = useParams()

   const [loggingIn, { Form }] = createServerAction$(async (form: FormData) => {
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

      const fields = { loginType, username, password }
      const fieldErrors = {
         username: validateUsername(username),
         password: validatePassword(password),
      }
      if (Object.values(fieldErrors).some(Boolean)) {
         throw new FormError("Fields invalid", { fieldErrors, fields })
      }

      switch (loginType) {
         case "login": {
            const user = await login({ username, password })
            if (!user) {
               throw new FormError(`Username/Password combination is incorrect`, {
                  fields,
               })
            }
            return createUserSession(`${user.id}`, redirectTo)
         }
         case "register": {
            const userExists = await db.user.findUnique({ where: { username } })
            if (userExists) {
               throw new FormError(`User with username ${username} already exists`, {
                  fields,
               })
            }
            const user = await register({ username, password })
            if (!user) {
               throw new FormError(`Something went wrong trying to create a new user.`, {
                  fields,
               })
            }
            return createUserSession(`${user.id}`, redirectTo)
         }
         default: {
            throw new FormError(`Login type invalid`, { fields })
         }
      }
   })

   return (
      <main class="min-h-screen">
         <h1 class="text-2xl font-bold text-center">Login</h1>

         <div class="grid grid-cols-1 md:grid-cols-2 h-full items-center">
            <div class="md:parent fixed inset-0">
               <div class="bg-[url(/img/g-1.jpg)] w-full h-full md:box md:w-[600px] md:h-[500px]"></div>
            </div>

            <div class=""></div>

            <Form class="max-w-md w-full mx-auto space-y-10 p-4">
               <input type="hidden" name="redirectTo" value={params.redirectTo ?? "/"} />

               <Input name="username" placeholder="kody" error={loggingIn.error?.fieldErrors?.username} />

               <Input
                  name="password"
                  type="password"
                  placeholder="twixrox"
                  error={loggingIn.error?.fieldErrors?.password}
               />

               <Show when={loggingIn?.error}>
                  <p role="alert" class="text-xs pl-2 text-center text-red-500 font-semibold my-4">
                     {loggingIn.error.message}
                  </p>
               </Show>
               <button type="submit" class="btn btn-solid-primary btn-pill md:px-10 md:py-3 mx-auto">
                  Login
               </button>
            </Form>
         </div>

         <FilterSVG />
      </main>
   )
}

const FilterSVG = () => (
   <svg
      style="visibility: hidden; position: absolute;"
      width="0"
      height="0"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
   >
      <defs>
         <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix in="blur" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
         </filter>
      </defs>
   </svg>
)
