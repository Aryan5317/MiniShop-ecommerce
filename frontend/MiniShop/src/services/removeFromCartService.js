const removeFromCartService = async (id, flag) => {
    console.log("ID is: ", id)
    
    const dataToSend = {
        ID: id,
        flag: flag,
    }
    
    try {
        const response = await fetch(
            "https://minishop-ecommerce-o1yl.onrender.com/api/users/cartDetails/remove-cartPorduct", {
            credentials: "include",
            method: "PATCH",
            body: JSON.stringify(dataToSend),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}` // ✅ added
            }
        })
        
        const data = await response.json();
        
        if (!response.ok) {
            console.log("Error from backend while removing cart product is:  ", data.message || data)
            throw new Error(data.message || data);
        }
        return data;
    } catch (error) {
        console.log("Error while removing product from cart: ", error)
        throw error
    }
}

export default removeFromCartService