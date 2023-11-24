
'use server'

import { cookies } from "next/dist/client/components/headers";

//milllybacarim@gmail.com senha:123


const url ="http://localhost:4000";

const postUser = async (user) =>{
    try{
        const responseOfApi = await fetch(url +"/user",
        {
           method:"POST",
           headers:{"Content-Type":"Application/json"},
           body: JSON.stringify(user)
        }
        );
        const userSave = await responseOfApi.json();
        return userSave;
    }catch{
        return null;
    }
}

const getUserAuthenticated = async (user) => {
    console.log(user)
    try{
         const responseOfApi = await fetch(url +"/logar",
         {
            cache:"no-cache",
            method:"POST",
            headers:{"Content-Type":"Application/json"},
            body: JSON.stringify(user)
         }
         );
        const userAuth = await responseOfApi.json();
        console.log(userAuth)
        return userAuth;
       
    }catch{
        
    }
}
const getUsers = async() =>{
   try{ const responseOfApi = await fetch(url +"/users",{// vai reenderizar a cada 10s
        next:{revalidate :10}
    });
    const listUsers = responseOfApi.json();
    return listUsers;

    } catch{ 
        return null 
}
}
const updateUser = async (user,id) => {
    const token = cookies().get('token')?.value;
    try{
        const responseOfApi = await fetch(`${url} +/user/+${id}`,{
            method:"PUT",
            headers:{"Content-Type":"Application/json",
            Cookie: `token=${token}`
        },
        body: JSON.stringify(user)
    });
    const userSave = await responseOfApi.json();
    return userSave;
    }catch{
        return null;
}
}
//rota para alterrar o ususario 
export { getUsers, getUserAuthenticated, updateUser, postUser};


