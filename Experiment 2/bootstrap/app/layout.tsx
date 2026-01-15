import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata = {
  title: 'Experiment 1 - Bootstrap UI',
  description: 'Designing UI using Bootstrap components in Next.js',
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
