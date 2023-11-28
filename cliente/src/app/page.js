'use client'
import { useState } from "react";
import handlerAcessUser from "./functions/handlerAcess"
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { errors } from "jose";


export default function Login() {
  const [user, setUser] = useState({
    name: '',
    senha: '',
  });
  const { push, refresh } = useRouter();

  const handlerLogin = async (e) => {
    e.preventDefault();
    try {
      const userAuth = await handlerAcessUser(user);
      if(userAuth.token === undefined){
        toast.error("Erro no nome ou senha!")
      }
      push('/pages/dashboard');
    } catch {
      toast.error ("Erro na Aplicação")
      
    }
  }
  return (
    <div className="login">
      <div className="card-header"><h1>Login</h1></div>
      <div className="b">
         <form  className="card" onSubmit={handlerLogin}>
           <div className="card-content">
             <div className="card-content-area"><input placeholder='Name' type='text' onChange={(e) => { setUser({ ...user, name: e.target.value }) }}></input></div>
             <div className="card-content-area"><input placeholder='Senha' type='password' onChange={(e) => { setUser({ ...user, senha: e.target.value }) }}></input></div>
            </div>
        <button>Entrar</button>
      <ToastContainer/>
     </form>
     </div>
    </div>
  )
}
