import { ErrorBoundary, Meta, RouteDataArgs, Title, useRouteData } from "solid-start"
import { createServerData$, redirect } from "solid-start/server"
import Editor from "~/components/Editor"
import ErrorFallback from "~/components/errors/ErrorFallback"
import { getChapter } from "~/server/db/story"

export const routeData = ({ params }: RouteDataArgs) => {
   return createServerData$(
      async ([, id], { request }) => {
         try {
            return await getChapter(request, id)
         } catch (error: any) {
            console.log(error)
            throw error
         }
      },
      { key: () => ["id", params.chapter] }
   )
}

export default function Chapter() {
   const chapter = useRouteData<typeof routeData>()

   console.log(chapter())
   return (
      <>
         <ErrorBoundary fallback={(e) => <ErrorFallback e={e} />}>
            <Title>{chapter()?.title} | Story Garden</Title>
            <Meta name="description" content={"Chapter.excerpt"} />

            <div class="p-2">
               <Editor chapter={chapter} />
            </div>
         </ErrorBoundary>
      </>
   )
}
