import { HiSolidEye, HiSolidEyeOff } from "solid-icons/hi"
import { createSignal, Show } from "solid-js"

interface InputProps {
   id?: string
   name: string
   placeholder?: string
   label?: string
   type?: string
   wrapperClass?: string
   error?: string
}

export default function Input(props: InputProps) {
   const { id, name, wrapperClass, error, placeholder, label, type = "text", ...rest } = props
   const [showPW, setShowPW] = createSignal(false)

   let inputRef: HTMLInputElement

   return (
      <div class={wrapperClass}>
         <div
            class={`border relative rounded-xl transition duration-150 ease-in-out focus-within:border-emerald-500 ${
               error
                  ? " focus-within:border-red-500 border-red-500"
                  : "focus-within:border-emerald-500 border-slate-200"
            }`}
         >
            <label for={id} class="absolute -top-7 capitalize left-0 text-sm text-slate-700 font-medium  px-2 pt-1.5">
               {label ?? name}
            </label>
            <input
               class={`w-full px-3  py-3 text-slate-800 focus:bg-white hover:bg-slate-100 placeholder-slate-600 outline-none text-base font-light rounded-xl`}
               classList={{ "pr-10": type === "password" }}
               type={type === "password" ? (showPW() ? "text" : "password") : type}
               name={name}
               id={id}
               placeholder={placeholder}
               onClick={() => inputRef.focus()}
               {...rest}
            />

            <Show when={type === "password"}>
               <button
                  onclick={() => setShowPW((p) => !p)}
                  type="button"
                  class="absolute right-0 top-0 bottom-0 flex items-center justify-center p-2 text-xl text-slate-700"
               >
                  {showPW() ? <HiSolidEye /> : <HiSolidEyeOff />}
               </button>
            </Show>
         </div>
         <Show when={error}>
            <p role="alert" class="text-xs pl-2 text-red-500 font-semibold mb-4">
               {error}
            </p>
         </Show>
      </div>
   )
}
