import { Show } from "solid-js"
import { Meta, Outlet, Title, useRouteData } from "solid-start"
import { createServerData$, redirect } from "solid-start/server"
import StorySideBar from "~/components/ui/StorySideBar"
import TopNav from "~/components/ui/TopNav"
import { authenticator } from "~/server/auth"

export const routeData = () => {
   return createServerData$(async (_, { request }) => {
      const user = await authenticator.isAuthenticated(request)

      if (!user) throw redirect("/login")

      return user
   })
}

export default function AuthorLayout() {
   const user = useRouteData<typeof routeData>()

   return (
      <>
         <Title>{user()?.penName} - Author Dashboard</Title>
         <Meta
            name="description"
            content="Access your author dashboard on Story Garden to organize and structure your stories. Keep track of your progress, manage your stories, and write with ease. Sign up now and start creating your own stories on Story Garden."
         />

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
