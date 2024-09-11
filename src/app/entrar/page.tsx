'use client'

import Form from "@/components/Form";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Page() {
    const fields = [
        { type: 'email', label: 'Email', placeholder: 'Digite seu email', name: 'email' },
        { type: 'password', label: 'Senha', placeholder: 'Digite sua senha', name: 'password' },
      ]
    const [formData, setFormData] = useState({email: '', password: ''})
    const router = useRouter();
    const session = useSession()

    if(session.status === 'authenticated') {
        return router.push('/')
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
        
        const result = await signIn('credentials', {
            redirect: false,
            email: formData.email,
            password: formData.password
        })

        if (result?.error) {
            console.error('Erro ao fazer login: ', result.error)
            toast.error(`Erro ao logar usuário: "${result.error}".`)
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

    return (
        session.status === 'unauthenticated' && (      
        <div className="flex flex-col w-full items-center justify-center">
            <div className="w-[900px] h-auto flex flex-col bg-black/90 p-12 rounded items-center rounded-lg gap-12 mt-[100px]" >
            <h1 className="text-white text-3xl">Entrar em sua conta</h1>
                <Form fields={fields} forgotPassword={true} onChange={handleInputChange} onSubmit={handleSubmit} />
                <button className="flex bg-white p-3 w-[300px] rounded-xl text-black text-lg whitespace-nowrap items-center gap-5" onClick={handleGoogleLogin}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="40" viewBox="0 0 48 48">
                        <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    </svg>
                Entrar com conta Google
                </button>
            </div>
            <div className="text-black flex flex-col items-center">
                <p className="text-white">or</p>
            </div>
        </div>
        )
    )
}