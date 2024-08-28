import { useSession } from "next-auth/react";
import ClientView from "@/views/client";

export default function Home() {
  return (
    <ClientView />
  );
}
