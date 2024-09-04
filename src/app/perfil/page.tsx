'use client'

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

      const handleSignOut = async () => {
        await signOut({redirect: false});
        router.push('/');
      }

    return (
        <div className="flex h-screen">
            <div className="flex-1 flex flex-col">
                <main className="w-full h-screen flex justify-center items-center">
                    <button onClick={handleSignOut} className="text-white w-[100px] p-2 bg-[#3a0ca3]">Logout</button>
                </main>
            </div>
        </div>
    )
}