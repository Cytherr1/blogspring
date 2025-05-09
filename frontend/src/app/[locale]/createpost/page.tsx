"use client";
import Page from "@/src/components/ui/page";
import { redirect } from "@/src/i18n/routing";
import { PostSchema } from "@/src/lib/schema";
import { PostDataType } from "@/src/lib/types";
import { Button, Group, Stack, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import ky from "ky";
import { useLocale } from "next-intl";

export default function page() {

  const locale = useLocale()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      message: '',
      userid: localStorage.getItem("userId")
    },
    validate: zodResolver(PostSchema)
  });

  async function handleSubmit(formData : any) {
    try {
      const json = await ky.post('http://localhost:8080/posts/createPost', {json: formData}).json();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Page>
      <Stack w="100%" justify="center" align="center">
        <form onSubmit={form.onSubmit(async (values) => {
          await handleSubmit(values); 
          redirect({href: "/", locale});
        })}>
          <Textarea
            w="400px"
            resize="vertical"
            label="Message"
            key={form.key('message')}
            {...form.getInputProps('message')}
          />

          <Group justify="flex-end" mt="md">
            <Button variant="default" type="submit">Submit</Button>
          </Group>
        </form>
      </Stack>
    </Page>
  )
}