"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";


function CreateUserVerified() {
    const searchParams = useSearchParams();
    const session = useSession();
    const router = useRouter();

    const token =  searchParams?.get("token");
    const email = searchParams?.get("email")

    useEffect(() => {
        if (session.status === 'authenticated') {
            return router.push('/');
        }

        console.log('Rendering component');

        const register = async () => {
            try {
                const response = await fetch(`/api/user/create-user-verified?token=${token}&email=${email}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    console.log('User created', data);
                    alert('Usuário criado com sucesso!');
                    return router.push('/login');
                } else {
                    console.error('Error creating user:', data);
                    alert('Erro ao criar usuário: ' + data.error);
                    return router.push('/');
                }
                
            } catch (error) {
                console.error('Erro inesperado', error);
                router.push('/');
            }
        };

        register();
    }, [session, router, token, email]);


    return(
        ( 
        <div className="flex h-screen">
            <div className="flex-1 flex flex-col">
                <main className="w-full h-screen flex justify-center items-center">
                    <h1>Usuário cadastrado com sucesso.</h1>
                </main>
            </div>
        </div>
        )
    )
}

export default function Page() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <CreateUserVerified />
      </Suspense>
    );
  }