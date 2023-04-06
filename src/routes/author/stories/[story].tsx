import { Outlet } from "solid-start"
import SingleStoryLayout from "~/components/sections/SingleStoryLayout"

export default function StoryLayout() {
   return (
      <>
         <SingleStoryLayout>
            <Outlet />
         </SingleStoryLayout>
      </>
   )
}
