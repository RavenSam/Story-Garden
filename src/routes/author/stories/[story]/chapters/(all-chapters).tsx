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
            New Chapter
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

const chapters = [
   { name: "Chapter 1", href: "chapter-1" },
   { name: "Chapter 2", href: "chapter-2" },
   { name: "Chapter 3", href: "chapter-3" },
   { name: "Chapter 4", href: "chapter-4" },
]

export default function Manuscript() {
   const story = useRouteData<typeof routeData>()

   createEffect(() => setStoryId(story()?.id))

   return (
      <>
         <Title>Chapters - [Story Title] | Story Garden</Title>
         <Meta
            name="description"
            content="Explore the chapters of [Story Title] on Story Garden. Organize, structure, and edit your story with ease. Start writing your own masterpiece today."
         />

         <div class="p-4">
            <Show when={story()?.chapters?.length} fallback={<NoChapters />}>
               <h1 class="text-3xl  font-bold">All Your Chapters</h1>

               <div class="grid grid-cols-3 gap-2 gap-y-10 my-8 ">
                  <For each={story()?.chapters}>
                     {(item) => (
                        <A
                           href={item.id}
                           class="rounded-xl font-medium block py-3 px-10 bg-emerald-500 hover:bg-emerald-600"
                        >
                           {item.title}
                        </A>
                     )}
                  </For>
               </div>
            </Show>
         </div>
      </>
   )
}
