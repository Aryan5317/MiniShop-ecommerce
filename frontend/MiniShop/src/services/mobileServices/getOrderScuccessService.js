const getOrderScuccessService = async () => {
    try {
        const response = await fetch(
            "https://minishop-ecommerce-o1yl.onrender.com/api/users/orderDetails/order-details", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}` // ✅ added
            },
        })
        const data = await response.json()
        console.log("Data recived from backend during order details is: ", data)
        if (!response.ok) {
            console.log("Error from backend in order summary is: ", data.message || data)
            throw new Error(data.message)
        }
        return data
    } catch (error) {
        console.log("Error from backend during fetching success order: ", error)
        throw error;
    }
}

export default getOrderScuccessService