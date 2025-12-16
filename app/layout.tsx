import "./globals.css";

export const metadata = {
  title: "Developer Magician - Next-Gen AI Developer Agent",
  description: "Autonomous AI-powered developer agent for workflow automation and intelligent task orchestration. Part of the 360 Magicians ecosystem.",
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
