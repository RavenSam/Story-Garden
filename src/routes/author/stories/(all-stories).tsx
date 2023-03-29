import { authClient } from "~/utils/auth"

export default function Stories() {
   const logout = () => authClient.logout({ redirectTo: "/login" })

   return (
      <div class="w-full h-screen flex items-center justify-center flex-col">
         <h1 class="text-2xl  font-bold mb-10">All Your Stories</h1>

         <button onclick={logout} class="btn btn-solid-danger btn-pill">
            Log out
         </button>
      </div>
   )
}
