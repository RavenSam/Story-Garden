import { Meta, Title } from "solid-start"
import CommingSoon from "~/components/ui/CommingSoon"

export default function Stories() {
   return (
      <>
         <Title>All Stories | Story Garden - Organize and Write Your Stories</Title>
         <Meta
            name="description"
            content="Browse and manage all your stories on Story Garden, the platform that lets you write and structure your stories. Organize your stories and keep track of your progress easily. Start writing now!"
         />

         <CommingSoon title="All Stories" />
      </>
   )
}
