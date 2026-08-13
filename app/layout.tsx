import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InkweCham — Move Without Limits",
  description: "KHESH-powered AI business operating platform.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
