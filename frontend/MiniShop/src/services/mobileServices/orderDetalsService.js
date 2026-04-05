const orderDetalsService = async (category, productId, productQuantity, totalAmount) => {
    console.log("Product id in service code: ", productId)
    console.log("Product Quantity in service code: ", productQuantity)
    console.log("Total Amount in amount code is: ", totalAmount)
    const dataToSend = {
        category: category,
        productId: productId,
        quantity: productQuantity,
        totalAmount: totalAmount
    }
    console.log("Data to Send: ", dataToSend);
    try {
        const response = await fetch(
            "https://minishop-ecommerce-o1yl.onrender.com/api/users/orderDetails/order-summary", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}` 

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

export default orderDetalsService
