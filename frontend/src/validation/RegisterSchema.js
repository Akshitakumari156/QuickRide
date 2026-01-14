import {z} from "zod"
export const registerSchema=z.object({
  firstname:z.string().min(2,"First name should be at least two characters"),
  lastname:z.string().min(2,"Last name should be at least two characters"),
  email:z.string().email("invalid email address"),
  password:z.string().min(6,"password should be atleast 6 letters")
})