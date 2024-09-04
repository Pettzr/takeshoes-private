"use client";

import Form from "@/src/ui/components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";


function VerifiedChangePassoword () {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token =  searchParams?.get("token");
    const email = searchParams?.get("email")
    const [formData, setFormData] = useState({password: '', confirmPassword: ''})
    const fields = [
        { type: 'password', label: 'Senha', placeholder: 'Digite sua senha', name: 'password' },
        { type: 'password', label: 'Confirmar a Senha', placeholder: 'Confirme sua senha', name: 'confirmPassword' }
    ]


    useEffect(() => {

        const register = async () => {
            try {
                const response = await fetch(`/api/user/change-password-verified?token=${token}&email=${email}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                const data = await response.json();
                if (response.ok) {
                    console.log('Email verified', data);
                    alert('Email verificado com sucesso!');
                } else {
                    console.error('Error ao verificar email:', data);
                    alert('Error ao verificar email: ' + data.error);
                    router.push('/');
                }
            } catch (error) {
                console.error('Erro inesperado', error);
                router.push('/');
            }
        };

        register();
    }, [ router, token, email]);


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = event.target;
            setFormData((prev) => ({
                ...prev,
                [name]: value,
        }))
    }
    


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword){
            alert("Senhas não coincidem")
            return
        }

        try {
            const response = await fetch('/api/user/new-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: email, password: formData.password}),
            });
            
            const data = await response.json();
            if (response.ok) {
                console.log('Sua senha foi alterada com sucesso', data);
                alert('Sua senha foi alterada com sucesso!')
            } else {
                console.error('Erro ao alterar a senha:', data);
                alert('Erro ao alterar a senha' + data.details)
            }

        } catch (error) {
            console.error('Erro inespereado', error);
        }
    }

    return(
        <div className="flex flex-col w-full items-center justify-center">
            <div className="text-white flex flex-col items-center mb-[20px]">
                <h1>Digite sua nova senha.</h1>
            </div>
            <Form fields={fields} onChange={handleInputChange} onSubmit={handleSubmit} />
        </div>
    )
}

export default function Page() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <VerifiedChangePassoword />
      </Suspense>
    );
  }