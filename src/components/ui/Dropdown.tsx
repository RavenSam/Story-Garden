import { JSX, JSXElement, mergeProps, Show } from "solid-js"
import { Popover, PopoverButton, PopoverPanel, Transition, Menu } from "solid-headless"
import { TiChevronRight } from "solid-icons/ti"

interface DropdownProps {
   children: JSXElement
   chevron?: boolean
}

export default function Dropdown(props: DropdownProps): JSX.Element {
   const merged = mergeProps({ chevron: false }, props)

   return (
      <div class="flex items-center justify-center">
         <Popover defaultOpen={false} class="relative">
            {({ isOpen }) => (
               <>
                  <PopoverButton class="btn rounded-xl px-6 py-2 bg-transparent text-gray-700 hover:text-black hover:bg-slate-200 active:bg-slate-300">
                     <span>Action</span>
                     <Show when={merged.chevron}>
                        <span class={` ${isOpen() ? "-rotate-90" : "rotate-90"} px-3 text-xl transition-all`}>
                           <TiChevronRight />
                        </span>
                     </Show>
                  </PopoverButton>
                  <Transition
                     show={isOpen()}
                     enter="transition duration-200"
                     enterFrom="opacity-0 -translate-y-1 scale-50"
                     enterTo="opacity-100 translate-y-0 scale-100"
                     leave="transition duration-150"
                     leaveFrom="opacity-100 translate-y-0 scale-100"
                     leaveTo="opacity-0 -translate-y-1 scale-50"
                  >
                     <PopoverPanel
                        unmount={false}
                        class="absolute z-10 px-4 mt-3 transform -translate-x-1/2 bottom-0 left-1/2 sm:px-0 lg:max-w-3xl"
                     >
                        <Menu class="overflow-hidden w-64 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white flex flex-col space-y-1 p-1">
                           {merged.children}
                        </Menu>
                     </PopoverPanel>
                  </Transition>
               </>
            )}
         </Popover>
      </div>
   )
}
