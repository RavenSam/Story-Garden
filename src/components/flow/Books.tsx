import { Story } from "@prisma/client"
import { For, Show } from "solid-js"
import { A, useRouteData } from "solid-start"
import { routeData } from "~/routes/author/(dashboard)"
import CreateStory from "./CreateStory"

export const NoStory = () => {
   return (
      <div class="flex flex-col items-center justify-center py-6 space-y-4">
         <h3 class="font-semibold text-slate-500">You have no story. Create one?</h3>
         <CreateStory button />
      </div>
   )
}

export const StoryCard = ({ story }: { story: Story }) => {
   return (
      <A href={story.slug || story.id} class="relative">
         <div class="border rounded-xl max-w-xs overflow-hidden">
            <img
               class="block h-full w-full aspect-[1/1.6] object-contain"
               width={300}
               height={480}
               src={story.cover || "/img/book-cover-placeholder.png"}
               alt={story.title}
            />
         </div>
         <h3 class="absolute bottom-0 w-full text-sm font-semibold text-center p-2">{story.title}</h3>
      </A>
   )
}

export const RecentStories = () => {
   const stories = useRouteData<typeof routeData>()

   return (
      <div class="">
         <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-slate-700 py-4">Recently Updated</h2>

            <A href="stories" class="btn hover:btn-ghost-default btn-pill text-sm text-slate-500 lg:hidden">
               See more
            </A>
         </div>

         <Show when={!stories()?.length}>
            <NoStory />
         </Show>

         <div class="">
            <div class="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] lg:grid-cols-5 gap-4">
               <Show when={stories()} fallback={"Loading"}>
                  <Show when={stories()?.length}>
                     <CreateStory />

                     <For each={stories()}>{(story) => <StoryCard story={story} />}</For>

                     <div class="lg:flex items-center justify-center hidden">
                        <A href="stories" class="btn hover:btn-ghost-default btn-pill text-sm text-slate-500">
                           See more
                        </A>
                     </div>
                  </Show>
               </Show>
            </div>
         </div>
      </div>
   )
}

export default function Books() {
   return <div>Books</div>
}
