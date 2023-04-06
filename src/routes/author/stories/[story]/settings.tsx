import { RouteDataArgs } from "solid-start"
import { DeleteStory } from "~/components/sections/story-tabs/StorySettings"

// export const routeData = ({ params }: RouteDataArgs) => {
//    console.log(params.story)

//    return 5
// }

export default function Settings() {
   return (
      <>
         <div class="p-2">
            <div class="grid grid-cols-1 md:grid-cols-12">
               <div class="col-span-4"></div>
               <div class="col-span-8">
                  <div class="">
                     <h2 class="text-xl font-bold py-4">Danger Zone</h2>
                     <div class="border border-pink-600 bg-pink-100 rounded-xl p-4">
                        <DeleteStory />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}
