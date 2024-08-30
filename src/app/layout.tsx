import '../components/ui/global.css';
import { inter } from '@/components/ui/fonts';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Rating Dashboard',
  description: 'Bellolae Rating Website Dashboard, built with App Router.',
  metadataBase: new URL('https://rating-app-flax.vercel.app/'),
};
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
