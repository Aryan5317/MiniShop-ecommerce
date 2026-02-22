function validation(userDetails) {
    const errors = {}
    const isEmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(userDetails.email);
    if (userDetails.username.trim() === "") {
        errors.userName = "*UserName is required"
    }
    if (userDetails.email.trim() === "") {
        errors.email = "*Email is required"
    }
    else if (!isEmail) {
        errors.email = "*Enter valid email id ends with @gmail.com"
    }
    if (userDetails.password.trim() === "") {
        errors.password = "*Password is required"
    }
    else if(!(userDetails.password.length > 5 && userDetails.password.length < 16)){
        errors.password = "*Password length must be in between 6 and 15"
    }
    return errors
}

export default validation