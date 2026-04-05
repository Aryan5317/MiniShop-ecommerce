async function handleToken() {
    try {
        const response = await fetch(
            "https://minishop-ecommerce-o1yl.onrender.com/api/users/refresh-token", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        }
        )
        const data = await response.json()
        console.log("Data for token is: ", data)
        if (!response.ok) {
            console.log("Error from backend is: ", data.message || "Authentication Failed")
            throw new Error(data.message || "Authentication Failed")
        }
        return data.message
    }
    catch (err) {
        console.log("Error from backend is: ", err || "Authentication Failed")
    }
}

export default handleToken
