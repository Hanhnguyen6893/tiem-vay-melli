import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Melli Vintage Soul - Thanh l\u1ecbch ho\u00e0i c\u1ed5',
  description: 'Ti\u1ec7m \u0111\u1ed3 ho\u00e0i c\u1ed5 Melli Vintage Soul',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#FAF8F5' }}>
        {children}
      </body>
    </html>
  );
}
