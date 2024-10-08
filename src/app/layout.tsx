import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VOID Sistema De Administracion",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
