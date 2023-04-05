import { RouteDataArgs, useParams } from "solid-start"
import { createServerData$ } from "solid-start/server"
import SingleStoryLayout from "~/components/sections/SingleStoryLayout"

export const routeData = ({ params }: RouteDataArgs) => {
   return createServerData$(async (_, { request }) => {
      const storySlug = params

      console.log({ storySlug, name: "name" })

      return storySlug
   })
}

export default function Story() {
   const params = useParams<{ story: string }>()

   return (
      <>
         <SingleStoryLayout />
      </>
   )
}
