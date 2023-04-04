import { Story } from "@prisma/client"
import { For } from "solid-js"
import { A } from "solid-start"
import CreateStory from "./CreateStory"

const COUNT = 3

export const StoryCard = ({ story }: { story: Story }) => {
   return (
      <A href={story.slug || story.id} class="relative">
         <div class="border rounded-xl max-w-xs overflow-hidden">
            <img
               class="block h-full w-full "
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

export const RecentStories = ({ stories }: { stories: Story[] }) => {
   return (
      <div class="">
         <h2 class="text-lg font-bold text-slate-700 py-4">Recently Updated</h2>

         <div class="">
            <div class="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4 lg:max-w-[80%]">
               <CreateStory />

               <For each={stories.slice(0, COUNT)}>{(story) => <StoryCard story={story} />}</For>
            </div>
         </div>
      </div>
   )
}

export default function Books() {
   return <div>Books</div>
}
