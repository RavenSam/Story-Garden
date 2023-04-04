import { useFormHandler } from "solid-form-handler"
import { zodSchema } from "solid-form-handler/zod"
import { TiPlus } from "solid-icons/ti"
import { createEffect, createSignal, onMount, Show } from "solid-js"
import { z } from "zod"
import Modal from "~/components/ui/Modal"
import Input, { Textarea } from "~/components/ui/Input"
import { Load } from "../ui/Loading"
import toast from "solid-toast"
import { ActionProps } from "types"
import { createServerAction$ } from "solid-start/server"
import { createStory } from "~/server/db/story"
import { FormError } from "solid-start"

const [isOpen, setIsOpen] = createSignal(false)

export const storySchema = z.object({
   title: z.string().nonempty("The story needs a title.").max(100, "Story title should be below 100 characters"),
})

function checkFields(form: FormData) {
   const title = form.get("title")
   const description = form.get("description")

   if (typeof title === "string" && typeof description === "string") {
      return { title, description }
   }
   throw new FormError(`Form not submitted correctly.`)
}

let inputRef: HTMLInputElement

const CreateForm = (props: ActionProps) => {
   const formHandler = useFormHandler(zodSchema(storySchema))

   onMount(() => inputRef.focus())

   createEffect(() => {
      if (props.enrolling?.result) {
         toast.success("New story created", { className: "success" })
         inputRef.value = ""
         setIsOpen(false)
      }
   })

   createEffect(() => {
      if (props.enrolling?.error?.message) {
         toast.error(props.enrolling?.error?.message, { className: "error" })
      }
   })

   return (
      <props.Form class="pt-6 space-y-6 relative">
         <Input ref={inputRef} formHandler={formHandler} name="title" />

         <Textarea rows={5} name="description" />

         <div class="flex items-center justify-end space-x-2">
            <button type="button" class="btn btn-ghost-default btn-pill" onClick={() => setIsOpen(false)}>
               Cancel
            </button>

            <button
               type="submit"
               class="btn btn-solid-primary btn-pill"
               disabled={formHandler.isFormInvalid() || props.enrolling.pending}
            >
               <Show when={props.enrolling.pending} fallback="Save">
                  Saving
               </Show>
            </button>
         </div>

         <Show when={props.enrolling.pending}>
            <Load />
         </Show>
      </props.Form>
   )
}

const CreateButton = () => (
   <button type="button" onClick={() => setIsOpen(true)} class="btn btn-solid-primary btn-pill">
      <TiPlus />

      <span class="font-medium">New Story</span>
   </button>
)

export default function CreateStory(props: { button?: boolean }) {
   const [enrolling, { Form }] = createServerAction$(async (form: FormData, { request }) => {
      const fields = await checkFields(form)
      try {
         const story = await createStory(request, fields)
         return { story }
      } catch (error: any) {
         console.log(error)
      }
   })

   return (
      <>
         <Show when={!props.button} fallback={CreateButton}>
            <button
               onClick={() => setIsOpen(true)}
               aria-label="create a strory"
               class="group bg-slate-400/30 border rounded-xl flex items-center justify-center"
            >
               <span class="text-3xl btn-gradient text-slate-200 rounded-full p-3 opacity-80 group-hover:opacity-100">
                  <TiPlus />
               </span>
            </button>
         </Show>

         <Modal setIsOpen={setIsOpen} isOpen={isOpen} title="Create a new story">
            <CreateForm Form={Form} enrolling={enrolling} />
         </Modal>
      </>
   )
}
