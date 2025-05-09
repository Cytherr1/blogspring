"use client";

import Postcard from "@/src/components/postcard";
import Page from "@/src/components/ui/page";
import { AuthContext } from "@/src/contexts/auth"
import { PostDataType } from "@/src/lib/types";
import { Stack, Text } from "@mantine/core";
import ky from "ky";
import { useContext, useEffect, useState } from "react"

export default function page() {

  const [data, setData] = useState<PostDataType[]>([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await ky.get(`http://localhost:8080/posts/getUserPosts?userid=${localStorage.getItem("userId")}`).json() as PostDataType[]
        setData(response)
      } catch (error) {
        alert(error)
      }
    }
    fetchData();
  }, []);

  return (
    <Page>
      {
        auth ?
        <Stack p="lg" w="100%">
          <Text>Welcome back {auth}!</Text>
          <Stack align="center" justify="center" w="100%" dir="column">
            <Text>Edit or delete posts: </Text>
            {data.map((post, i) => (
              <Postcard key={i} post={post}/>
            ))}
          </Stack>
        </Stack> 
        :
        <Text>You dont have permission to see this page.</Text>
      }
    </Page>
  )
}