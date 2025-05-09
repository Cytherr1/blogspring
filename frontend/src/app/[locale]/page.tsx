"use client";

import { useEffect, useState } from "react";
import { Button, Stack, Card, Text, Divider } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Postcard from "@/src/components/postcard";
import Page from "@/src/components/ui/page";
import { Link } from "@/src/i18n/routing";
import { PostDataType } from "@/src/lib/types";
import { useTranslations } from 'next-intl';

export default function Home() {
  const [data, setData] = useState<PostDataType[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const t = useTranslations('home'); // Section name: 'home'

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
        setData(formatted.sort((a: PostDataType, b: PostDataType) => b.id - a.id));
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
            {t('createPost')}
          </Button>
        )}
        {data.map((post, index) => (
          <Card
            key={index}
            shadow="sm"
            padding="lg"
            style={{ width: "100%", marginBottom: "15px" }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 500 }}>{post.author}</Text>
            </div>
            <Divider my="xs" />
            <Text size="sm" color="dimmed">
              {post.message}
            </Text>
          </Card>
        ))}
      </Stack>
    </Page>
  );
}
