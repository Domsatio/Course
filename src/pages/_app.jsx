
import "@/styles/globals.css";
import { useRouter } from "next/router";
// import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@material-tailwind/react";
import LayoutClient from "@/layout/client";
import LayoutAdmin from "@/layout/admin";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  if (
    router.pathname.includes("/admin")
  )
    return (
      <SessionProvider session={session}>
        <ThemeProvider>
          <LayoutAdmin>
            <Component {...pageProps} />
          </LayoutAdmin>
        </ThemeProvider>
      </SessionProvider>
    );
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <LayoutClient>
          <Component {...pageProps} />
        </LayoutClient>
      </ThemeProvider>
    </SessionProvider>
  );
}
