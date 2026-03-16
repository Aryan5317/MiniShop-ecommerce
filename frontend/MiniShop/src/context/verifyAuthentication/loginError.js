function loginValidation(userDetails) {
    const errors = {}
    const isEmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(userDetails.email);
    const passwordRegix = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/
    if (userDetails?.email?.trim() === "") {
        errors.email = "*Email is required"
    }
    else if (!isEmail) {
        errors.email = "*Enter valid email id ends with @gmail.com"
    }
    if (userDetails?.password?.trim() === "") {
        errors.password = "*Password is required"
    }
    else if (!(userDetails?.password?.length > 7 && userDetails?.password?.length < 16)) {
        errors.password = "*Password length must be in between 8 and 15"
    }
    else if (!passwordRegix?.test(userDetails.password)) {
        errors.password = "Atleast 1uppercase, 1lowercase and 1 number is required"
    }
    return errors
}

export default loginValidation