import { A } from "solid-start"

export default function Home() {
   return (
      <div class="relative min-h-screen w-full max-w-[90rem] mx-auto">
         <div class="img absolute top-0 bottom-0 right-0 w-full md:w-9/12">
            <div class="md:fade-left" />
            <img
               src="/img/g-2.jpg"
               width={900}
               height={700}
               alt="Story Garden"
               class="block h-full w-full object-cover object-left"
            />
         </div>
         <div class="box absolute inset-0 z-10 flex items-center">
            <div class="max-w-5xl mx-auto w-full">
               <div class="bg-white/60 shadow-5 md:shadow-none backdrop-blur-sm py-10 px-4 md:px-8 md:rounded-xl md:max-w-xl">
                  <h1 class="text-4xl md:text-5xl font-extrabold capitalize leading-[1.2] [text-shadow:_0_1px_0_rgb(0_0_0_/60%)]">
                     The brain's strength lies in <span class="text-emerald-500 ">making</span> ideas, not in{" "}
                     <span class="text-emerald-500 ">storing</span> them.
                  </h1>
                  <p class="text-xl text-slate-900 font-medium [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
                     Leave that to us.
                  </p>

                  <div class="flex items-center pt-6 space-x-2">
                     <A href="/" class="btn btn-ghost-primary btn-pill">
                        Join our Discord
                     </A>
                     <A href="/sign-up" title="Register now, it's free" class="btn btn-solid-primary btn-pill">
                        Sign up now
                     </A>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
