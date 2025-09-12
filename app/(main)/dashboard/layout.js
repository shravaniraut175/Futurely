import { Suspense } from "react";
import { BarLoader } from "react-spinners";

export default function Layout({ children }) {
  return (
    // <div className="px-5">
    //   <div className="flex items-center justify-between mb-5">
    //     <h1 className="pt-25 px-10 text-6xl font-bold gradient-title">Industry Trends & Insights</h1>
     <div className="justify-between items-center gap-4">
        <h1 className="px-20 pt-25 pb-5 font-extrabold text-4xl md:text-6xl bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-400 text-transparent bg-clip-text drop-shadow-lg">
         Industy Trends and Insights
        </h1>
      <Suspense fallback={<BarLoader className="mt-4" width={"100%"} color="gray" />}>
        {children}
      </Suspense>
    </div>
  );
}