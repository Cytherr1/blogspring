"use client";
import Page from "@/src/components/ui/page";
import { PostSchema } from "@/src/lib/schema";
import { Button, Group, Stack, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";

export default function page() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      message: '',
    },
    validate: zodResolver(PostSchema)
  });

  return (
    <Page>
      <Stack w="100%" justify="center" align="center">
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
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