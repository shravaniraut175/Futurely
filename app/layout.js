import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import Header from "../components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { checkUser } from "@/lib/checkUser";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PragatiIQ",
  description: "Smart Pathways to Professional Success",
};

export default async function RootLayout({ children }) {
  await checkUser();
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}>
      <html lang="en" suppressHydrationWarning>
        <body className={` ${inter.className} `}>
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

            <Toaster richColors />
            {/* footer */}
            <footer className="bg-muted/50 py-12">
              <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

                <div className="container mx-auto px-4 text-gray-200">
                  <h2 className="text-2xl font-bold">PragatiIQ</h2>
                  <p className="mt-4 text-gray-300 text-sm leading-relaxed">
                    At <span className="font-semibold">PragatiIQ</span>, we harness the power of
                    Artificial Intelligence to empower job seekers and professionals. Our smart AI assistant
                    not only builds resumes but analyzes skill gaps, optimizes for specific roles, and
                    provides actionable insights to grow your career efficiently.
                  </p>
                </div>

                {/* <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
                    Contact Members
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm text-gray-300">
                    <li>
                      <span className="font-semibold">Pranjal Patil :</span>{" "}
                      <a href="mailto:pranjalpatil0705@gmail.com" className="hover:text-white transition-colors">
                        pranjal.236297208@vcet.edu.in
                      </a>
                    </li>
                    <li>
                      <span className="font-semibold">Shravani Raut :</span>{" "}
                      <a href="mailto:member2@gmail.com" className="hover:text-white transition-colors">
                        shravani.236327205@vcet.edu.in
                      </a>
                    </li>
                    <li>
                      <span className="font-semibold">Swara Save :</span>{" "}
                      <a href="mailto:member3@gmail.com" className="hover:text-white transition-colors">
                        swara.236367205@vcet.edu.in
                      </a>
                    </li>
                  </ul>
                </div> */}


                {/* <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
                    Our Principles
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-white rounded-full inline-block"></span>
                      Efficiency: Save time, reduce effort.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-white rounded-full inline-block"></span>
                      User-Focused: Simple, intuitive design.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-white rounded-full inline-block"></span>
                      Real Impact: Solve genuine professional problems.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-white rounded-full inline-block"></span>
                      Purposeful Innovation: AI that adds value.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-white rounded-full inline-block"></span>
                      Scalable & Integrable: Grow with you.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-white rounded-full inline-block"></span>
                      Measurable Results: Track productivity gains.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-white rounded-full inline-block"></span>
                      Privacy & Ethics: Protect your data.
                    </li>
                  </ul>

                </div>
              </div> */}
            </div>

              <div className="border-t border-gray-700 mt-10 text-violet-950">
                <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                  <p>© {new Date().getFullYear()} PragatiIQ. All rights reserved by StackNova.🌟</p>
                  <div className="flex gap-6 mt-3 md:mt-0">
                    <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
                    <a href="/contact" className="hover:text-white transition-colors">Help Center</a>

                  </div>
                </div>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}