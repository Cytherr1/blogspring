import {z} from "zod";

const PostSchema = z.object({
  message: z.string().min(10, { message: "message needs to be at least 15 characters long." }).max(300, { message: "message cannot exceed 300 characters." }),
});

const LoginSchema = z.object({
  username: z.string().min(8).max(15),
  password: z.string().min(8).max(12)
})

export { PostSchema, LoginSchema};