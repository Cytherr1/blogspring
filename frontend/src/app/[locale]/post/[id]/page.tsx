"use client";
import EditPostcard from '@/src/components/editpostcard';
import Postcard from '@/src/components/postcard'
import Page from '@/src/components/ui/page'
import { AuthContext } from '@/src/contexts/auth'
import { redirect } from '@/src/i18n/routing';
import { PostDataType } from '@/src/lib/types'
import { Stack } from '@mantine/core';
import ky from 'ky';
import { useLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { useContext, useEffect, useState } from 'react'

export default function page() {

  const locale = useLocale()
  const auth = useContext(AuthContext);
  const [data, setData] = useState<PostDataType>({id: 1, message:"", userid: ""})

  useEffect(() => {
    async function fetchData() {
      const id = window.location.pathname.split('/')[3];
      try {
        const response = await ky.get(`http://localhost:8080/posts/getPost?id=${id}`).json() as PostDataType
        setData(response)
      } catch (error) {
        redirect({href: "/", locale})
      }
    }
    fetchData();
  }, [data])

  return (
    <Page>
      <Stack align='center' justify='center' p="lg" w="100%">
        {
          auth === data.userid ?
          <EditPostcard post={data}/> :
          <Postcard post={data}/>
        }
      </Stack>
    </Page>
  )
}

