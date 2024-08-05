import Cookies from 'js-cookie';
const token = Cookies.get('jwt_token');
const Backend_Url = process.env.NEXT_PUBLIC_BACKEND_URL;
export async function registerUrl(data) {
    // console.log(data)
    try {
        const responce = await fetch(`${Backend_Url}/urls/create`, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
                // Authorization:{value}
            },
            body: JSON.stringify({ originalUrl: data.originalUrl, name: data.name }),
        })
        return responce;
    }
    catch (err) {
        return err
    }
}

export async function registerAuthUrl(data) {
    // console.log(data)
    try {
        const responce = await fetch(`${Backend_Url}/authurls/create`, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ originalUrl: data.originalUrl, name: data.name }),
        })
        return responce;
    }
    catch (err) {
        return err
    }
}

export async function getAnalytics(data) {
    // console.log(data)
    try {
        const responce = await fetch(`${Backend_Url}/urls/analytics/${data.urlKey}`, {
            method: "get",
            headers: {
                "Content-Type": "Application/json",
                // Authorization:`Bearer ${token}` 
            },
            // body: JSON.stringify({ originalUrl: data.originalUrl, name: data.name }),
        })
        // console.log(responce)
        return responce;
    }
    catch (err) {
        return err
    }
}

export async function getAboutUrl(data) {
    // console.log(data)
    try {
        const responce = await fetch(`${Backend_Url}/urls/aboutUrl/${data.urlKey}`, {
            method: "get",
            headers: {
                "Content-Type": "Application/json",
                // Authorization:`Bearer ${token}` 
            },
        })
        // console.log(responce)
        return responce;
    }
    catch (err) {
        return err
    }
}





export async function getAllUrlOfUser() {
    
    try {
        const responce = await fetch(`${Backend_Url}/authurls/allAuthUrls`, {
            method: "get",
            headers: {
                "Content-Type": "Application/json",
                Authorization:`Bearer ${token}` 
            },
        })
        // console.log("getAllUrlOfUser",responce)
        return responce;
    }
    catch (err) {
        return err
    }
}

