import { refetchRouteData, useRouteData } from "solid-start"
import { createServerAction$ } from "solid-start/server"
// import { logout } from "~/server/db/session"
// import { useUser } from "../db/useUser"

// export function routeData() {
//    return useUser()
// }

export default function Home() {
   // const user = useRouteData<typeof routeData>()
   // const [, { Form }] = createServerAction$((f: FormData, { request }) => logout(request))

   return (
      <main class="full-width">
         <h1>Hello </h1>
         <h3>Message board</h3>
         <button onClick={() => refetchRouteData()}>Refresh</button>

         <button name="logout" type="submit">
            Logout
         </button>
      </main>
   )
}
