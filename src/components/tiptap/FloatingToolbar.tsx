import { Editor } from "@tiptap/core"
import { Toggle } from "solid-headless"
import { TiAdjustBrightness } from "solid-icons/ti"
import { JSX } from "solid-js"
import { createEditorTransaction } from "solid-tiptap"

interface ControlProps {
   class: string
   editor: Editor
   title: string
   key: string
   onChange: () => void
   isActive?: (editor: Editor) => boolean
   children: JSX.Element
}

function Control(props: ControlProps): JSX.Element {
   const flag = createEditorTransaction(
      () => props.editor,
      (instance) => {
         if (props.isActive) {
            return props.isActive(instance)
         }
         return instance.isActive(props.key)
      }
   )

   return (
      <Toggle
         defaultPressed={false}
         class={`${props.class} w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-200 focus:outline-none focus-visible:ring focus-visible:ring-emerald-400 focus-visible:ring-opacity-75`}
         classList={{ "bg-emerald-100 text-emerald-500": flag() }}
         title={props.title}
         onChange={props.onChange}
      >
         {props.children}
      </Toggle>
   )
}

const controlList = [{ title: "", key: "", class: "", icon: TiAdjustBrightness, handler: () => {}, isActive: "unset" }]

interface ToolbarProps {
   editor: Editor
}

export default function ToolbarContents(props: ToolbarProps): JSX.Element {
   return (
      <div class="p-2 flex space-x-1">
         <div class="flex space-x-1">
            <Control
               key="bold"
               class="font-bold"
               editor={props.editor}
               onChange={() => props.editor.chain().focus().toggleBold().run()}
               title="Bold"
            >
               B
            </Control>
            <Control
               key="italic"
               class="italic"
               editor={props.editor}
               onChange={() => props.editor.chain().focus().toggleItalic().run()}
               title="Italic"
            >
               I
            </Control>
            <Control
               key="strike"
               class="line-through"
               editor={props.editor}
               onChange={() => props.editor.chain().focus().toggleStrike().run()}
               title="Strike Through"
            >
               S
            </Control>
         </div>
      </div>
   )
}
