function verifyLocation(formDetails) {
    const errors = {};
    if (formDetails.street.trim() === "") {
        errors.street = "*Street is required"
    }
    if (formDetails.city.trim() === "") {
        errors.city = "*City is required"
    }
    if (formDetails.pincode === "") {
        errors.pincode = "*Pincode is required"
    }
    else if (formDetails.pincode.length != 6) {
        errors.pincode = "*Invalid PinCode"
    }
    if (formDetails.country === "") {
        errors.country = "*Country value is required"
    }
    if (formDetails.state === "") {
        errors.state = "*State value is required"
    }
    if (formDetails.district === "") {
        errors.district = "*District value is required"
    }

    return errors
}

export default verifyLocation;