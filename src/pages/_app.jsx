
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@material-tailwind/react";
import LayoutClient from "@/layouts/client";
import LayoutAdmin from "@/layouts/admin";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const { pathname } = useRouter();
  const isAdminRoute = pathname.includes("/admin");

  const Layout = isAdminRoute ? LayoutAdmin : LayoutClient;

  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
}
