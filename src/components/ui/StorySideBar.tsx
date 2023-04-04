import { For, createSignal, Show, JSXElement, onMount, createEffect, onCleanup } from "solid-js"
import { A, useLocation, useParams } from "solid-start"
import { IconTypes } from "solid-icons"
import { TiDocument, TiUserOutline, TiThLargeOutline, TiChevronRight, TiLocation, TiNotes } from "solid-icons/ti"
import { HiSolidMenuAlt2 } from "solid-icons/hi"
import EditorSettingsModal from "~/components/flow/EditorSettings"

type ListType = { name: string; icon: IconTypes; href: string; childrenList: { name: string; href: string }[] }

const [open, setOpen] = createSignal(false)
const [windowWidth, setWindowWidth] = createSignal(0)
const [mobileScreen, setMobileScreen] = createSignal(true)

// Tailwind md = 768px
const BREAKPOINT = 768
// Randomly chosen
const SIDENAV_MAX_WIDTH = 240
// Calculated using padding and width of nav list icons
const SIDENAV_MIN_WIDTH = 64

const navList: ListType[] = [
   { name: "Dashboard", icon: TiThLargeOutline, href: "/author/", childrenList: [] },
   { name: "Stories", icon: TiDocument, href: "/author/stories", childrenList: [] },
   { name: "Characters", icon: TiUserOutline, href: "/author/characters", childrenList: [] },
   { name: "Locations", icon: TiLocation, href: "/author/locations", childrenList: [] },
   { name: "My Notes", icon: TiNotes, href: "/author/notes", childrenList: [] },
]

const SideLink = ({ item }: { item: ListType }) => {
   const [openSubMenu, setOpenSubMenu] = createSignal(false)
   const location = useLocation()
   // const [isShown, setIsShown] = createSignal(false)

   const hasChildren = item.childrenList.length

   const toggleSubMenu = () => setOpenSubMenu((prev) => !prev)

   return (
      <div class="relative">
         <div
            // onMouseEnter={() => hasChildren && !open() && setIsShown(true)}
            // onMouseLeave={() => hasChildren && !open() && setIsShown(false)}
            class="flex items-center rounded-xl text-slate-300 hover:text-white hover:bg-white/10"
            classList={{ "btn-gradient shadow-md": item.href === location.pathname }}
         >
            <A href={item.href} class="flex items-center w-full">
               <span class="!w-12 !h-12 flex items-center justify-center text-xl">
                  <item.icon />
               </span>
               <Show when={mobileScreen() ? true : open()}>
                  <span class="font-medium">{item.name}</span>
               </Show>
            </A>

            <Show when={(hasChildren && open()) || (hasChildren && mobileScreen())}>
               <button
                  onClick={toggleSubMenu}
                  class={` ${openSubMenu() ? "-rotate-90" : "rotate-90"} px-3 text-base transition-all`}
               >
                  <TiChevronRight />
               </button>
            </Show>
         </div>

         <Show when={openSubMenu() && open()}>
            <ul class="px-2 m-1 border-l border-slate-500 origin-top">
               <SubMenu item={item} />
            </ul>
         </Show>

         {/* <Show when={hasChildren && !open() && isShown() && !mobileScreen()}>
            <div
               onMouseEnter={() => setIsShown(true)}
               onMouseLeave={() => setIsShown(false)}
               class="absolute left-0 pl-4 pt-4 translate-x-[40%] -translate-y-[25%]  w-max z-10"
            >
               <ul class=" bg-white shadow rounded-xl ">
                  <SubMenu item={item} />
               </ul>
            </div>
         </Show> */}
      </div>
   )
}

const SubMenu = ({ item }: { item: ListType }) => {
   return (
      <For each={item.childrenList}>
         {(el) => (
            <li>
               <A href={el.href} class="rounded-xl block px-3 py-1 text-slate-300 hover:text-white hover:bg-white/10">
                  {el.name}
               </A>
            </li>
         )}
      </For>
   )
}

interface SideBarProps {
   children: JSXElement
}

export default function StorySideBar(props: SideBarProps) {
   const [sideNavWidth, setSideNavWidth] = createSignal(0)
   const params = useParams()

   createEffect(() => setMobileScreen(windowWidth() < BREAKPOINT))

   createEffect(() => {
      let navWidth = mobileScreen() ? SIDENAV_MAX_WIDTH : open() ? SIDENAV_MAX_WIDTH : SIDENAV_MIN_WIDTH
      setSideNavWidth(navWidth)
   })

   const handleResize = () => setWindowWidth(window?.innerWidth)

   onMount(() => {
      window?.addEventListener("resize", handleResize)
      handleResize()
      setOpen(windowWidth() < BREAKPOINT ? false : true)
   })

   onCleanup(() => (typeof window === "undefined" ? null : window?.removeEventListener("resize", handleResize)))

   return (
      <>
         <div
            style={{
               width: mobileScreen() ? "100%" : sideNavWidth() + "px",
               "max-width": SIDENAV_MAX_WIDTH + "px",
               transform: mobileScreen() ? (open() ? "translateX(0)" : "translateX(-100%)") : "translateX(0)",
            }}
            class="fixed left-0 top-0 bottom-0 bg-slate-800 p-2 transition-all z-[15]"
         >
            <nav class="space-y-1 flex flex-col h-full pt-20">
               <For each={navList}>{(item) => <SideLink item={item} />}</For>

               <div class="!mt-auto">
                  <Show when={params.chapter}>
                     <EditorSettingsModal mobileScreen={mobileScreen} open={open} />
                  </Show>
               </div>
            </nav>

            <button
               onClick={() => setOpen((prev) => !prev)}
               class="absolute top-0 right-0 translate-x-full text-xl p-2 rounded-xl text-slate-700 hover:text-black"
            >
               <HiSolidMenuAlt2 class="text-2xl" />
            </button>
         </div>

         <div style={{ "margin-left": mobileScreen() ? 0 : sideNavWidth() + "px" }} class="transition-[margin]">
            {props.children}
         </div>
      </>
   )
}
