"use client";

import { useEffect, useState } from "react";
import { Button, Stack } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Postcard from "@/src/components/postcard";
import Page from "@/src/components/ui/page";
import { Link } from "@/src/i18n/routing";
import { PostDataType } from "@/src/lib/types";

export default function Home() {
  const [data, setData] = useState<PostDataType[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const locale = window.location.pathname.split("/")[1];
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);

    fetch(`http://localhost:8080/${locale}/posts`)
      .then((res) => res.json())
      .then((postsFromDb) => {
        const formatted = postsFromDb.map((p: any) => ({
          id: p.id,
          message: p.message,
          author: p.userid,
        }));
        setData(formatted);
      });
  }, []);

  return (
    <Page>
      <Stack align="center" justify="start" w="100%" p="lg">
        {userId && (
          <Button
            component={Link}
            href="/createpost"
            variant="default"
            rightSection={<IconPlus size={14} />}
          >
            Create post
          </Button>
        )}
        {data.map((post, index) => (
          <Postcard key={index} post={post} />
        ))}
      </Stack>
    </Page>
  );
}
