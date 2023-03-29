import Input from "~/components/ui/Input"

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
