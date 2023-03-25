import { createEffect, createMemo, createSignal, For, JSX, on, Show } from "solid-js"
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
import { Editor } from "@tiptap/core"
import { createEditorTransaction, useEditorIsActive } from "solid-tiptap"
import { IconTypes } from "solid-icons"
const Dropdown = unstable_clientOnly(() => import("~/components/ui/Dropdown"))

const ButtonFallback = () => <button class="btn btn-ghost-default btn-rect">Loading...</button>

function Divider() {
   return (
      <div class="hidden md:flex items-center" aria-hidden="true">
         <div class="h-5 w-1  border-l border-slate-300 mx-auto" />
      </div>
   )
}

const BtnChildren = (props: { icon: IconTypes; label?: string }) => (
   <>
      <props.icon class="text-xl" />
      <Show when={props.label}>
         <span class="text-sm">{props.label}</span>
      </Show>
   </>
)

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
         class={`${props.class} btn btn-ghost-default btn-icon`}
         classList={{ "!text-emerald-500 !bg-emerald-100": flag() }}
         title={props.title}
         onChange={props.onChange}
      >
         {props.children}
      </Toggle>
   )
}

type OptionTypes = {
   name: string
   label: string
   attr?: { level: number }
   icon: IconTypes
   handler?: () => boolean
}

const BlockOptions = (props: { editor: Editor }) => {
   const blockOptions = [
      {
         name: "paragraph",
         label: "Normal",
         icon: BiRegularText,
         handler: () => props.editor.chain().focus().setParagraph().run(),
      },
      {
         name: "heading",
         attr: { level: 1 },
         label: "Large",
         icon: RiEditorH1,
         handler: () => props.editor.chain().focus().setHeading({ level: 1 }).run(),
      },
      {
         name: "heading",
         attr: { level: 2 },
         label: "Small",
         icon: RiEditorH2,
         handler: () => props.editor.chain().focus().setHeading({ level: 2 }).run(),
      },
      {
         name: "bulletList",
         label: "Bullet",
         icon: BiRegularListUl,
         handler: () => props.editor.chain().focus().toggleBulletList().run(),
      },
      {
         name: "orderedList",
         label: "Numbered",
         icon: BiRegularListOl,
         handler: () => props.editor.chain().focus().toggleOrderedList().run(),
      },
      {
         name: "blockquote",
         label: "Quote",
         icon: RiEditorDoubleQuotesR,
         handler: () => props.editor.chain().focus().toggleBlockquote().run(),
      },
      {
         name: "codeBlock",
         label: "Code",
         icon: BiRegularCodeBlock,
         handler: () => props.editor.chain().focus().toggleCodeBlock().run(),
      },
   ]

   const [activeOption, setActiveOption] = createSignal<OptionTypes>(blockOptions[0])

   const isActive = (name: string, attr?: {} | undefined) => props.editor.isActive(name, attr)

   return (
      <Dropdown
         btnChildren={<BtnChildren icon={activeOption().icon} label={activeOption().label} />}
         btnClass="bg-slate-100"
         menuClass="bg-white/80 backdrop-blur-sm"
         fallback={ButtonFallback}
      >
         <For each={blockOptions}>
            {(option) => (
               <MenuItem
                  onclick={() => {
                     option.handler()
                     setActiveOption(option)
                  }}
                  as="button"
                  class="btn btn-ghost-default btn-rect justify-start"
                  classList={{ "!bg-emerald-100 !text-emerald-500": isActive(option.name, option.attr) }}
               >
                  <option.icon class="text-xl" />
                  <span class="text-sm">{option.label}</span>
               </MenuItem>
            )}
         </For>
      </Dropdown>
   )
}

const AlignOptions = (props: { editor: Editor }) => {
   const formatAlignItems = [
      {
         name: "left",
         label: "Left Align",
         icon: BiRegularAlignLeft,
      },
      {
         name: "center",
         label: "Center Align",
         icon: BiRegularAlignMiddle,
      },
      {
         name: "right",
         label: "Right Align",
         icon: BiRegularAlignRight,
      },
      {
         name: "justify",
         label: "Justify Align",
         icon: BiRegularAlignJustify,
      },
   ]

   const [activeOption, setActiveOption] = createSignal<OptionTypes>(formatAlignItems[0])

   const isActive = (name: string) => props.editor.isActive({ textAlign: name })

   return (
      <Dropdown
         btnLabel={activeOption().label}
         btnChildren={<BtnChildren icon={activeOption().icon} />}
         btnClass="bg-slate-100"
         menuClass="bg-white/80 backdrop-blur-sm"
         fallback={ButtonFallback}
      >
         <For each={formatAlignItems}>
            {(option) => (
               <MenuItem
                  onclick={() => {
                     props.editor.chain().focus().setTextAlign(option.name).run()
                     setActiveOption(option)
                  }}
                  as="button"
                  class="btn btn-ghost-default btn-icon"
                  classList={{ "!bg-emerald-100 !text-emerald-500": isActive(option.name) }}
               >
                  <option.icon class="text-xl" />
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
   const canUndo = createEditorTransaction(
      () => props.editor,
      (instance) => instance.can().undo()
   )

   const canRedo = createEditorTransaction(
      () => props.editor,
      (instance) => instance.can().redo()
   )

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
         <div class="flex items-center justify-center sm:justify-between flex-wrap mx-auto w-fit md:w-full">
            <div class="flex items-center ">
               <button
                  class="btn btn-ghost-default btn-icon"
                  aria-label="Undo"
                  title="Undo"
                  disabled={!canUndo()}
                  onclick={() => props.editor.chain().focus().undo().run()}
               >
                  <BiRegularUndo />
               </button>

               <button
                  class="btn btn-ghost-default btn-icon"
                  aria-label="Redo"
                  title="Redo"
                  disabled={!canRedo()}
                  onclick={() => props.editor.chain().focus().redo().run()}
               >
                  <BiRegularRedo />
               </button>
            </div>

            <Divider />

            <BlockOptions editor={props.editor} />

            <Divider />

            <div class="flex items-center ">
               <For each={formatTextItems}>
                  {(item) => (
                     <Control key={item.key} editor={props.editor} onChange={item.handler} title={item.title}>
                        <item.icon />
                     </Control>
                  )}
               </For>
            </div>

            <Divider />

            <AlignOptions editor={props.editor} />
         </div>
      </div>
   )
}
