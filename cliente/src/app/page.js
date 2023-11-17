'use client'
import { useState } from "react";
import handlerAcessUser from "./functions/handlerAcess"
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { push, refresh } = useRouter();

  const handlerLogin = async (e) => {
    e.preventDefault();
    try {
      const userAuth = await handlerAcessUser(user);
      if(userAuth.token === undefined){
        toast.error("Erro no e-mail ou senha!")
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
         <form  class="card" onSubmit={handlerLogin}>
           <div class="card-content">
             <div class="card-content-area"><input placeholder='E-mail' type='email' onChange={(e) => { setUser({ ...user, email: e.target.value }) }}></input></div>
             <div class="card-content-area"><input placeholder='Senha' type='password' onChange={(e) => { setUser({ ...user, password: e.target.value }) }}></input></div>
            </div>
        <button>Entrar</button>
      <ToastContainer/>
     </form>
     </div>
    </div>
  )
}
