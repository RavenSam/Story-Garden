import TiptapEditor from "./tiptap/TiptapEditor"

const editorSettingsOptions = {
   widths: [640, 768, 1024, 1280],
   bg: { transparent: "", distinct: "md:bg-white", elevated: "md:bg-white md:shadow-xl" },
   toolbar: {
      position: ["top", "bottom"],
   },
}

const editorSettings = {
   width: editorSettingsOptions.widths[1],
   bg: editorSettingsOptions.bg.transparent,
   toolbar: {
      position: "top",
   },
}

export default function Editor() {
   return (
      <div
         style={{ "max-width": editorSettings.width + "px" }}
         class={`mx-auto w-full rounded-xl ${editorSettings.bg}`}
      >
         <TiptapEditor />
      </div>
   )
}
