"use client";
import Postcard from "@/src/components/postcard";
import Page from "@/src/components/ui/page";
import { Link } from "@/src/i18n/routing";
import { PostDataType } from "@/src/lib/types";
import { Button, Stack } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function Home() {

  const [data, setData] = useState<PostDataType[]>([]);

  useEffect(() => {
    setData([{ id: 1, message: "hi, hello, hola soy dora", author: "Dora" }, { id: 1, message: "hi, hello, hola soy dora", author: "Dora" }])
  }, [])

  return (
    <Page>
      <Stack align="center" justify="start" w="100%" p="lg">
        <Button component={Link} href="/createpost" variant="default" rightSection={<IconPlus size={14} />}>Create post</Button>
        {
          data.map((post, k) => 
            <Postcard key={k} post={post}/>
          )
        } 
      </Stack>
    </Page>
  );
}
