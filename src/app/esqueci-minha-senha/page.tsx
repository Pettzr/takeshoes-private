'use client'

import Form from "@/components/Form";
import { useState } from "react";

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
                alert('Verifique seu e-mail para alterar a senha!')
            } else {
                console.error('Error creating user:', data);
                alert('Erro ao alterar a senha' + data.details)
            }

        } catch (error) {
            console.error('Erro inespereado', error);
        }
    }

    return (    
        <div className="flex flex-col w-full items-center justify-center">
            <div className="text-white flex flex-col items-center mb-[20px]">
                <h1>Digite seu email para poder mudar sua senha.</h1>
            </div>
            <Form fields={fields} onChange={handleInputChange} onSubmit={handleSubmit} />
        </div>
    )
}