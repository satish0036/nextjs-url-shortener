
const Backend_Url = process.env.NEXT_PUBLIC_BACKEND_URL;



export async function registerUser(data) {
    try {
        const responce = await fetch(`${Backend_Url}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
                // Autherization:{value}
            },
            body: JSON.stringify({ name: data.name, username: data.username, password: data.password }),
        })
        return responce;
    }
    catch (err) {
        return err
    }
}

export async function loginUser(data) {
    try {
        const responce = await fetch(`${Backend_Url}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
                // Autherization:{value}
            },
            body: JSON.stringify({username: data.username, password: data.password }),
        })
        return responce;
    }
    catch (err) {
        return err
    }
}