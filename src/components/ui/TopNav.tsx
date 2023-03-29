import { User } from "@prisma/client"
import { createEffect, Match, Resource, Switch } from "solid-js"
import { useSession } from "~/utils/authProvider"

interface TopNavProps {
   user: Resource<Omit<User, "password"> | undefined>
}

export default function TopNav(props: TopNavProps) {
   const session = useSession()

   return (
      <nav class="w-full p-3 bg-gray-300">
         <div class="p-4 border border-slate-300 rounded-xl">{props.user.name}</div>

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
