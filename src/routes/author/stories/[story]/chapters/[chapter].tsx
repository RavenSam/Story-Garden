import { Meta, Title } from "solid-start"
import Editor from "~/components/Editor"

export default function Chapter() {
   return (
      <>
         <Title>[Chapter] | Story Garden</Title>
         <Meta name="description" content={"Chapter.excerpt"} />

         <div class="p-2">
            <Editor />
         </div>
      </>
   )
}
