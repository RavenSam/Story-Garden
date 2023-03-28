import { createEffect } from "solid-js"
import { createServerData$, redirect } from "solid-start/server"
import TopNav from "~/components/ui/TopNav"
import { authenticator } from "~/server/auth"
import { authClient } from "~/utils/auth"
import { useSession } from "~/utils/authProvider"

export const routeData = () => {
   return createServerData$(async (_, { request }) => {
      const user = await authenticator.isAuthenticated(request)
      console.log(user)
      if (!user) {
         throw redirect("/login")
      }
      return user
   })
}

export default function Stories() {
   const logout = () => authClient.logout({ redirectTo: "/login" })

   const user = useSession()

   createEffect(() => console.log(user()))
   return (
      <div class="w-full h-screen flex items-center justify-center flex-col">
         <h1 class="text-2xl  font-bold mb-10">All Your Stories</h1>

         <div class="my-6">
            <TopNav />
         </div>

         <button onclick={logout} class="btn btn-solid-danger btn-pill">
            Log out
         </button>
      </div>
   )
}
