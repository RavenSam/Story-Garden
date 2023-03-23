import { For } from "solid-js"
import { A } from "solid-start"

const chapters = [
   { name: "Chapter 1", href: "chapter-1" },
   { name: "Chapter 2", href: "chapter-2" },
   { name: "Chapter 3", href: "chapter-3" },
   { name: "Chapter 4", href: "chapter-4" },
]

export default function Manuscript() {
   return (
      <div class="w-full h-screen flex items-center justify-center flex-col">
         <h1 class="text-2xl  font-bold">All Your Chapters</h1>

         <div class="grid grid-cols-3 gap-2 my-8">
            <For each={chapters}>
               {(item) => (
                  <A
                     href={item.href}
                     class="rounded-xl font-medium block py-3 px-10 bg-emerald-500 hover:bg-emerald-600"
                  >
                     {item.name}
                  </A>
               )}
            </For>
         </div>
      </div>
   )
}
