import Cookies from 'js-cookie';
const token = Cookies.get('jwt_token');
export async function registerUrl(data) {
    console.log(data)
    try {
        const responce = await fetch("http://localhost:8800/api/urls/create", {
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
    console.log(data)
    try {
        const responce = await fetch("http://localhost:8800/api/authurls/create", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
                authorization: `Bearer ${token}`
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
    console.log(data)
    try {
        const responce = await fetch(`http://localhost:8800/api/urls/analytics/${data.urlKey}`, {
            method: "get",
            headers: {
                "Content-Type": "Application/json",
                // Authorization:`Bearer ${token}` 
            },
            // body: JSON.stringify({ originalUrl: data.originalUrl, name: data.name }),
        })
        console.log(responce)
        return responce;
    }
    catch (err) {
        return err
    }
}

export async function getAboutUrl(data) {
    console.log(data)
    try {
        const responce = await fetch(`http://localhost:8800/api/urls/aboutUrl/${data.urlKey}`, {
            method: "get",
            headers: {
                "Content-Type": "Application/json",
                // Authorization:`Bearer ${token}` 
            },
        })
        console.log(responce)
        return responce;
    }
    catch (err) {
        return err
    }
}





export async function getAllUrlOfUser() {
    
    try {
        const responce = await fetch(`http://localhost:8800/api/authurls/allAuthUrls`, {
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

