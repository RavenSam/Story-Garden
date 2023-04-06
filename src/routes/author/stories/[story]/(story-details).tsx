import { RouteDataArgs, useParams } from "solid-start"
import { createServerData$ } from "solid-start/server"

export default function Story() {
   const params = useParams<{ story: string }>()

   return (
      <>
         <h1>overview</h1>
      </>
   )
}
