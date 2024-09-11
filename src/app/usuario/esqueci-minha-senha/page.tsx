'use client'

import Form from "@/components/Form";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
    const fields = [
        { type: 'email', label: 'Email', placeholder: 'Digite seu email', name: 'email' },
    ]

    const [formEmail, setFormEmail] = useState('')

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setFormEmail(event.target.value)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            toast.loading('Processando...')
            const response = await fetch('/api/user/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: formEmail}),
            });
            
            const data = await response.json();
            if (response.ok) {
                console.log('Verify your email', data);
                toast.success('Verifique seu e-mail para alterar a senha!')
            } else {
                console.error('Error creating user:', data);
                toast.error('Erro ao alterar a senha' + data.details)
            }

        } catch (error) {
            console.error('Erro inespereado', error);
        }
    }

    return (    
        <div className="flex flex-col w-full items-center justify-center min-h-screen">
            <div className=" flex flex-col items-center mb-[20px] bg-black/90 p-4 rounded">
                <h1 className="text-white text-xl">Digite seu email para poder mudar sua senha.</h1>
                <Form fields={fields} onChange={handleInputChange} onSubmit={handleSubmit} />
            </div>
        </div>
    )
}