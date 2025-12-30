import "./globals.css";

export const metadata = {
  title: "PinkSync Accessibility Validator",
  description: "Deaf-First Accessibility Automation - Part of MBTQ Ecosystem",
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
