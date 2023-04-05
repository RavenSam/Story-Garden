import { For } from "solid-js"
import { A, useSearchParams } from "solid-start"
import StoryNotes from "./story-tabs/StoryNotes"
import StoryOverview from "./story-tabs/StoryOverview"
import StorySettings from "./story-tabs/StorySettings"

const story_tabs = {
   overview: <StoryOverview />,
   notes: <StoryNotes />,
   settings: <StorySettings />,
}

const tab_keys = Object.keys(story_tabs)

const returnTabKey = (tab: string) => {
   return (tab_keys.includes(tab) ? tab : tab_keys[0]) as keyof typeof story_tabs
}

export default function SingleStoryLayout() {
   const [searchParams] = useSearchParams<{ tab: keyof typeof story_tabs }>()

   return (
      <>
         <nav class="flex items-center w-fit p-2 ml-10 sticky top-0">
            <For each={tab_keys}>
               {(tab) => (
                  <A
                     href={`?tab=${tab}`}
                     replace
                     class={`btn px-6 py-3 capitalize  ${
                        returnTabKey(searchParams.tab) === tab ? "text-emerald-500" : " text-slate-600"
                     }`}
                  >
                     {tab}
                  </A>
               )}
            </For>
         </nav>

         <section>{story_tabs[returnTabKey(searchParams.tab)]}</section>
      </>
   )
}
