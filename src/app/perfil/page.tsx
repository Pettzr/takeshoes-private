'use client'

import PurchaseHistory from "@/src/ui/components/PurchaseHistory";
import { useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const queryClient = useQueryClient();

      const handleSignOut = async () => {
        await signOut({redirect: false});
        queryClient.invalidateQueries({ queryKey: ['cart-icon'] });
        router.push('/');
      }

    return (
        <div className="flex w-screen min-h-full">
            <main className="w-screen flex flex-col justify-center items-center">
                    <button onClick={handleSignOut} className="text-white w-[100px] p-2 bg-[#3a0ca3] mt-[20px]">Logout</button>
                    <PurchaseHistory/>
            </main>
        </div>
    )
}