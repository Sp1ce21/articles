import { fetchCurrentUser } from "@/api/user";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await fetchCurrentUser();

  if (!user || user.role !== "ADMIN") {
    return <h1 className="mt-[60px]">Oops! Access denied.</h1>;
  }

  return <>{children}</>;
}
