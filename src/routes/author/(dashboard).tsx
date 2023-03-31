import { createRouteAction, FormError } from "solid-start"
import { createServerAction$ } from "solid-start/server"
import CreateStory from "~/components/flow/CreateStory"
import CommingSoon from "~/components/ui/CommingSoon"
import { db } from "~/server/db"

function checkFields(form: FormData) {
   const title = form.get("title")
   const description = form.get("description")

   if (typeof title !== "string" && typeof description !== "string") {
      throw new FormError(`Form not submitted correctly.`)
   }

   return { title, description }
}

export default function Dashboard() {
   const [enrolling, { Form }] = createServerAction$(async (form: FormData) => {
      const fields = await checkFields(form)

      db.story.create({ data: { title: fields.title } })

      return { fields }
   })
   return (
      <>
         <CreateStory Form={Form} enrolling={enrolling} />
         <CommingSoon title="Dashboard" />
      </>
   )
}
