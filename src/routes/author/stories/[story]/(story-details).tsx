import { useParams } from "solid-start"

export default function Story() {
   const params = useParams<{ story: string }>()

   return (
      <div class="w-full h-screen flex items-center justify-center">
         <h1 class="text-2xl  font-bold">Your Story {params.story}</h1>
      </div>
   )
}
