import { Meta, RouteDataArgs, Title, useRouteData } from "solid-start"
import { createServerData$ } from "solid-start/server"
import { DeleteStory } from "~/components/sections/story-tabs/StorySettings"
import { getStory } from "~/server/db/story"

export const routeData = ({ params }: RouteDataArgs) => {
   return createServerData$(
      async ([, slug], { request }) => {
         try {
            return await getStory(request, slug)
         } catch (error) {
            console.log(error)
            throw error
         }
      },
      { key: () => ["slug", params.story] }
   )
}

export default function Settings() {
   const story = useRouteData<typeof routeData>()

   const title = story()?.title

   return (
      <>
         <Title>Story Settings - {title} - Author Dashboard | Story Garden</Title>
         <Meta
            name="description"
            content={`Customize the settings for your story - ${
               story()?.title
            } on Story Garden. Change story details, cover image, and manage permissions. Start writing and organizing your stories today!`}
         />

         <div class="p-2">
            <div class="grid grid-cols-1 md:grid-cols-12">
               <div class="col-span-4"></div>
               <div class="col-span-8">
                  <div class="">
                     <h2 class="text-xl font-bold py-4">Danger Zone</h2>
                     <div class="border border-pink-600 bg-pink-100 rounded-xl p-4">
                        <DeleteStory story={story} />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}
