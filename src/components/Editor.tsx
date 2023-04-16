import { Chapter } from "@prisma/client"
import { createSignal, onMount, Resource } from "solid-js"
import TiptapEditor from "./tiptap/TiptapEditor"

export type EditorSettingsTypes = {
   width: number
   bg: string
   toolbar_position: string
   editable: boolean
}

export const editorSettingsOptions = {
   widths: [640, 768, 1024, 1280],
   bg: { transparent: "", distinct: "md:bg-white", elevated: "md:bg-white md:shadow-56" },
   toolbar_position: {
      top: "tollbar-sticky-top",
      bottom: "tollbar-sticky-bottom",
   },
}

export const editorSettingsDefault: EditorSettingsTypes = {
   width: editorSettingsOptions.widths[1],
   bg: editorSettingsOptions.bg.transparent,
   toolbar_position: editorSettingsOptions.toolbar_position.top,
   editable: true,
}

export const [editorSettings, setEditorSettings] = createSignal<EditorSettingsTypes>()

interface EdiorProps {
   chapter: Resource<Chapter | undefined>
}

export default function Editor(props: EdiorProps) {
   onMount(() => {
      if (typeof window !== "undefined") {
         const isStored = window.localStorage.getItem("editorSettings")

         if (isStored) {
            setEditorSettings(JSON.parse(isStored))
         } else {
            window.localStorage.setItem("editorSettings", JSON.stringify(editorSettingsDefault))
            setEditorSettings(editorSettingsDefault)
         }
      }
   })

   return (
      <div
         style={{ "max-width": editorSettings()?.width + "px" }}
         class={`mx-auto w-full rounded-xl ${editorSettings()?.bg}`}
      >
         <TiptapEditor chapter={props.chapter} editorSettings={editorSettings() || editorSettingsDefault} />
      </div>
   )
}
