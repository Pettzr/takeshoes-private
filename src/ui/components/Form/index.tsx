import Link from "next/link";

type Field = {
    type: string;
    label: string;
    placeholder: string;
    name: string;
}

type FieldsProps = {
    fields: Field[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function Form ({fields, onSubmit, onChange}: FieldsProps) {


    return(
        <form className="w-[900px] flex flex-col gap-2 p-4 rounded items-center rounded gap-12" onSubmit={onSubmit}>
            {fields.map((field, index) => (
                <div key={index} className="flex flex-col items-center w-full">
                    <h2 className="text-start w-2/3 mb-[30px] text-white text-xl">{field.label}</h2>
                    <input
                        className="w-2/3 p-2"
                        placeholder={field.placeholder}
                        type={field.type}
                        name={field.name}
                        onChange={onChange}
                    />
                </div>
            ))}
            <Link href={'/esqueci-minha-senha'} className="text-white text-start w-2/3">Esqueceu a senha?</Link>
            <button type="submit" className="w-[200px] text-white self-end mr-[50px] bg-blue-700 hover:bg-blue-500 rounded p-4">Enviar</button>
        </form>
    )
}