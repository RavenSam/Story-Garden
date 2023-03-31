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

const [isOpen, setIsOpen] = createSignal(false)

export const storySchema = z.object({
   title: z.string().nonempty("The story needs a title.").max(100, "Story title should be below 100 characters"),
})

let inputRef: HTMLInputElement

const CreateForm = (props: ActionProps) => {
   const formHandler = useFormHandler(zodSchema(storySchema))

   onMount(() => inputRef.focus())

   createEffect(() => {
      if (props.enrolling?.result) {
         toast.success("New story created", { className: "success" })
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

export default function CreateStory(props: ActionProps) {
   return (
      <>
         <button type="button" onClick={() => setIsOpen(true)} class="btn btn-solid-primary btn-pill">
            <TiPlus />

            <span class="font-medium">New Story</span>
         </button>

         <Modal setIsOpen={setIsOpen} isOpen={isOpen} title="Create a new story">
            <CreateForm Form={props.Form} enrolling={props.enrolling} />
         </Modal>
      </>
   )
}
