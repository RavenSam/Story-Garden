import { createEffect, Match, Switch } from "solid-js"
import { useSession } from "~/utils/authProvider"

export default function TopNav() {
   const session = useSession()

   return (
      <nav class="w-full p-3 bg-gray-300">
         <Switch fallback={<h3>Not Logged In</h3>}>
            <Match when={session().loading}>
               <h3 class="text-red-500 text-lg">Loading...</h3>
            </Match>
            <Match when={session().user} keyed>
               {(user) => <h3 class="text-red-500 text-lg">{user.penName}</h3>}
            </Match>
         </Switch>
      </nav>
   )
}
