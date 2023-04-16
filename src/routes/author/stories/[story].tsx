import { ErrorBoundary, Outlet } from "solid-start"
import ErrorFallback from "~/components/errors/ErrorFallback"
import SingleStoryLayout from "~/components/sections/SingleStoryLayout"

export default function StoryLayout() {
   return (
      <>
         <SingleStoryLayout>
            <ErrorBoundary fallback={(e) => <ErrorFallback e={e} />}>
               <Outlet />
            </ErrorBoundary>
         </SingleStoryLayout>
      </>
   )
}
