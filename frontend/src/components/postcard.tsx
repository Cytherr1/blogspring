import { Badge, Button, Card, Group, Text } from "@mantine/core"
import { Link } from "../i18n/routing"
import { PostDataType } from "../lib/types"

export default function Postcard({ post } : { 
  post : PostDataType }) {

  return (
	  <Card shadow="sm" mah="15vh" padding="lg" radius="md" withBorder component={Link} href={`post/${post.id}`}>
      <Text fw={500}>
        {post.message}
      </Text>
      <Group justify="space-between" mt="md" mb="xs">
        <Text size="sm" c="dimmed">{post.author}</Text>
      </Group>
    </Card>
  )
}