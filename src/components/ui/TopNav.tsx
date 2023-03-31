import { User } from "@prisma/client"
import { BiRegularLogOut, BiSolidLogOut } from "solid-icons/bi"
import { Resource, Show } from "solid-js"
import { A } from "solid-start"
import { authClient } from "~/utils/auth"

const LogOut = () => {
   const logout = () => authClient.logout({ redirectTo: "/login" })
   return (
      <button aria-label="Log out" onclick={logout} class="btn btn-ghost-danger btn-icon">
         <BiRegularLogOut />
      </button>
   )
}

interface TopNavProps {
   user: Resource<Omit<User, "password"> | undefined>
}

export default function TopNav(props: TopNavProps) {
   return (
      <nav class="w-full p-2 bg-white/70 flex items-center justify-end">
         <Show when={!props.user()} fallback={<LogOut />}>
            <A href="/login">Log in</A>
         </Show>
      </nav>
   )
}
