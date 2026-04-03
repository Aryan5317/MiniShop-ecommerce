function updateDetailsValidation(userDetails, type) {
    const errors = {}
    const usernameRegix = /^[A-Za-z\s]+$/
    const passwordRegix = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/

    if(type === "name") {
        if (!userDetails?.userName?.trim()) {
            errors.userName = "*FullName is required"
        }
        else if (!usernameRegix.test(userDetails.userName)) {
            errors.userName = "*Only characters and spaces are allowed"
        }
    }

    if(type === "password") {
        if (!userDetails?.newPassword?.trim()) {
            errors.newPassword = "*Password is required"
        }
        else if (!(userDetails?.newPassword?.length > 7 && userDetails?.newPassword?.length < 16)) {
            errors.newPassword = "*Password length must be between 8 and 15"
        }
        else if (!passwordRegix.test(userDetails.newPassword)) {
            errors.newPassword = "*Atleast 1 uppercase, 1 lowercase and 1 number is required"
        }

        if (!userDetails?.confirmPassword?.trim()) {
            errors.confirmPassword = "*Confirm Password is required"
        }
        else if (!(userDetails?.confirmPassword?.length > 7 && userDetails?.confirmPassword?.length < 16)) {
            errors.confirmPassword = "*Confirm Password length must be between 8 and 15"
        }
        else if (!passwordRegix.test(userDetails.confirmPassword)) {
            errors.confirmPassword = "*Atleast 1 uppercase, 1 lowercase and 1 number is required"
        }
        else if (userDetails.confirmPassword !== userDetails.newPassword) {
            errors.confirmPassword = "*Passwords do not match"
        }
    }

    return errors
}

export default updateDetailsValidation
