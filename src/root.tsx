// @refresh reload
import { Suspense } from "solid-js"
import { Body, ErrorBoundary, FileRoutes, Head, Html, Meta, Routes, Scripts, Title } from "solid-start"
import "../styles/root.css"
import { Toaster } from "solid-toast"
import SolidNProgress from "./components/ui/SolidNProgress"
import { AuthProvider } from "~/utils/authProvider"

export default function Root() {
   return (
      <Html lang="en">
         <Head>
            <Title>Story Garden</Title>
            <Meta charset="utf-8" />
            <Meta name="viewport" content="width=device-width, initial-scale=1" />
         </Head>
         <Body>
            <AuthProvider>
               <Toaster containerClassName="toaster" />

               <SolidNProgress />

               <ErrorBoundary>
                  <Suspense fallback={<div>Loading</div>}>
                     <Routes>
                        <FileRoutes />
                     </Routes>
                  </Suspense>
               </ErrorBoundary>
            </AuthProvider>
            <Scripts />
         </Body>
      </Html>
   )
}
