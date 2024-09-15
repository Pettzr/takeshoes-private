'use client'

import PurchaseHistory from "@/src/ui/client/PurchaseHistory";
import { useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";

export default function Page() {
    const router = useRouter();
    const queryClient = useQueryClient();

      const handleSignOut = async () => {
        await signOut({redirect: false});
        queryClient.invalidateQueries({ queryKey: ['cart-icon'] });
        router.push('/');
      }

    return (
        <div className="flex flex-col w-screen min-h-screen">
              <div className="flex justify-end mr-1/20 items-center mt-[30px] ">
                <div className="flex border-2 rounded-xl p-4">
                  <FaUser color="black" size={50} />
                  <button onClick={handleSignOut} className="text-white h-[30px] w-[100px] text-sm rounded bg-black ]">Deslogar</button>
                </div>
              </div>
              <PurchaseHistory/>
        </div>
    )
}