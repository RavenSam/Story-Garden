import { format, formatDistance, formatDistanceToNow, subDays } from "date-fns"
import { HiSolidPlus } from "solid-icons/hi"
import { createEffect, createSignal, For, onMount, Show } from "solid-js"
import { A, Meta, RouteDataArgs, Title, useRouteData } from "solid-start"
import { createServerAction$, createServerData$, redirect } from "solid-start/server"
import toast from "solid-toast"
import { getStoryChapters, newChapters } from "~/server/db/story"

const [storyId, setStoryId] = createSignal<string>()

const NewChapter = () => {
   const [enrolling, { Form }] = createServerAction$(async (form: FormData, { request }) => {
      const sId = form.get("newChapter")
      if (typeof sId !== "string") throw Error("No story id")

      try {
         const chapter = await newChapters(request, sId)

         return redirect(chapter.id)
      } catch (error: any) {
         console.log(error)
         throw new Error(error.message)
      }
   })

   createEffect(() => {
      if (enrolling?.error?.message) {
         toast.error(enrolling?.error?.message, { className: "error" })
      }
   })

   return (
      <Form>
         <input type="hidden" name="newChapter" value={storyId()} />
         <button disabled={enrolling.pending} type="submit" class="btn btn-solid-primary btn-pill">
            <span>
               <HiSolidPlus />
            </span>
            <span class="hidden md:inline">New Chapter</span>
         </button>
      </Form>
   )
}

const NoChapters = () => {
   return (
      <div class="flex flex-col items-center justify-center space-y-8 min-h-[70vh]">
         <h1 class="text-3xl text-slate-600  font-bold">This story has no chapters</h1>

         <NewChapter />
      </div>
   )
}

export const routeData = ({ params }: RouteDataArgs) => {
   return createServerData$(
      async ([, slug], { request }) => {
         try {
            return await getStoryChapters(request, slug)
         } catch (error) {
            console.log(error)
            throw error
         }
      },
      { key: () => ["slug", params.story] }
   )
}

export default function Manuscript() {
   const story = useRouteData<typeof routeData>()

   onMount(() => {
      setStoryId(story()?.id)
   })

   return (
      <>
         <Title>Chapters- {story()?.title} | Story Garden</Title>
         <Meta
            name="description"
            content={`Explore the chapters of ${
               story()?.title
            } on Story Garden. Organize, structure, and edit your story with ease. Start writing your own masterpiece today.`}
         />

         <div class="p-4">
            <Show when={story()?.chapters?.length} fallback={<NoChapters />}>
               <h1 class="text-3xl  font-bold">Chapters</h1>

               <div class="flex items-center justify-end py-4">
                  <NewChapter />
               </div>

               <div class="space-y-4 py-4">
                  <For each={story()?.chapters}>
                     {(item) => (
                        <A href={item.id} class="rounded-xl flex items-center justify-between shadow-8 p-4">
                           <span class="font-bold">{item.title}</span>
                           <span class="">{item.word_count}</span>
                           <Show when={typeof item?.updatedAt !== "string"} fallback={<span>Date</span>}>
                              <span title={format(item?.updatedAt, "MMMM dd YYY")} class="text-xs">
                                 {formatDistanceToNow(item.updatedAt)} ago
                              </span>
                           </Show>
                        </A>
                     )}
                  </For>
               </div>
            </Show>
         </div>
      </>
   )
}
