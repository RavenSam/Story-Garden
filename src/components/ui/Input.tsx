import { FormHandler } from "solid-form-handler"
import { HiSolidEye, HiSolidEyeOff } from "solid-icons/hi"
import { createSignal, JSX, Show, splitProps } from "solid-js"
import { FieldProps, Field } from "solid-form-handler"

export type TextInputProps = JSX.InputHTMLAttributes<HTMLInputElement> &
   FieldProps & { label?: string; type?: string; wrapperClass?: string }

export default function Input(props: TextInputProps) {
   const [local, rest] = splitProps(props, ["label", "formHandler", "type", "wrapperClass"])

   const [showPW, setShowPW] = createSignal(false)

   return (
      <Field
         {...props}
         mode="input"
         render={(field) => (
            <div class={local.wrapperClass}>
               <div
                  class={`border relative rounded-xl transition duration-150 ease-in-out ${
                     field.helpers.error
                        ? " focus-within:border-red-500 border-red-500"
                        : "focus-within:border-emerald-500 border-slate-300"
                  }`}
               >
                  <label
                     for={field.props.id}
                     class="absolute -top-7 capitalize left-0 text-sm text-slate-700 font-medium  px-2 pt-1.5"
                  >
                     {local.label || field.props.name}
                  </label>
                  <input
                     class={`w-full px-3  py-3 text-slate-800 bg-white/50 focus:bg-white/50 hover:bg-slate-100 placeholder-slate-500 outline-none text-base font-light rounded-xl`}
                     classList={{ "pr-10": local.type === "password" }}
                     type={local.type === "password" ? (showPW() ? "text" : "password") : local.type}
                     {...field.props}
                     {...rest}
                  />

                  <Show when={local.type === "password"}>
                     <button
                        onclick={() => setShowPW((p) => !p)}
                        type="button"
                        class="absolute btn right-0 top-0 bottom-0 flex items-center justify-center p-2 text-xl text-slate-700"
                     >
                        {showPW() ? <HiSolidEye /> : <HiSolidEyeOff />}
                     </button>
                  </Show>
               </div>

               <div class="h-4 mt-1">
                  <Show when={field.helpers.error}>
                     <p role="alert" class="text-xs pl-2 text-red-500 font-semibold mb-4">
                        {field.helpers.errorMessage}
                     </p>
                  </Show>
               </div>
            </div>
         )}
      />
   )
}
