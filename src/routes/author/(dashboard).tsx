import { FormError } from "solid-start"
import { createServerAction$ } from "solid-start/server"
import DashboardSection from "~/components/sections/DashboardSection"
import { createStory } from "~/server/db/story"

function checkFields(form: FormData) {
   const title = form.get("title")
   const description = form.get("description")

   if (typeof title === "string" && typeof description === "string") {
      return { title, description }
   }
   throw new FormError(`Form not submitted correctly.`)
}

export default function Dashboard() {
   const [enrolling, { Form }] = createServerAction$(async (form: FormData, { request }) => {
      const fields = await checkFields(form)
      try {
         const story = await createStory(request, fields)
         return { story }
      } catch (error: any) {
         console.log(error)
      }
   })
   return <DashboardSection />
}
