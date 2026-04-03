const addLocationService = async (locationDetails) => {
    const street = locationDetails.street
    const town = locationDetails.town;
    const district = locationDetails.district;
    const state = locationDetails.state;
    const city = locationDetails.city;
    const country = locationDetails.country;
    const pincode = locationDetails.pincode;
    console.log("street: ", street)
    console.log("town: ", town)
    console.log("district: ", district)
    console.log("state: ", state)
    console.log("pincode: ", pincode)
    console.log("city: ", city)
    console.log("Country: ", country)
    const dataToSend = {
        street: street,
        town: town,
        pincode: pincode,
        district: district,
        state: state,
        city: city,
        country: country
    }
    console.log("Data to send for location is: ", dataToSend)
    try {
        const response = await fetch(
            "https://minishop-ecommerce-o1yl.onrender.com/api/users/add-location", {
            method: "PATCH",
            credentials: "include",
            body: JSON.stringify(dataToSend),
            headers: {
                "Content-Type": "application/json"
            },
        })
        const data = await response.json()
        console.log("Data from backend is: ", data)
        if (!response.ok) {
            console.log("Error is: ", data.message || data)
            throw new Error(data.message || data)
        }
        return data.message
    } catch (error) {
        console.log("Error from backend during adding location: ", error)
        throw error;
    }
}

export default addLocationService
