import { Outlet } from "solid-start"

export default function AuthorLayout() {
   return (
      <>
         <div class="bg-slate-200">
            <Outlet />
         </div>
      </>
   )
}
