import { Match, Switch } from "solid-js"

export default ({ e }: { e: any }) => {
   console.log(e)

   return (
      <div class="flex items-center justify-center h-full w-full min-h-[100px]">
         <Switch fallback={<div>{e.message}</div>}>
            <Match when={e.message === "NetworkError when attempting to fetch resource."}>
               <h2>Network Error</h2>
            </Match>

            <Match when={e.message === "chapter not found"}>
               <h2>chapter not found</h2>
            </Match>
         </Switch>
      </div>
   )
}
