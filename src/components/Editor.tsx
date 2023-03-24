import TiptapEditor from "./tiptap/TiptapEditor"

const EditorSettingsChoices = {
   widths: [640, 768, 1024, 1280],
   bg: { transparent: "", distinct: "md:bg-white", elevated: "md:bg-white md:shadow-xl" },
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
