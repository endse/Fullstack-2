// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'ToDo App',
  description: 'Simple ToDo List',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
