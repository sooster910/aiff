export type LoginForm = {
  email: string
  password: string
}


export const AuthorizationRole = {
  "ADMIN": "admin",
  "MEMBER": "member",
  "GUEST": "guest"
} as const 

export const RedirectUrlByRole = {
  "admin": "/adminDashboard",
  "member":"/booking"
} as const