import { RegisterFlow } from "@/components/auth";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;
  const presetRole =
    role === "professional" || role === "consumer" ? role : undefined;

  return <RegisterFlow presetRole={presetRole} />;
}
