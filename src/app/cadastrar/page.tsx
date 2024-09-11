"use client";

import Form from "@/components/Form";
import PasswordValidation from "@/src/ui/components/PasswordValidation";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
    const fields = [
        { type: 'email', label: 'Email', placeholder: 'Digite seu email', name: 'email' },
        { type: 'password', label: 'Senha', placeholder: 'Digite sua senha', name: 'password' },
        { type: 'password', label: 'Confirmar a Senha', placeholder: 'Confirme sua senha', name: 'confirmPassword' }
    ];

    const [formData, setFormData] = useState({email: '', password: '', confirmPassword: ''})
    const session = useSession();
    const router = useRouter();

    if(session.status === 'authenticated') {
        router.push('/')
    }

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
            toast.error("Senhas não coincidem")
            return null;
        }
        
        try {
            toast.loading('Processando...')
            const response = await fetch('/api/user/create-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: formData.email, password: formData.password}),
            });
            
            const data = await response.json();
            toast.dismiss()
            if (response.ok) {
                console.log('Verify your email', data);
                toast.success('Verifique seu e-mail para completar seu cadastro!')
            } else {
                console.error('Error creating user:', data);
                toast.error('Erro ao criar usuario ' + data.message)
            }

        } catch (error) {
            console.error('Erro inespereado', error);
        }
    }

    const handleGoogleLogin = async () => {
           
        const result = await signIn('google', {
                redirect: false,  
            });
            
        if (result?.error) {
                console.error('Erro ao fazer login: ', result.error)
                toast.error(`Erro ao logar usuário: "${result.error}".`)
            };
    }

    return(
        session.status === 'unauthenticated' && ( 
        <div className="w-full flex justify-center min-h-screen">
            <div className="w-[900px] h-auto flex flex-col bg-black/90 p-12 rounded items-center rounded-lg my-[100px]" >
                <h1 className="text-white text-3xl">Cadastrar</h1>
                <Form fields={fields} onChange={handleInputChange} onSubmit={handleSubmit} forgotPassword={false} />
                <PasswordValidation formdata={formData}/>
                <button className="flex bg-white p-3 w-[300px] rounded-xl text-black text-lg whitespace-nowrap items-center gap-5" onClick={handleGoogleLogin}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="30" viewBox="0 0 48 48">
                        <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    </svg>
                Cadastrar com conta Google
                </button>
            </div>
        </div>
        )
    )
}