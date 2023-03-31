import { User } from "@prisma/client"
import { ParentComponent } from "solid-js"
import { FormProps } from "solid-start"

export type EnrollingTypes = {
   pending: boolean
   input?: FormData | undefined
   result?: any
   error?: any
   clear: () => void
   retry: () => void
}

export interface ActionProps {
   enrolling: EnrollingTypes
   Form: ParentComponent<FormProps>
}

export type UserSession = Omit<User, "password" | "salt">
