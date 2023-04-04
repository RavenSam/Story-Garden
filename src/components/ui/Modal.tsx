import { Accessor, createEffect, JSX, JSXElement, Setter, Show } from "solid-js"
import { Portal } from "solid-js/web"
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild, DialogOverlay } from "solid-headless"
import { HiSolidX } from "solid-icons/hi"

interface ModalProps {
   isOpen: Accessor<boolean>
   setIsOpen: Setter<boolean>
   children: JSXElement
   title?: string
}

export default function Modal(props: ModalProps): JSX.Element {
   const closeModal = () => props.setIsOpen(false)

   createEffect(() =>
      props.isOpen()
         ? typeof document === "undefined"
            ? null
            : (document.body.style.overflow = "hidden")
         : (document.body.style.overflow = "unset")
   )

   return (
      <>
         <Portal>
            <Transition appear show={props.isOpen()}>
               <Dialog isOpen class="fixed inset-0 z-50" onClose={closeModal}>
                  <div class="min-h-screen px-4 flex items-center justify-center">
                     <TransitionChild
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                     >
                        <DialogOverlay class="fixed inset-0 bg-gray-900 bg-opacity-50" />
                     </TransitionChild>

                     {/* This element is to trick the browser into centering the modal contents. */}
                     <span class="inline-block h-screen align-middle" aria-hidden="true">
                        &#8203;
                     </span>
                     <TransitionChild
                        class="w-full"
                        enter="ease-out duration-300"
                        enterFrom="translate-y-6  opacity-0 "
                        enterTo="translate-y-0 opacity-100 "
                        leave="ease-in duration-200"
                        leaveFrom="translate-y-0 opacity-100 "
                        leaveTo="translate-y-6 opacity-0 "
                     >
                        <DialogPanel class="relative block max-h-screen mx-auto overflow-y-scroll w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                           <button
                              onclick={closeModal}
                              title="Close"
                              aria-label="Close Modal"
                              class="btn btn-ghost-default btn-icon-sm absolute top-2 right-2"
                           >
                              <HiSolidX />
                           </button>

                           <Show when={props.title}>
                              <DialogTitle as="h2" class="text-xl md:text-2xl font-bold leading-6 text-gray-900">
                                 {props.title}
                              </DialogTitle>
                           </Show>

                           <div class="mt-4">{props.children}</div>
                        </DialogPanel>
                     </TransitionChild>
                  </div>
               </Dialog>
            </Transition>
         </Portal>
      </>
   )
}
