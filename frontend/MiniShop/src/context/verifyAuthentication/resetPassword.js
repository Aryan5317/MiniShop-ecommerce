function resetPassword(passwordDetails) {
    console.log("Password came: ", passwordDetails)
    const errors = {}
    const passwordRegix = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/
    if (passwordDetails.password?.trim() === "") {
        errors.password = "*Password is required"
    }
    else if (!(passwordDetails.password.length > 7 && passwordDetails.password.length < 16)) {
        errors.password = "*Password length must be in between 8 and 15"
    }
    else if (!(passwordRegix.test(passwordDetails.password))) {
        errors.password = "*Atleast 1uppercase, 1lowercase and 1 number is required"
    }
    if (passwordDetails.confirmPassword?.trim() === "") {
        errors.confirmPassword = "*ConfirmPassword is required"
    }
    else if (!(passwordDetails.confirmPassword.length > 7 && passwordDetails.confirmPassword.length < 16)) {
        errors.confirmPassword = "*ConfirmPassword length must be in between 8 and 15"
    }
    else if (!(passwordRegix.test(passwordDetails.confirmPassword))) {
        errors.confirmPassword = "*Atleast 1uppercase, 1lowercase and 1 number is required"
    }

    return errors
}

export default resetPassword
