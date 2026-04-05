async function handleToken() {
    try {
        // ✅ Check sessionStorage first
        const token = sessionStorage.getItem("accessToken")
        if (!token) {
            console.log("No token in sessionStorage")
            return null
        }

        const response = await fetch(
            "https://minishop-ecommerce-o1yl.onrender.com/api/users/refresh-token", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`  // ✅ send token in header
            },
        })
        const data = await response.json()
        console.log("Data for token is: ", data)
        if (!response.ok) {
            console.log("Error from backend is: ", data.message || "Authentication Failed")
            sessionStorage.removeItem("accessToken")  // ✅ clear invalid token
            return null
        }
        return true  // ✅ return true for logged in
    }
    catch (err) {
        console.log("Error from backend is: ", err || "Authentication Failed")
        return null
    }
}

export default handleToken