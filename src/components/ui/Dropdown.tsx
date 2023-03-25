import { JSX, JSXElement, mergeProps, Show } from "solid-js"
import { Popover, PopoverButton, PopoverPanel, Transition, Menu } from "solid-headless"
import { TiChevronRight } from "solid-icons/ti"

interface DropdownProps {
   children: JSXElement
   btnChildren?: JSXElement
   btnClass?: string
   btnLabel?: string
   chevron?: boolean
}

export default function Dropdown(props: DropdownProps): JSX.Element {
   const merged = mergeProps({ chevron: false }, props)

   return (
      <div class="flex items-center justify-center">
         <Popover defaultOpen={false} class="relative z-10">
            {({ isOpen }) => (
               <>
                  <PopoverButton
                     aria-label={merged.btnLabel || "Action"}
                     class={`${merged.btnClass} btn btn-ghost-default btn-rect`}
                  >
                     <Show when={merged.btnChildren} fallback={<span>Action</span>}>
                        {merged.btnChildren}
                     </Show>

                     <Show when={merged.chevron}>
                        <span class={` ${isOpen() ? "-rotate-90" : "rotate-90"} px-3 text-xl transition-all`}>
                           <TiChevronRight />
                        </span>
                     </Show>
                  </PopoverButton>
                  <Transition
                     show={isOpen()}
                     enter="transition duration-400"
                     enterFrom="opacity-0 -translate-y-4 "
                     enterTo="opacity-100 translate-y-0 "
                     leave="transition duration-150"
                     leaveFrom="opacity-100 translate-y-0 "
                     leaveTo="opacity-0 -translate-y-4"
                  >
                     <PopoverPanel
                        unmount={false}
                        class="absolute z-10 px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl"
                        classList={{}}
                     >
                        <Menu class="min-w-max rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 bg-white flex flex-col space-y-1 p-1">
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
