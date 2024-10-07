import { useRouter } from "next/router";
import ComplexNavbar from "@/components/client/navbar";
import { Footer } from "@/components/client/footer";
import { ChatPopover } from "@/components/client/Chat";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const { pathname } = useRouter();

  const noNavPaths = ["/sign-in", "/register", "/404", "/forgot-password"];
  const isPathCourse = pathname.includes("/course");

  const isAuthRoute = noNavPaths.some(path => pathname.startsWith(path));

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <ComplexNavbar />
      {children}
      {isPathCourse ? <ChatPopover /> : null}
      <Footer />
    </div>
  );
}
