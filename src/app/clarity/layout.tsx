export default function ClarityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 w-full p-4 md:p-6 overflow-auto">{children}</main>
  );
}
