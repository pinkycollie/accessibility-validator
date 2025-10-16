import "./globals.css";

export const metadata = {
  title: "Hybrid Multi-Project Backend",
  description: "Modular backend for multiple projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
