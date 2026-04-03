const logOutService = async () => {
    try {
        const response = await fetch(
            "https://minishop-ecommerce-o1yl.onrender.com/api/users/logOut", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        })
        const data = await response.json()
        console.log("Data recived from backend is: ", data)
        if (!response.ok) {
            console.log("Error from backend controller is: ", data.message || data)
            throw new Error(data.message || data)
        }
        return data.message;
    } catch (error) {
        console.log("Error from backend in logout: ", error)
        throw error;
    }
}

export default logOutService
