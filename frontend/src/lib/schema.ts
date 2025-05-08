import {z} from "zod";

const PostSchema = z.object({
  message: z.string().min(15, { message: "message needs to be at least 15 characters long." }).max(300, { message: "message cannot exceed 300 characters." }),
});

export { PostSchema };