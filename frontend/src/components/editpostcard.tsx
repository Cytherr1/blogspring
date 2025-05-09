import { Button, Card, Group, Text, Textarea } from "@mantine/core"
import { Link, redirect } from "../i18n/routing"
import { PostDataType } from "../lib/types"
import ky from "ky"
import { useState } from "react"
import { useLocale } from "next-intl"

export default function EditPostcard({ post } : { 
  post : PostDataType }) {

  const locale = useLocale()
  const [message, setMessage] = useState(post.message)

  return (
    <Card shadow="sm" w="500px" mah="40vh" padding="lg" radius="md" withBorder component={Link} href={`/post/${post.id}`}>
      <Textarea fw={500} value={message} onChange={(e) => {setMessage(e.target.value); console.log(message)}}/>
      <Group justify="space-between" mt="md" mb="xs">
        <Text size="sm" c="dimmed">{post.userid}</Text>
      </Group>
      <Group justify="flex-end" w="100%">
        <Button variant="default" onClick={ async () => { await ky.put(`http://localhost:8080/posts/editPost?id=${post.id}`, {json: { message: message }})}}>edit</Button>
        <Button variant="default" onClick={ async () => { await ky.delete(`http://localhost:8080/posts/deletePost?id=${post.id}`); redirect({href: "/", locale})}}>delete</Button>
      </Group>
    </Card>
  )
}