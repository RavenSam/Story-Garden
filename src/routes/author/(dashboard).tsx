import { createServerData$ } from "solid-start/server"
import DashboardSection from "~/components/sections/DashboardSection"
import { getStories } from "~/server/db/story"

export const routeData = () => {
   return createServerData$(async (_, { request }) => {
      try {
         return await getStories(request, 3)
      } catch (error) {
         console.log(error)
         throw error
      }
   })
}

export default function Dashboard() {
   return <DashboardSection />
}
