import { createSignal, For, Show } from "solid-js"
import { TiCogOutline } from "solid-icons/ti"
import Modal from "~/components/ui/Modal"
import { editorSettings, editorSettingsOptions } from "../Editor"

interface EditorSettingsModalProps {
   mobileScreen: () => boolean
   open: () => boolean
}

const WidthSettings = () => {
   const [checked, setChecked] = createSignal(editorSettings.width)

   return (
      <div class="">
         <h3 class="text-base font-medium text-gray-800">Editor width</h3>

         <div class="grid grid-cols-4 gap-2 mt-2">
            <For each={editorSettingsOptions.widths}>
               {(el) => (
                  <label
                     for={`size-${el}`}
                     class="border border-slate-400  rounded-xl aspect-square p-2 cursor-pointer"
                     classList={{
                        "!border-emerald-500  shadow": el === checked(),
                     }}
                  >
                     <input
                        type="radio"
                        name={`size-${el}`}
                        id={`size-${el}`}
                        class=""
                        checked={el === checked()}
                        onChange={() => setChecked(el)}
                     />
                     <span class="p-2 font-bold text-sm">{el}</span>
                  </label>
               )}
            </For>
         </div>
      </div>
   )
}

const ToolbarPositionSettings = () => {
   const [checked, setChecked] = createSignal(editorSettings.toolbar.position)

   return (
      <div class="mt-4">
         <h3 class="text-base font-medium text-gray-800">Toolbar position</h3>

         <div class="grid grid-cols-1 gap-2 mt-2">
            <For each={Object.entries(editorSettingsOptions.toolbar.position)}>
               {(el) => (
                  <label
                     for={`size-${el}`}
                     class="border border-slate-400  rounded-xl p-2 cursor-pointer"
                     classList={{
                        "!border-emerald-500  shadow": el[1] === checked(),
                     }}
                  >
                     <input
                        type="radio"
                        name={`size-${el}`}
                        id={`size-${el}`}
                        class=""
                        checked={el[1] === checked()}
                        onChange={() => setChecked(el[1])}
                     />
                     <span class="p-2 font-bold text-sm capitalize">{el[0]}</span>
                  </label>
               )}
            </For>
         </div>
      </div>
   )
}

const Bg = () => {
   const [checked, setChecked] = createSignal(editorSettings.bg)

   return (
      <div class="mt-4">
         <h3 class="text-base font-medium text-gray-800">Editor background</h3>

         <div class="grid grid-cols-3 gap-2 mt-2">
            <For each={Object.entries(editorSettingsOptions.bg)}>
               {(el) => (
                  <label
                     for={`size-${el}`}
                     class="border border-slate-400  rounded-xl p-2 cursor-pointer aspect-square"
                     classList={{
                        "!border-emerald-500  shadow": el[1] === checked(),
                     }}
                  >
                     <input
                        type="radio"
                        name={`size-${el}`}
                        id={`size-${el}`}
                        class=""
                        checked={el[1] === checked()}
                        onChange={() => setChecked(el[1])}
                     />
                     <span class="p-2 font-bold text-sm capitalize">{el[0]}</span>
                  </label>
               )}
            </For>
         </div>
      </div>
   )
}

export default function EditorSettingsModal(props: EditorSettingsModalProps) {
   const [isOpen, setIsOpen] = createSignal(true)

   return (
      <>
         <button
            onClick={() => setIsOpen(true)}
            class="flex items-center w-full rounded-xl text-slate-700 hover:text-black hover:bg-slate-200"
         >
            <span class="!w-12 !h-12 flex items-center justify-center text-xl">
               <TiCogOutline />
            </span>
            <Show when={props.mobileScreen() ? true : props.open()}>
               <span class="font-medium">Settings</span>
            </Show>
         </button>

         <Modal setIsOpen={setIsOpen} isOpen={isOpen} title="Editor Settings">
            <WidthSettings />

            <Bg />

            <ToolbarPositionSettings />

            <div class="flex items-center justify-end mt-6 space-x-2">
               <button type="button" class="btn btn-ghost-default btn-pill" onClick={() => setIsOpen(false)}>
                  Cancel
               </button>

               <button type="button" class="btn btn-solid-primary btn-pill" onClick={() => {}}>
                  Save
               </button>
            </div>
         </Modal>
      </>
   )
}
