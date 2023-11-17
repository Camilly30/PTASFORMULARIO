
'use server'

//milllybacarim@gmail.com senha:123


const url ="https://aula-17-10-nu.vercel.app";

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
         const responseOfApi = await fetch(url +"/user/authenticated",
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
export { getUsers, getUserAuthenticated, postUser};


