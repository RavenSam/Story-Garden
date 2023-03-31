import { FormError } from "solid-start"
import { createServerAction$ } from "solid-start/server"
import toast from "solid-toast"
import CreateStory from "~/components/flow/CreateStory"
import CommingSoon from "~/components/ui/CommingSoon"
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
   return (
      <>
         <CreateStory Form={Form} enrolling={enrolling} />
         <CommingSoon title="Dashboard" />
      </>
   )
}
