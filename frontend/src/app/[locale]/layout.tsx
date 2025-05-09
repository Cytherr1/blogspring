import type { Metadata } from "next";
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/src/i18n/routing';
import "@mantine/core/styles.css";
import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";
import { AuthProvider } from "@/src/contexts/auth";

export const metadata: Metadata = {
  title: "BlogSpring",
  description: "A blog project developed with Next.js and Spring Boot",
};

export default async function LocaleLayout({
  children,
  params
} : {
  children: React.ReactNode;
  params: { locale: string }

}) {
  const {locale} = await params
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={ locale } {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript/>
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <MantineProvider>
            <AuthProvider>
              <Navbar/>
                {children}
              <Footer/>
            </AuthProvider>
          </MantineProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
