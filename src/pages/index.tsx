import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ClientView from "@/views/client";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <ClientView />
  );
}
