const orderCompletionService = async (category, id) => {
    console.log("Category are:  ",category)
    console.log("Id are: ", id)
    const dataToSend = {
        category: category,
        productId: id,
    }
    
    try {
        const response = await fetch(
            "https://minishop-ecommerce-o1yl.onrender.com/api/users/cartDetails/cart-completed", {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}` // ✅ added
            },
            body: JSON.stringify(dataToSend)
        })
        const data = await response.json()
        console.log("Data recived from backend after order completion is: ", data)
        if (!response.ok) {
            console.log("Error from backedn is: ", data.message || data)
            throw new Error(data.message || data)
        }
        return data.message;
    } catch (error) {
        console.log("Error is recived from backend after payment recived: ", error)
        throw error;
    }
}

export default orderCompletionService