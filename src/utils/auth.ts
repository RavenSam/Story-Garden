import { createCookieSessionStorage } from "solid-start"
import { createSolidAuthClient } from "@solid-auth/core"

// From the .env file
const sessionSecret = import.meta.env.VITE_SESSION_SECRET
const baseUrl = import.meta.env.VITE_BASE_URL
const isProduction = import.meta.env.PROD

export const sessionStorage = createCookieSessionStorage({
   cookie: {
      name: "SG_session",
      secure: isProduction,
      secrets: [sessionSecret],
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
   },
})

// Create the Solid Auth Client So You Can Actually Manage The User From The Client Side
export const authClient = createSolidAuthClient(`${baseUrl}/api/auth`)
