import { createEffect, ParentComponent, Show } from "solid-js"
import { A, FormProps, useParams } from "solid-start"
import Input from "~/components/ui/Input"
import toast from "solid-toast"
import { useFormHandler } from "solid-form-handler"
import { zodSchema } from "solid-form-handler/zod"
import { z } from "zod"
import SocialAuthBtn from "./SocialAuthBtn"

type SigningInTpes = {
   pending: boolean
   input?: FormData | undefined
   result?: Response | undefined
   error?: any
   clear: () => void
   retry: () => void
}

interface SignUpProps {
   signingIn: SigningInTpes
   Form: ParentComponent<FormProps>
}

export const userSchema = z.object({
   penName: z.string().nonempty("A pen name is required.").min(3, "Your pen name must be at least 3 characters long."),
   email: z.string().nonempty("Email is required.").email("Must be a valid email."),
   password: z.string().nonempty("A password is required.").min(8, "Too short."),
})

export default function SignUpSection(props: SignUpProps) {
   const formHandler = useFormHandler(zodSchema(userSchema))
   const params = useParams()

   createEffect(() => {
      if (props.signingIn?.error?.message) {
         toast.error(props.signingIn?.error?.message, { className: "error" })
      }
   })

   return (
      <main class="min-h-screen flex items-center">
         <div class="grid grid-cols-1 md:grid-cols-2 w-full items-center max-w-[90rem] mx-auto">
            <div class="relative max-h-screen overflow-hidden rounded-l-sm">
               <div class="md:fade" />
               <img
                  src="/img/g-1.jpg"
                  alt="Garden"
                  class="block h-full w-full object-cover fixed inset-0 md:relative"
               />

               <div class="absolute inset-0 z-[9] flex items-center p-8 text-white bg-black/50">
                  <div class="space-y-4">
                     <h2 class="text-5xl font-extrabold [text-shadow:_0_1px_0_rgb(0_0_0_/60%)]">
                        The brain's strength <br /> lies in <span class="text-emerald-500 ">making</span> ideas, <br />
                        not in <span class="text-emerald-500 ">storing</span> them.
                     </h2>
                     <p class="text-xl text-slate-100 font-medium pb-20 [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
                        Leave that to us.
                     </p>
                  </div>
               </div>
            </div>

            <div class="relative z-10 bg-white/60 shadow-5 md:shadow-none backdrop-blur-sm rounded-xl max-w-md w-full mx-auto p-4">
               <h1 class="text-3xl font-extrabold py-5">
                  Sign up<span class="text-emerald-500">.</span>
               </h1>

               <SocialAuthBtn />

               <hr class="mb-12 border-slate-300" />

               <props.Form class="space-y-6" autocomplete="off">
                  <input type="hidden" autofocus name="redirectTo" value={params.redirectTo ?? "/"} />

                  <Input formHandler={formHandler} name="penName" label="Pen Name" placeholder="kody" />

                  <Input formHandler={formHandler} name="email" placeholder="kody66@mail.com" />

                  <Input formHandler={formHandler} name="password" type="password" placeholder="twixrox" />

                  <button
                     type="submit"
                     class="btn btn-solid-primary btn-pill min-w-[8rem] py-2.5 mx-auto"
                     disabled={formHandler.isFormInvalid() || props.signingIn.pending}
                  >
                     <Show when={props.signingIn.pending} fallback="Sign up">
                        Submitting
                     </Show>
                  </button>
               </props.Form>
               <p class="text-slate-700 -mb-2 mt-4 p-2 md:text-slate-500 text-sm text-center">
                  Already have an account?{" "}
                  <A href="/login" class="hover:text-emerald-500 hover:underline">
                     Login.
                  </A>
               </p>
            </div>
         </div>
      </main>
   )
}
