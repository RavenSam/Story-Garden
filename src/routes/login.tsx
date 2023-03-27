import { createEffect, Show } from "solid-js"
import { useParams, useRouteData } from "solid-start"
import { FormError } from "solid-start/data"
import { createServerAction$, createServerData$, redirect } from "solid-start/server"
import LoginSection from "~/components/sections/LoginSection"
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

   return <LoginSection Form={Form} loggingIn={loggingIn} />
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
