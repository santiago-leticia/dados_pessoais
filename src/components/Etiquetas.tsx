import React, { useState } from "react"
import { useHookFormMask, withMask } from "use-mask-input"
import {useForm} from "react-hook-form"

type Cliente={nome:string, email:string, cpf:string, local?:string, numero?:string, bairro?:string, cidade?:string, estado?:string}

export default function Etiquetas(){

    //const [cliente, setCliente]=useState<Cliente>({nome:"",email:"", cpf:""})
    type Cliente={nome:string, email:string, cpf:string}
    //tipo cliente

    const {handleSubmit, register, formState:{errors},reset, setValue,setFocus}= useForm()

    const resgiterWithMask=useHookFormMask(register)

    const searchCEP=(e:React.FocusEvent<HTMLInputElement>)=>{
        const cep= e.target.value.replace(/\D/g,'')
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res=>res.json())
        .then(data=>{
            setValue('local', data.logradouro)
            setValue('bairro', data.bairro)
            setValue('cidade', data.localidade)
            setValue('estado', data.uf)
            setFocus('numero')
        })
    }
    const [listaClientes, setListaClientes] = useState<Cliente[]>([])

    //const handleChange= (e: React.ChangeEvent<HTMLInputElement>)=>{
      //  const {name, value}= e.target
        //setCliente({...cliente, [name]:value})
    //}

    //const handleSubmit = (e: React.FormEvent)=>{
    //    e.preventDefault()
    //    //quando a gente colocar la, eu nao quero que nao um evento que nao acontecer, vai continuar na sua pagina que voce esta fazendo
    //    setListaClientes([...listaClientes, cliente])
    //    setCliente({nome:"",email:"", cpf:""})
    //}
    const onSubmit = (data: any) => {
        setListaClientes([...listaClientes, data]),
        reset()
    }

    return(
        <div className="font-sans bg-blue-500 min-h-screen p-5 flex flex-col gap-5">
            <form onSubmit={handleSubmit(onSubmit)} className="w-96 m-auto bg-white rounded-md p-1 flex flex-col gap-5">
                <fieldset className="p-5 mb-5">
                    <legend className="text-2x1 text-center p-2.5">Dados Pessoais</legend>
                    <input className="mb-1 p-1.5 rounded-md outline-gray-400 w-full" {...register('nome',{required:'Nome obrigatorio!'})}/>
                    {errors.nome && <span className="text-red-500 ">{errors.nome.message as string}</span>}
                    <input className="mb-1 p-1.5 rounded-md outline-gray-400 w-full" {...register('email', {
                        pattern:{value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                        message: 'Email invalido!'
                        }
                    })}/>
                    <input className="mb-1 p-1.5 rounded-md outline-gray-400 w-full" placeholder="CPF" {...resgiterWithMask('cpf','999.999.999-99')}/>
                    {errors.cpf && <span className="text-red-500 mb-1 ">{errors.cpf.message as string}</span>}
                    <button className="py-1.5 px-4 rounded-md bg-green-500 text-white" type="submit">Criar</button>
                </fieldset>
                <fieldset>
                    <legend>Endereço</legend>
                    <input className="mb-1 p-1.5 rounded-md outline-gray-400 border-gray-200" placeholder="CEP"{...resgiterWithMask('cep','99999-999')} 
                    onBlur={searchCEP}/>
                    <input className="mb-1 p-1.5 rounded-md outline-gray-400 border-gray-200" placeholder="LOCAL"{...register('local')} />
                    <input className="mb-1 p-1.5 rounded-md outline-gray-400 border-gray-200" placeholder="NUMERO"{...register('numero')} />
                    <input className="mb-1 p-1.5 rounded-md outline-gray-400 border-gray-200" placeholder="BAIRRO"{...register('bairro')} />
                    <input className="mb-1 p-1.5 rounded-md outline-gray-400 border-gray-200" placeholder="CIDADE"{...register('cidade')} />
                    <input className="mb-1 p-1.5 rounded-md outline-gray-400 border-gray-200" placeholder="ESTADO"{...register('estado')} />

                </fieldset>
                <button className="py-1.5 px-4 rounded-md bg-green-500 text-white" type="submit">Criar Etiqueta</button>
            </form>
            <div className="mt-4 w-full bg-gray-400 flex flex-wrap justify-evenly grow"> 
                {
                    listaClientes.map((cli, index)=>(
                    <div key={index} className="h-28 p-2.5 border-2 border-blue-400 w-96 m-2.5 bg-blue-500 rounded-md">
                        <p className="mb-1 font-bold">Nome: {cli.nome}</p>
                        <p className="mb-1 font-bold">E-mail: {cli.email}</p>
                        <p className="mb-1 font-bold">CPF: {cli.cpf}</p>
                        <p className=""></p>
                    </div>
                    ))
                }
                
            </div>
        </div>
    )
}
//é o metico