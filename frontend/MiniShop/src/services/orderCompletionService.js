const orderCompletionService = async (category, id) => {
    console.log("Category are:  ",category)
    console.log("Id are: ", id)
    const dataToSend = {
        category: category,
        productId: id,
    }
    console.log("Data to Send: ", dataToSend);
    try {
        const response = await fetch(
            "http://localhost:5000/api/users/cartDetails/cart-completed", {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
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
