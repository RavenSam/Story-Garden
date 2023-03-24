import { Outlet } from "solid-start"

export default function AuthorLayout() {
   return (
      <>
         <div class="bg-slate-100">
            <Outlet />
         </div>
      </>
   )
}
