import { createEffect, createSignal, For, on, Show, Suspense } from "solid-js"
import { TiCogOutline } from "solid-icons/ti"
import Modal from "~/components/ui/Modal"
import {
   editorSettings,
   editorSettingsDefault,
   editorSettingsOptions,
   EditorSettingsTypes,
   setEditorSettings,
} from "../Editor"
import { HiSolidCheckCircle } from "solid-icons/hi"

const [newSettings, setNewSettings] = createSignal<EditorSettingsTypes>()

interface EditorSettingsModalProps {
   mobileScreen: () => boolean
   open: () => boolean
}

interface RadioProps {
   title: string
   each: any[]
   default?: string | number
   col: number
   key: string
}

const RadiosCards = (props: RadioProps) => {
   const [checked, setChecked] = createSignal(props.default)

   const getEl = (el: string | [], index: number) => (typeof el === "string" || typeof el === "number" ? el : el[index])

   createEffect(
      on(checked, () => {
         let changedSetting: EditorSettingsTypes = Object.assign({}, newSettings())
         // @ts-ignore
         changedSetting[props.key] = checked()
         setNewSettings(changedSetting)
      })
   )

   return (
      <div class="">
         <h3 class="text-sm font-bold text-slate-700">{props.title}</h3>

         <fieldset style={{ "grid-template-columns": `repeat(${props.col}, minmax(0, 1fr)` }} class="grid gap-2 mt-2">
            <For each={props.each}>
               {(el) => (
                  <label
                     for={`size-${getEl(el, 0)}`}
                     class="relative border flex items-center bg-slate-100 text-slate-700  justify-center shadow-8 rounded-full py-2 px-8 cursor-pointer"
                     classList={{
                        "!text-emerald-500 border-emerald-500 !bg-emerald-100 !shadow-5": getEl(el, 1) === checked(),
                     }}
                  >
                     <input
                        class="hidden"
                        type="radio"
                        name={`size-${getEl(el, 0)}`}
                        id={`size-${getEl(el, 0)}`}
                        checked={getEl(el, 1) === checked()}
                        onChange={() => setChecked(getEl(el, 1))}
                     />
                     <span class="p-2 font-bold text-sm capitalize">{getEl(el, 0)}</span>

                     {/* <Show when={getEl(el, 1) === checked()}>
                        <span class="absolute top-0 left-0 text-2xl text-emerald-500">
                           <HiSolidCheckCircle />
                        </span>
                     </Show> */}
                  </label>
               )}
            </For>
         </fieldset>
      </div>
   )
}

export default function EditorSettingsModal(props: EditorSettingsModalProps) {
   const [isOpen, setIsOpen] = createSignal(false)

   const saveSettings = () => {
      if (newSettings()) {
         setEditorSettings(newSettings())
         window.localStorage.setItem("editorSettings", JSON.stringify(newSettings()))
         setIsOpen(false)
      } else {
         setIsOpen(false)
      }
   }

   return (
      <>
         <button
            onClick={() => setIsOpen(true)}
            class="flex items-center w-full rounded-xl text-slate-300 hover:text-white hover:bg-white/10"
         >
            <span class="!w-12 !h-12 flex items-center justify-center text-xl">
               <TiCogOutline />
            </span>
            <Show when={props.mobileScreen() ? true : props.open()}>
               <span class="font-medium">Settings</span>
            </Show>
         </button>

         <Modal setIsOpen={setIsOpen} isOpen={isOpen} title="Settings">
            <div class="space-y-6 py-4">
               <Show when={editorSettings()} fallback="Loading">
                  <RadiosCards
                     title="Editor width"
                     each={editorSettingsOptions.widths}
                     col={4}
                     default={editorSettings()?.width}
                     key="width"
                  />
               </Show>
               <Show when={editorSettings()} fallback="Loading">
                  <RadiosCards
                     title="Editor background"
                     each={Object.entries(editorSettingsOptions.bg)}
                     col={3}
                     default={editorSettings()?.bg}
                     key="bg"
                  />
               </Show>
               <Show when={editorSettings()} fallback="Loading">
                  <RadiosCards
                     title="Toolbar position"
                     each={Object.entries(editorSettingsOptions.toolbar_position)}
                     col={2}
                     default={editorSettings()?.toolbar_position}
                     key="toolbar_position"
                  />
               </Show>
            </div>

            <div class="flex items-center justify-end mt-6 space-x-2">
               <button type="button" class="btn btn-ghost-default btn-pill" onClick={() => setIsOpen(false)}>
                  Cancel
               </button>

               <button type="button" class="btn btn-solid-primary btn-pill" onClick={saveSettings}>
                  Save
               </button>
            </div>
         </Modal>
      </>
   )
}
