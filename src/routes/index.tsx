import { createServerData$ } from "solid-start/server"
import Input from "~/components/ui/Input"
import { db } from "~/server/db"

export const routeData = () => {
   return createServerData$(async (_, { request }) => {
      try {
         const user = await db.user.create({ data: { email: "kody@mail.com", penName: "kody", salt: "wowo" } })
         console.log(user)
      } catch (error) {
         console.log(error)
      }
   })
}

export default function Home() {
   return (
      <div class="h-screen flex items-center justify-center flex-col">
         <h1 class="text-5xl font-bold">Welcome</h1>

         <div class="flex justify-center flex-col w-96 mx-auto">
            <Input name="uername" label="Username" wrapperClass="my-10" />
            <Input name="email" label="Password" type="password" />
         </div>
      </div>
   )
}
