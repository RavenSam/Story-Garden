import TiptapEditor from "./tiptap/TiptapEditor"

export type EditorSettingsTypes = {
   width: number
   bg: string
   toolbar: { position: string }
   editable: boolean
}

export const editorSettingsOptions = {
   widths: [640, 768, 1024, 1280],
   bg: { transparent: "", distinct: "md:bg-white", elevated: "md:bg-white md:shadow-xl" },
   toolbar: {
      position: {
         top: "tollbar-sticky-top",
         bottom: "tollbar-sticky-bottom",
      },
   },
}

export const editorSettings: EditorSettingsTypes = {
   width: editorSettingsOptions.widths[1],
   bg: editorSettingsOptions.bg.transparent,
   toolbar: {
      position: editorSettingsOptions.toolbar.position.top,
   },
   editable: true,
}

export default function Editor() {
   return (
      <div
         style={{ "max-width": editorSettings.width + "px" }}
         class={`mx-auto w-full rounded-xl ${editorSettings.bg}`}
      >
         <TiptapEditor editorSettings={editorSettings} />
      </div>
   )
}
