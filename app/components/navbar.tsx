"use client";

import { signIn, signOut, useSession } from "next-auth/react"; 
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
    const { data: session } = useSession();
    const router = useRouter();
    const [currentPath, setCurrentPath] = useState('/');
    
    // Update current path for background color
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentPath(window.location.pathname);
        }
    }, []);

    return (
        <div className={`${currentPath === '/' ? 'bg-muted' : 'bg-black'} top-0 z-50 w-full left-0 right-0 absolute py-3`}>
            <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center">
                {/* Logo Section */}
                <div className="flex justify-between items-center w-full md:w-auto">
                    <div className="text-xl md:text-2xl flex items-center text-white font-extrabold"> 
                        {/* <span>
                            <img src="logo.png" alt="logo" className="w-36 rounded-full" />
                        </span>  */}
                        <button onClick={() => router.push('/')}>
                            FitFrame
                        </button>
                    </div>
                    
                    {/* Sign In/Out Button for mobile */}
                    <div className="md:hidden">
                        {session?.user ? (
                            <button className="px-4 py-1.5 text-xs text-white font-semibold bg-[#1a1a1a] rounded-full border border-[#333] shadow-black/50 hover:bg-[#222] transition-all" onClick={() => signOut()}>Sign out</button>
                        ) : (
                            <button className="px-4 py-1.5 text-xs text-white font-semibold bg-[#1a1a1a] rounded-full border border-[#333] shadow-md shadow-black/50 hover:bg-[#222] transition-all" onClick={() => signIn("google")}>Sign in</button>
                        )}
                    </div>
                </div>
                
                {/* Navigation Options - Visible on all devices */}
                <div className="flex flex-wrap justify-center w-full mt-4 md:mt-0 md:justify-center md:ml-8 ">
                    <button onClick={() => router.push('/dashboard')} className="mx-5 my-1 text-sm lg:text-base text-white hover:text-gray-400">Dashboard</button>
                    <button onClick={() => router.push('/guide')} className="mx-5 my-1 text-sm lg:text-base text-white hover:text-gray-400">Guide</button>
                    <button onClick={() => router.push('/diet')} className="mx-5 my-1 text-sm lg:text-base text-white
                     hover:text-gray-400">Diet Plans</button>
                    <button onClick={() => router.push('/exercise')} className="mx-5 my-1 text-sm lg:text-base text-white hover:text-gray-400">Exercise</button>
                    <button onClick={() => router.push('/')} className="mx-5 my-1 text-sm lg:text-base text-white hover:text-gray-400">Pricing</button>
                </div>
                
                {/* Sign In/Out Button for desktop */}
                <div className="hidden md:flex md:ml-auto">
                    <button 
                        className="w-[100px] px-2 py-1.5 text-white/100 font-semibold bg-[#1a1a1a] rounded-full border border-[#333] shadow-black/50 hover:bg-[#222] transition-all shadow-inner-xl flex items-center justify-center"
                        onClick={() => session?.user ? signOut() : signIn("google")}
                    >
                        {session?.user ? "Sign out" : "Sign in"}
                    </button>
                </div>

            </div>
        </div>
    );
}