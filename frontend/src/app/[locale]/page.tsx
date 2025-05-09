"use client";
import { useContext, useEffect, useState } from "react";
import { Button, Stack, Card, Text, Divider } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Postcard from "@/src/components/postcard";
import Page from "@/src/components/ui/page";
import { Link } from "@/src/i18n/routing";
import { PostDataType } from "@/src/lib/types";
import ky from "ky";
import { AuthContext } from "@/src/contexts/auth";

export default function Home() {
  const [data, setData] = useState<PostDataType[]>([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await ky.get("http://localhost:8080/posts/getAllPosts").json() as PostDataType[]
        setData(response)
      } catch (error) {
        alert(error)
      }
    }
    fetchData();
  }, []);

  return (
    <Page>
      <Stack align="center" justify="start" w="100%" p="lg">
        {
          auth ?
          <Button
            component={Link}
            href="/createpost"
            variant="default"
            rightSection={<IconPlus size={14} />}
          >
            Create post
          </Button> :
          <Text>Only users can create posts <Link href="/login">login</Link></Text>
        }
        {data.map((post, i) => (
          <Postcard key={i} post={post}/>
        ))}
      </Stack>
    </Page>
  );
}
