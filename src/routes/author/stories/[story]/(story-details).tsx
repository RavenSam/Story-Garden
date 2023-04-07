import { Meta, RouteDataArgs, Title, useRouteData } from "solid-start"
import { createServerData$ } from "solid-start/server"
import { getStory } from "~/server/db/story"

export const routeData = ({ params }: RouteDataArgs) => {
   return createServerData$(
      async ([, slug], { request }) => {
         try {
            return await getStory(request, slug)
         } catch (error) {
            console.log(error)
            throw error
         }
      },
      { key: () => ["slug", params.story] }
   )
}

export default function Story() {
   const story = useRouteData<typeof routeData>()

   return (
      <>
         <Title>{story()?.title} | Story Garden</Title>
         <Meta name="description" content={`Read ${story()?.title} | ${story()?.synopsis} `} />

         <h1>overview {story()?.title}</h1>
      </>
   )
}
