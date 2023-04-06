import { DeleteStory } from "~/components/sections/story-tabs/StorySettings"

export default function Settings() {
   return (
      <>
         <div class="p-2">
            <div class="grid grid-cols-12">
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
