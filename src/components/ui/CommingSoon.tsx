export default function CommingSoon({ title }: { title: string }) {
   return (
      <div class="flex flex-col items-center justify-center min-h-screen space-y-3">
         <h1 class="text-3xl font-extrabold">{title}</h1>
         <p class="text-slate-700 font-thin">Comming Soon</p>
      </div>
   )
}
