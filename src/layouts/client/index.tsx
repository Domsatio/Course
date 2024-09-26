import { useRouter } from "next/router";
import ComplexNavbar from "@/components/client/navbar";
import { Footer } from "@/components/client/footer";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const { pathname } = useRouter();

  const noNavPaths = ["/sign-in", "/register", "/404"];

  const isAuthRoute = noNavPaths.includes(pathname);

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <ComplexNavbar />
      {children}
      <Footer />
    </>
  );
}
