import { For, createSignal, Show, JSXElement, onMount, createEffect, onCleanup } from "solid-js"
import { A } from "solid-start"
import { IconTypes } from "solid-icons"
import {
   TiHomeOutline,
   TiCogOutline,
   TiDocument,
   TiUserOutline,
   TiThLargeOutline,
   TiChevronRight,
   TiThMenu,
} from "solid-icons/ti"
import { HiOutlineMenuAlt2, HiSolidMenuAlt2 } from "solid-icons/hi"

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
   { name: "Home", icon: TiHomeOutline, href: "/", childrenList: [] },
   { name: "Dashboard", icon: TiThLargeOutline, href: "/", childrenList: [] },
   {
      name: "Manuscript",
      icon: TiDocument,
      href: "/",
      childrenList: [
         { name: "Chapter 1", href: "manuscript/chapter-1" },
         { name: "Chapter 2", href: "manuscript/chapter-2" },
         { name: "Chapter 3", href: "manuscript/chapter-3" },
         { name: "Chapter 4", href: "manuscript/chapter-4" },
      ],
   },
   { name: "Characters", icon: TiUserOutline, href: "/", childrenList: [] },
   { name: "Settings", icon: TiCogOutline, href: "/", childrenList: [] },
]

const SideLink = ({ item }: { item: ListType }) => {
   const [openSubMenu, setOpenSubMenu] = createSignal(false)
   // const [isShown, setIsShown] = createSignal(false)

   const hasChildren = item.childrenList.length

   const toggleSubMenu = () => setOpenSubMenu((prev) => !prev)

   return (
      <li class="relative">
         <div
            // onMouseEnter={() => hasChildren && !open() && setIsShown(true)}
            // onMouseLeave={() => hasChildren && !open() && setIsShown(false)}
            class="flex items-center rounded-xl text-slate-700 hover:text-black hover:bg-slate-200"
         >
            <A href={item.href} class="flex items-center w-full ">
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
                  class={` ${openSubMenu() ? "-rotate-90" : "rotate-90"} px-3 text-xl transition-all`}
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
      </li>
   )
}

const SubMenu = ({ item }: { item: ListType }) => {
   return (
      <For each={item.childrenList}>
         {(el) => (
            <li>
               <A href={el.href} class="rounded-xl text-slate-700 block hover:text-black hover:bg-slate-200 px-3 py-1">
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
            class="fixed left-0 top-0 bottom-0 bg-white p-2 transition-all z-50"
         >
            <ul class="space-y-1 flex flex-col h-full mt-20">
               <For each={navList}>{(item) => <SideLink item={item} />}</For>
            </ul>

            <button
               onClick={() => setOpen((prev) => !prev)}
               class="absolute top-0 right-0 translate-x-full text-xl p-2 rounded-xl text-slate-700 hover:text-black"
            >
               <HiSolidMenuAlt2 class="text-2xl" />
            </button>
         </div>

         <div
            style={{ "margin-left": mobileScreen() ? 0 : sideNavWidth() + "px" }}
            class="overflow-scroll transition-[margin]"
         >
            {props.children}
         </div>
      </>
   )
}
