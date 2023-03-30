import { authClient } from "~/utils/auth"

export default function SocialAuthBtn() {
   const logWith = (provider: string) =>
      authClient.login(provider, { successRedirect: "/author/stories", failureRedirect: "sign-up" })

   return (
      <div class="grid grid-cols-2 gap-2 py-6">
         <button class="btn btn-outline-default btn-pill py-3.5" disabled={true}>
            Google
         </button>
         <button class="btn btn-outline-default btn-pill py-3.5" disabled={true}>
            Facebook
         </button>
      </div>
   )
}
