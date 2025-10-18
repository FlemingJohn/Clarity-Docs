export default function ClarityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 w-full h-full overflow-hidden">{children}</main>
  );
}
