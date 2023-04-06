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
            <nav class="p-2 sticky top-0  bg-gradient-to-b from-slate-100 via-slate-100/90">
               <div class="flex items-center max-w-5xl mx-auto">
                  <For each={story_tabs}>
                     {(tab) => (
                        <A
                           href={tab.href}
                           class={`btn px-6 py-3 capitalize before:bg-emerald-500  rounded-xl hover:bg-black/10 ${
                              location.pathname === tab.href
                                 ? "text-emerald-500 "
                                 : " text-slate-500 hover:text-slate-800 "
                           }`}
                        >
                           <span class="text-xl">
                              <tab.icon />
                           </span>
                           <span>{tab.title}</span>
                        </A>
                     )}
                  </For>
               </div>
            </nav>
         </Show>

         <section class="max-w-5xl mx-auto">{props.children}</section>
      </>
   )
}
