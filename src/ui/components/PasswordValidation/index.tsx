import checkPassword from "@/src/utils/checkPassword"
import { useEffect } from "react"


export default function PasswordValidation (formdata: any) {
    const passwordValidated = checkPassword(formdata.formdata.password)
    const validations = [
        "A senha deve ter no mínimo 5 caracteres.",
        "A senha deve conter pelo menos uma letra maiúscula.",
        "A senha deve conter pelo menos um número.",
        "A senha deve conter pelo menos um caractere especial.",
    ]

    useEffect(() => {
        if(passwordValidated){
            console.log(passwordValidated)
        } else {
            console.log(passwordValidated)
        }
        
    },[formdata])

    return (
        <div className="text-white relative bottom-[80px] right-[80px]  ">
            { formdata.formdata.password !== "" && (
            <div> 
                <h1>Validação de senha:</h1>
                <ul>
                    {validations.map((validation) => (
                        <li>
                            {passwordValidated.errors.includes(validation) ? '🔴' : '🟢'}
                            {validation}
                        </li>
                    ))}
                </ul>
            </div>
             )
            }
    </div>
    )
}