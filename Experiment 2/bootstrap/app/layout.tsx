import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata = {
  title: 'ShopEase | E-Commerce',
  description: 'Sample e-commerce website using Next.js and Bootstrap',
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
