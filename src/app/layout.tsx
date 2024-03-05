import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from './providers';
import { AdminProvider } from '@/components/AdminContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simulaciones de Sistemas",
  description: "Simulaciones",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
            <AdminProvider>
              {children}
            </AdminProvider>
          </Providers>   
      </body>
    </html>
  );
}
