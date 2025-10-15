import React, { useState } from "react"

type Cliente={nome:string, email:string, cpf:string}

export default function Etiquetas(){

    const [cliente, setCliente]=useState<Cliente>({nome:"",email:"", cpf:""})
    //tipo cliente

    const [listaClientes, setListaClientes] = useState<Cliente[]>([])

    const handleChange= (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value}= e.target
        setCliente({...cliente, [name]:value})
    }

    const handleSubmit = (e: React.FormEvent)=>{
        e.preventDefault()
        //quando a gente colocar la, eu nao quero que nao um evento que nao acontecer, vai continuar na sua pagina que voce esta fazendo
        setListaClientes([...listaClientes, cliente])
        setCliente({nome:"",email:"", cpf:""})
    }

    return(
        <div className="font-sans bg-blue-500 min-h-screen p-5 flex flex-col gap-5">
            <form onSubmit={handleSubmit} className="w-96 m-auto bg-white rounded-md p-1 flex flex-col gap-5">
                <fieldset className="p-5 mb-5">
                    <legend className="text-2x1 text-center p-2.5">Dados Pessoais</legend>
                    <input className="mb-1 p-1.5 rounded-md outline-gray-400 w-full" type="text" name="nome" placeholder="Nome"
                            value={cliente.nome} onChange={handleChange}/>
                    <input className="mb-1 p-1.5 rounded-md outline-gray-400 w-full" type="text" name="email" placeholder="E-mail" 
                            value={cliente.email} onChange={handleChange}/>
                    <input className="mb-1 p-1.5 rounded-md outline-gray-400 w-full" type="text" name="cpf" placeholder="CPF" 
                            value={cliente.cpf} onChange={handleChange}/>
                    <button className="py-1.5 px-4 rounded-md bg-green-500 text-white" type="submit">Criar</button>
                </fieldset>
            </form>
            <div className="mt-4 w-full bg-gray-400 flex flex-wrap justify-evenly grow"> 
                {
                    listaClientes.map((cli, index)=>(
                    <div key={index} className="h-28 p-2.5 border-2 border-blue-400 w-96 m-2.5 bg-blue-500 rounded-md">
                        <p className="mb-1 font-bold">Nome: {cli.nome}</p>
                        <p className="mb-1 font-bold">E-mail: {cli.email}</p>
                        <p className="mb-1 font-bold">CPF: {cli.cpf}</p>
                    </div>
                    ))
                }
                
            </div>
        </div>
    )
}
//é o metico