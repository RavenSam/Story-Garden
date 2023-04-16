import { redirect } from "solid-start"
import { StartServer, createHandler, renderAsync } from "solid-start/entry-server"
import { authenticator } from "./server/auth"

const protectedPaths = ["author"]

export default createHandler(
   ({ forward }) => {
      return async (event) => {
         const route = new URL(event.request.url).pathname.split("/").filter((e) => e)[0]
         if (protectedPaths.includes(route)) {
            const user = await authenticator.isAuthenticated(event.request)
            if (!user) {
               return redirect("/login") // a page for a non logged in user
            }
         }
         return forward(event) // if we got here, and the pathname is inside the `protectedPaths` array - a user is logged in
      }
   },
   renderAsync((event) => <StartServer event={event} />)
)
