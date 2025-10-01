import './global.scss';

export const metadata = {
  title: 'MyBoard - Customizable Widget Dashboard',
  description: 'A modular productivity dashboard that loads widgets as Web Components from any framework',
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
