
import { getUsers } from "@/app/functions/handlerAcessAPI";
import { Suspense } from "react";
import ListUser from "@/app/componetes/ListUser";
import Link from "next/link";

export default async function Dashboard() {
    const users =  await getUsers ();
     
    return (
        
        <div className="dash">
            <h1>Dashboard</h1>
            <Suspense fallback={<p>carregando...</p>}>
                 <ListUser user={users}/>

                     {users.map(users => (
                    <div key={users.id}> 
                    <p>Name: {users.name}</p>
                    
                    
                    </div>))}

            </Suspense>
            <Link href="/pages/register">Registrar</Link><br/>
             <Link href=""></Link>  
        </div>
    );
};