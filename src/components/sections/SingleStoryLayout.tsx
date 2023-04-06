import { HiOutlineBookOpen, HiOutlineCog, HiOutlineCollection, HiOutlinePencilAlt } from "solid-icons/hi"
import { For, JSXElement, Show } from "solid-js"
import { A, useLocation } from "solid-start"

const story_tabs = [
   { title: "overview", icon: HiOutlineBookOpen, href: "/author/stories/story-5" },
   { title: "chapters", icon: HiOutlineCollection, href: "/author/stories/story-5/chapters" },
   { title: "notes", icon: HiOutlinePencilAlt, href: "/author/stories/story-5/notes" },
   { title: "settings", icon: HiOutlineCog, href: "/author/stories/story-5/settings" },
]

interface Props {
   children: JSXElement
}

export default function SingleStoryLayout(props: Props) {
   const location = useLocation()

   return (
      <>
         <Show when={!(location.pathname.split("/").length > 5)}>
            <nav class="p-2 fixed bottom-0 sm:sticky md:top-0 bg-slate-900 sm:bg-transparent w-full  sm:bg-gradient-to-b from-slate-100 via-slate-100/90">
               <div class="flex items-center justify-evenly sm:justify-start max-w-6xl mx-auto sm:pl-9 md:pl-20 lg:pl-4">
                  <For each={story_tabs}>
                     {(tab) => (
                        <A
                           href={tab.href}
                           class={`btn flex-col sm:flex-row px-4 md:px-6 py-3 capitalize text-smbefore:bg-emerald-500  rounded-xl hover:bg-white/10 sm:hover:bg-black/10 ${
                              location.pathname === tab.href
                                 ? "text-emerald-500 "
                                 : " text-slate-500 hover:text-white sm:hover:text-slate-800 "
                           }`}
                        >
                           <span class="text-xl">
                              <tab.icon />
                           </span>
                           <span class="text-xs sm:text-base">{tab.title}</span>
                        </A>
                     )}
                  </For>
               </div>
            </nav>
         </Show>

         <section class="max-w-6xl mx-auto">{props.children}</section>
      </>
   )
}
