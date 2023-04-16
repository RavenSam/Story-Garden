import { createTiptapEditor } from "solid-tiptap"
import StarterKit from "@tiptap/starter-kit"
import BubbleMenu from "@tiptap/extension-bubble-menu"
import Typography from "@tiptap/extension-typography"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import { createSignal, JSX, onMount, Resource, Show } from "solid-js"
import { Toolbar } from "solid-headless"
import FloatingToolbar from "./FloatingToolbar"
import FixedToolbar from "./FixedToolbar"
import { EditorSettingsTypes } from "../Editor"
import { Chapter } from "@prisma/client"
import { debounce } from "@solid-primitives/scheduled"
import { createServerAction$ } from "solid-start/server"

const [content, setContent] = createSignal<string | null>(null)
const [title, seTtitle] = createSignal<string | undefined>()

let btnSave: HTMLButtonElement

const SaveChapter = () => {
   const [enrolling, { Form }] = createServerAction$(async (form: FormData, { request }) => {
      try {
         const chapter = form.get("content")
         const title = form.get("title")

         return { chapter }
      } catch (error: any) {
         console.log(error)
         throw new Error(error.message)
      }
   })

   return (
      <Form>
         <fieldset disabled={typeof content() !== "string"}>
            <Show when={typeof content() === "string" && typeof title() === "string"}>
               <input type="hidden" value={content()?.toString()} name="content" />
               <input type="hidden" value={title()?.toString()} name="title" />
            </Show>
            <button ref={btnSave} type="submit" id="save_chapter" class="btn text-sm btn-ghost-default btn-pill">
               Save
            </button>
         </fieldset>
      </Form>
   )
}

interface TipEditorProps {
   editorSettings: EditorSettingsTypes
   chapter: Resource<Chapter | undefined>
}

export default function TiptapEditor(props: TipEditorProps): JSX.Element {
   const [container, setContainer] = createSignal<HTMLDivElement>()
   const [menu, setMenu] = createSignal<HTMLDivElement>()

   const editor = createTiptapEditor(() => ({
      element: container()!,
      extensions: [
         StarterKit,
         BubbleMenu.configure({ element: menu()!, tippyOptions: { placement: "bottom" } }),
         Typography,
         Underline,
         TextAlign.configure({ types: ["heading", "paragraph"] }),
      ],
      editorProps: {
         attributes: {
            class: "p-2 md:p-8 focus:outline-none prose max-w-full",
         },
      },
      content: `${props.chapter()?.content || "<p></p>"}`,
      onUpdate: ({ editor }) => {
         const content = editor.getHTML()

         const firstLine = editor?.getJSON()?.content?.at(0)
         const title =
            firstLine?.type === "heading" && firstLine?.content?.at(0)?.text
               ? firstLine?.content?.at(0)?.text
               : "untitled"

         console.log(firstLine)

         setContent(content)
         seTtitle(title)

         trigger()
      },
   }))

   const trigger = debounce(() => btnSave.click(), 10000)

   onMount(() => {
      editor()?.commands.focus("end")
   })

   return (
      <>
         <Toolbar ref={setMenu} class="shadow bg-white/70 backdrop-blur-sm  rounded-xl" horizontal>
            <Show when={editor()} keyed>
               {(instance) => <FloatingToolbar editor={instance} />}
            </Show>
         </Toolbar>

         <div class={`${props.editorSettings.toolbar_position}  relative`}>
            <Show when={editor()} keyed>
               {(instance) => (
                  <div class="FixedToolbar sticky w-full p-1 rounded-xl bg-white/70 backdrop-blur-sm border z-10">
                     <FixedToolbar editor={instance} />
                  </div>
               )}
            </Show>

            <div class="min-h-[80vh]" onClick={() => editor()?.commands.focus()} ref={setContainer} />

            <SaveChapter />
         </div>
      </>
   )
}
