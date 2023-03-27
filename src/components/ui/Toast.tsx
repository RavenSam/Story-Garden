import { createSignal, JSX, For, Show, onMount } from "solid-js"
import { Transition, useToaster, Toaster, Toast, ToasterStore } from "solid-headless"
import { HiSolidX } from "solid-icons/hi"

export const notifications = new ToasterStore<string>()

export const createToast = (message: string) => notifications.create(message)

interface ToastProps {
   id: string
   message: string
}

function CustomToast(props: ToastProps): JSX.Element {
   const [isOpen, setIsOpen] = createSignal(false)

   function dismiss() {
      setIsOpen(false)
   }

   onMount(() => setIsOpen(true))

   return (
      <Transition
         show={isOpen()}
         class="relative transition rounded-xl p-4 bg-gray-800 border-2 text-slate-200 backdrop-blur-sm"
         enter="ease-out duration-300"
         enterFrom="opacity-0 scale-50"
         enterTo="opacity-100 scale-100"
         leave="ease-in duration-200"
         leaveFrom="opacity-100 scale-100"
         leaveTo="opacity-0 scale-50"
         afterLeave={() => {
            notifications.remove(props.id)
         }}
      >
         <Toast class="flex justify-between items-center relative ">
            <span class="flex-1 text-sm font-semibold">{props.message}</span>
            <button
               type="button"
               class="flex-none w-6 h-6 p-1 btn btn-ghost-default btn-icon-sm absolute top-0 right-0"
               onClick={dismiss}
            >
               <HiSolidX />
            </button>
         </Toast>
      </Transition>
   )
}

export default function ToastProvider() {
   const notifs = useToaster(notifications)

   return (
      <Toaster class="absolute right-0 top-0 m-4 z-[11] max-w-sm w-full min-w-fit">
         <For fallback={null} each={notifs().slice(0).reverse()}>
            {(item) => <CustomToast id={item.id} message={item.data} />}
         </For>
      </Toaster>
   )
}
