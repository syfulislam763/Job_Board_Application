
import api from "@/lib/axios"

export const authApi = {
  login: (payload: { email: string; password: string }) =>
    api.post("/auth/login", payload),

  signup: (payload: { email: string; password: string }) =>
    api.post("/auth/signup", payload),
}