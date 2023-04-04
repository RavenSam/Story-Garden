import { Outlet, useRouteData } from "solid-start"
import { createServerData$, redirect } from "solid-start/server"
import StorySideBar from "~/components/ui/StorySideBar"
import TopNav from "~/components/ui/TopNav"
import { authenticator } from "~/server/auth"

export const routeData = () => {
   return createServerData$(async (_, { request }) => {
      const user = await authenticator.isAuthenticated(request)
      // console.log(user)
      if (!user) {
         throw redirect("/login")
      }
      return user
   })
}

export default function AuthorLayout() {
   const user = useRouteData<typeof routeData>()

   return (
      <>
         <div class="bg-slate-100 w-full max-w-[90rem] mx-auto">
            <TopNav user={user} />

            <StorySideBar>
               <div class="min-h-screen">
                  <Outlet />
               </div>
            </StorySideBar>
         </div>
      </>
   )
}
