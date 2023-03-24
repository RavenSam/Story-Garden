import { For, JSX } from "solid-js"
import {
   BiRegularUndo,
   BiRegularRedo,
   BiRegularBold,
   BiRegularStrikethrough,
   BiRegularItalic,
   BiRegularLinkAlt,
   BiRegularUnderline,
   BiRegularAlignJustify,
   BiRegularAlignLeft,
   BiRegularAlignRight,
   BiRegularAlignMiddle,
   BiRegularListUl,
   BiRegularListOl,
   BiRegularText,
   BiRegularCode,
   BiRegularCodeBlock,
} from "solid-icons/bi"
import { RiEditorH1, RiEditorH2, RiEditorDoubleQuotesR } from "solid-icons/ri"
import { MenuItem, Toggle } from "solid-headless"
import { unstable_clientOnly } from "solid-start"
import Button from "../ui/Button"
import { Editor } from "@tiptap/core"
import { createEditorTransaction } from "solid-tiptap"
const Dropdown = unstable_clientOnly(() => import("~/components/ui/Dropdown"))

const ButtonFallback = () => (
   <Button btnType="rect" variant="ghost">
      Loading...
   </Button>
)

function Divider() {
   return (
      <div class="flex items-center" aria-hidden="true">
         <div class="h-5 w-1  border-l border-slate-300 mx-4 md:mx-8" />
      </div>
   )
}

interface ControlProps {
   class?: string
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
         class={`${props.class} h-12 w-12 text-2xl rounded-xl bg-transparent text-gray-700 hover:text-black hover:bg-slate-200 active:bg-slate-300 space-x-2 focus-visible:outline-none btn shrink-0 relative group transition-all font-semibold`}
         classList={{ "!text-emerald-500 !bg-emerald-100": flag() }}
         title={props.title}
         onChange={props.onChange}
      >
         {props.children}
      </Toggle>
   )
}

const BlockOptions = () => {
   const blockOptions = [
      {
         blockType: "paragraph",
         label: "Normal",
         icon: BiRegularText,
         handler: () => {},
      },
      {
         blockType: "h1",
         label: "Large Heading",
         icon: RiEditorH1,
         handler: () => {},
      },
      {
         blockType: "h2",
         label: "Small Heading",
         icon: RiEditorH2,
         handler: () => {},
      },
      {
         blockType: "ul",
         label: "Bullet List",
         icon: BiRegularListUl,
         handler: () => {},
      },
      {
         blockType: "ol",
         label: "Numbered List",
         icon: BiRegularListOl,
         handler: () => {},
      },
      { blockType: "quote", label: "Quote", icon: RiEditorDoubleQuotesR, handler: () => {} },
      { blockType: "Code", label: "Code Block", icon: BiRegularCodeBlock, handler: () => {} },
   ]

   return (
      <Dropdown fallback={ButtonFallback} chevron>
         <For each={blockOptions}>
            {(option) => (
               <MenuItem
                  as="button"
                  class="text-sm p-1 text-left rounded hover:bg-purple-600 hover:text-white focus:outline-none focus:bg-purple-600 focus:text-white"
               >
                  {option.label}
               </MenuItem>
            )}
         </For>
      </Dropdown>
   )
}

const AlignOptions = () => {
   const formatAlignItems = [
      {
         label: "Left Align",
         icon: BiRegularAlignLeft,
         handler: () => {},
      },
      {
         label: "Center Align",
         icon: BiRegularAlignMiddle,
         handler: () => {},
      },
      {
         label: "Right Align",
         icon: BiRegularAlignRight,
         handler: () => {},
      },
      {
         label: "Justify Align",
         icon: BiRegularAlignJustify,
         handler: () => {},
      },
   ]

   return (
      <Dropdown fallback={ButtonFallback}>
         <For each={formatAlignItems}>
            {(option) => (
               <MenuItem
                  as="button"
                  class="text-sm p-1 text-left rounded hover:bg-purple-600 hover:text-white focus:outline-none focus:bg-purple-600 focus:text-white"
               >
                  {option.label}
               </MenuItem>
            )}
         </For>
      </Dropdown>
   )
}

interface ToolbarProps {
   editor: Editor
}

export default function FixedToolbar(props: ToolbarProps) {
   const undoRedoItems = [
      {
         label: "Undo",
         icon: BiRegularUndo,
         handler: () => {},
         disabled: false,
      },
      {
         label: "Redo",
         icon: BiRegularRedo,
         handler: () => {},
         disabled: false,
      },
   ]

   const formatTextItems = [
      {
         key: "bold",
         title: "Format Bold",
         icon: BiRegularBold,
         handler: () => props.editor.chain().focus().toggleBold().run(),
      },
      {
         key: "italic",
         title: "Format Italics",
         icon: BiRegularItalic,
         handler: () => props.editor.chain().focus().toggleItalic().run(),
      },
      {
         key: "underline",
         title: "Format Underline",
         icon: BiRegularUnderline,
         handler: () => props.editor.chain().focus().toggleUnderline().run(),
      },
      {
         key: "code",
         title: "Format Code",
         icon: BiRegularCode,
         handler: () => props.editor.chain().focus().toggleCode().run(),
      },
      {
         key: "strike",
         title: "Format Strikethrough",
         icon: BiRegularStrikethrough,
         handler: () => props.editor.chain().focus().toggleStrike().run(),
      },
      // {
      //    key:"", title: "Format Link",
      //    icon: BiRegularLinkAlt,
      //    handler: () => {},
      //    isActive: false,
      // },
   ]

   return (
      <div class=" w-full rounded-xl">
         <div class="flex items-center justify-between">
            <For each={undoRedoItems}>
               {(item) => (
                  <Button
                     variant="ghost"
                     btnType="icon"
                     disabled={item.disabled}
                     onClick={item.handler}
                     label={item.label}
                  >
                     <item.icon />
                  </Button>
               )}
            </For>

            <Divider />

            <BlockOptions />

            <Divider />

            <For each={formatTextItems}>
               {(item) => (
                  <Control key={item.key} editor={props.editor} onChange={item.handler} title="Bold">
                     <item.icon />
                  </Control>
               )}
            </For>

            <Divider />

            <AlignOptions />
         </div>
      </div>
   )
}
