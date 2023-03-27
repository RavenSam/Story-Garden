import { ParentComponent } from "solid-js"
import { FormProps, useParams } from "solid-start"
import Input from "~/components/ui/Input"

type loggingIn = {
   pending: boolean
   input?: FormData | undefined
   result?: Response | undefined
   error?: any
   clear: () => void
   retry: () => void
}

interface LoginProps {
   loggingIn: loggingIn
   Form: ParentComponent<FormProps>
}

export default function LoginSection(props: LoginProps) {
   const { loggingIn, Form } = props
   const params = useParams()

   return (
      <main class="min-h-screen flex items-center">
         <div class="grid grid-cols-1 md:grid-cols-2 w-full items-center max-w-7xl mx-auto">
            <div class="relative max-h-screen overflow-hidden rounded-l-sm">
               <div class="md:fade" />
               <img
                  src="/img/g-1.jpg"
                  alt="Garden"
                  class="block h-full w-full object-cover fixed inset-0 md:relative"
               />

               <div class="absolute inset-0 z-[9] flex items-center p-8 text-white bg-black/40">
                  <div class="space-y-4">
                     <h2 class="text-5xl font-extrabold [text-shadow:_0_1px_0_rgb(0_0_0_/60%)]">
                        <span class="text-emerald-500 ">Welcome</span> back!
                     </h2>
                     <p class="text-xl text-slate-100 font-extrabold [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
                        Ready to write? It's about time.
                     </p>
                  </div>
               </div>
            </div>

            <div class="relative z-10 bg-white/60 shadow-5 md:shadow-none backdrop-blur-sm rounded-xl max-w-md w-full mx-auto px-4 py-6">
               <h1 class="text-3xl font-extrabold py-5">
                  Login<span class="text-emerald-500">.</span>
               </h1>
               <Form class="space-y-10">
                  <input type="hidden" autofocus name="redirectTo" value={params.redirectTo ?? "/"} />

                  <Input
                     name="email"
                     type="email"
                     placeholder="kody66@mail.com"
                     error={loggingIn.error?.fieldErrors?.username}
                  />

                  <Input
                     name="password"
                     type="password"
                     placeholder="twixrox"
                     error={loggingIn.error?.fieldErrors?.password}
                  />

                  <button type="submit" class="btn btn-solid-primary btn-pill px-10 py-2.5 mx-auto">
                     Login
                  </button>
               </Form>
            </div>
         </div>
      </main>
   )
}
