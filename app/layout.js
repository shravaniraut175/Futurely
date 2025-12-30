import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import Header from "../components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { checkUser } from "@/lib/checkUser";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Futurely",
  description: "AI-powered career companion",
};

export default async function RootLayout({ children }) {
  await checkUser();
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"           //system
            enableSystem
            disableTransitionOnChange
          >
            {/* header */}
            <Header></Header>
            <main className="min-h-screen">
              {children}
            </main>

              <div className="border-t border-gray-700 mt-10 text-violet-950">
                <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                  <p>© {new Date().getFullYear()} Futurely. All rights reserved</p>
                </div>
              </div>
  
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}