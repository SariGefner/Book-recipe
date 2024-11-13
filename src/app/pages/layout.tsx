import NavBar from "@/app/components/navbar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
          
        {children}
      </body>
    </html>
  );
}
