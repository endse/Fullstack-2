import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MUI Component Dashboard',
  description: 'Material UI Components Demo using Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
