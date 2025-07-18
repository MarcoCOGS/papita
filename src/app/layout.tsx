import { Teko } from "next/font/google";
import "./globals.css";

const teko = Teko({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-teko',
});

export const metadata = {
  title: 'Papita - asesorías online',
  description: 'Transforma tu cuerpo con nuestro equipo',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${teko.variable}`}>
      <body className="font-teko antialiased">
        {children}
      </body>
    </html>
  );
}
