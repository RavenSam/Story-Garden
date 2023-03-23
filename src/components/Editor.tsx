import { createTiptapEditor } from "solid-tiptap"
import StarterKit from "@tiptap/starter-kit"
import TiptapEditor from "./tiptap/TiptapEditor"

const EditorSettingsChoices = {
   widths: [640, 768, 1024, 1280],
   bg: { transparent: "", distinct: "bg-white", elevated: "bg-white shadow-xl" },
}

export default function Editor() {
   return (
      <div
         style={{ "max-width": EditorSettingsChoices.widths[1] + "px" }}
         class={`mx-auto w-full rounded-xl ${EditorSettingsChoices.bg.transparent}`}
      >
         <TiptapEditor />
      </div>
   )
}

function SimpleEditor() {
   let ref!: HTMLDivElement

   const editor = createTiptapEditor(() => ({
      element: ref!,
      extensions: [StarterKit],
      content: `<p>Example Text</p>`,
   }))

   return <div id="editor" ref={ref} />
}
