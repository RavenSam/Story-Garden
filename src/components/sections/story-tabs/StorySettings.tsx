import { Story } from "@prisma/client"
import { HiSolidExclamation } from "solid-icons/hi"
import { createEffect, createSignal, Resource } from "solid-js"
import { FormError, useNavigate } from "solid-start"
import { createServerAction$, redirect } from "solid-start/server"
import toast from "solid-toast"
import Modal from "~/components/ui/Modal"
import { deleteStory } from "~/server/db/story"

function checkFields(form: FormData, fields: string[], errorMessage?: string) {
   let newFields: any = {}

   for (let index = 0; index < fields.length; index++) {
      const name = fields[index]
      const field = form.get(name)

      if (typeof field !== "string" || typeof field === "undefined")
         throw new FormError(errorMessage || `Form not submitted correctly.`)

      newFields[name] = field
   }

   return newFields
}

export const DeleteStory = (props: { story: Resource<Story | undefined> }) => {
   const [isOpen, setIsOpen] = createSignal(false)
   const navigate = useNavigate()

   // Don't remove this line. Why? I don't F know.
   const id = props.story()?.id

   const [enrolling, { Form }] = createServerAction$(async (form: FormData, { request }) => {
      const fields = checkFields(form, ["id"])

      try {
         await deleteStory(request, fields.id)

         return redirect("/author")
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
      <>
         <div class="flex items-center justify-between flex-shrink">
            <div class="">
               <h3 class="font-bold text-slate-700">Delete this Story</h3>
               <p class="text-sm py-2 pr-2">Once you delete a story, there is no going back. Please be certain. </p>
            </div>

            <button type="button" onClick={() => setIsOpen(true)} class="btn btn-pill btn-outline-danger text-sm">
               Delete story
            </button>
         </div>

         <Modal setIsOpen={setIsOpen} isOpen={isOpen} title="Delete a story">
            <div class="">
               <div class="pb-8 pt-2 flex items-center space-x-2">
                  <span class="text-3xl text-red-700">
                     <HiSolidExclamation />
                  </span>
                  <p>Are you sure you want to delete this story?</p>
               </div>
               <Form>
                  <div class="flex items-center justify-end space-x-2">
                     <input type="hidden" name="id" value={props.story()?.id} />
                     <button type="button" class="btn btn-ghost-default btn-pill" onClick={() => setIsOpen(false)}>
                        Cancel
                     </button>

                     <button disabled={enrolling.pending} type="submit" class="btn btn-solid-danger btn-pill">
                        Yes, I'm sure. Delete.
                     </button>
                  </div>
               </Form>
            </div>
         </Modal>
      </>
   )
}
