"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <div className="top-0 z-50  flex justify-between text-white font-extrabold text-xl px-20 left-0 right-0 absolute  py-3">
            <div className="text-2xl flex  items-center justify-center"> <span><img src="logo.png" alt="logo" className="w-24 rounded-full" /></span> <button onClick={()=>router.push('/')} >FitFrame</button></div>
            <div className="flex items-center justify-center mr-52">
                <button onClick={()=>router.push('/dashboard')} className="mx-4 text-base text-gray-200 hover:text-gray-400">Dashboard</button>
                <button onClick={()=>router.push('/guide')} className="mx-4 text-base text-gray-200  hover:text-gray-400">Guide</button>
                <button onClick={()=>router.push('/diet')} className="mx-4 text-base text-gray-200  hover:text-gray-400">Diet Plans</button>
                <button onClick={()=>router.push('/exercise')} className="mx-4 text-base text-gray-200  hover:text-gray-400">Exercise Now</button>
                <button onClick={()=>router.push('/diet')} className="mx-4 text-base text-gray-200  hover:text-gray-400">Pricing</button>
            </div>
            <div className="text-2xl flex  items-center justify-center">
                {session?.user ? (
                    <button className="px-6 py-2 text-sm text-white font-semibold bg-[#1a1a1a] rounded-full border border-[#333] shadow-black/50 hover:bg-[#222] transition-all shadow-inner-xl" onClick={() => signOut()}>Sign out</button>
                ) : (
                    <button className="px-6 py-2 text-sm text-white font-semibold bg-[#1a1a1a] rounded-full border border-[#333] shadow-md shadow-black/50 hover:bg-[#222] transition-all" onClick={() => signIn("google")}>Sign in</button>
                )}
            </div>
        </div>
    );
}
