import { HiSolidExclamation } from "solid-icons/hi"
import { createSignal } from "solid-js"
import { FormError } from "solid-start"
import { createServerAction$ } from "solid-start/server"
import Input from "~/components/ui/Input"
import Modal from "~/components/ui/Modal"
import { deleteStory } from "~/server/db/story"

const DeleteStory = () => {
   const [isOpen, setIsOpen] = createSignal(false)

   return (
      <div class="flex items-center justify-between">
         <div class="">
            <h3 class="font-bold text-slate-700">Delete this Story</h3>
            <p class="text-sm py-2">Once you delete a story, there is no going back. Please be certain. </p>
         </div>

         <button type="button" onClick={() => setIsOpen(true)} class="btn btn-pill btn-solid-danger text-sm">
            Delete this story
         </button>

         <Modal setIsOpen={setIsOpen} isOpen={isOpen} title="Delete a story">
            <div class="">
               <div class="pb-8 pt-2 flex items-center space-x-2">
                  <span class="text-3xl text-red-700">
                     <HiSolidExclamation />
                  </span>
                  <p>Are you sure you want to delete this story?</p>
               </div>
               <div class="flex items-center justify-end space-x-2">
                  <button type="button" class="btn btn-ghost-default btn-pill" onClick={() => setIsOpen(false)}>
                     Cancel
                  </button>

                  <button type="submit" class="btn btn-solid-danger btn-pill">
                     Yes, I'm sure. Delete
                  </button>
               </div>
            </div>
         </Modal>
      </div>
   )
}

export default function StorySettings() {
   return (
      <div class="p-4">
         <div class="max-w-xl">
            <div class="">
               <h2 class="text-xl font-bold text-slate-700 py-4">Danger Zone</h2>
               <div class="border border-pink-600 bg-pink-100 rounded-xl p-4">
                  <DeleteStory />
               </div>
            </div>
         </div>
      </div>
   )
}
