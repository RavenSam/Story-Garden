import { useFormHandler } from "solid-form-handler"
import { zodSchema } from "solid-form-handler/zod"
import { TiPlus } from "solid-icons/ti"
import { createSignal, ParentComponent, Show } from "solid-js"
import { FormProps } from "solid-start"
import { z } from "zod"
import Modal from "~/components/ui/Modal"
import Input, { Textarea } from "~/components/ui/Input"

const [isOpen, setIsOpen] = createSignal(true)

export const storySchema = z.object({
   title: z.string().nonempty("The story needs a title.").max(100, ""),
})

type EnrollingTypes = {
   pending: boolean
   input?: FormData | undefined
   result?: any
   error?: any
   clear: () => void
   retry: () => void
}

interface ActionProps {
   enrolling: EnrollingTypes
   Form: ParentComponent<FormProps>
}

const CreateForm = (props: ActionProps) => {
   const formHandler = useFormHandler(zodSchema(storySchema))

   return (
      <props.Form class="pt-6 space-y-6">
         <Input formHandler={formHandler} name="title" />

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
      </props.Form>
   )
}

export default function CreateStory(props: ActionProps) {
   return (
      <>
         <button type="button" onClick={() => setIsOpen(true)} class="btn btn-solid-primary btn-pill">
            <TiPlus />

            <span class="font-medium">Create a story</span>
         </button>

         <Modal setIsOpen={setIsOpen} isOpen={isOpen} title="Create a story">
            <CreateForm Form={props.Form} enrolling={props.enrolling} />
         </Modal>
      </>
   )
}
