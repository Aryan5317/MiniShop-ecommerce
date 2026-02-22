class ApiError extends Error{
    constructor(
        statusCode,
        error = [],
        stack = "",
        messaege = "Something went wrong"
    ){
        super(messaege)
        this.statusCode = statusCode,
        this.error = error,
        this.data = null,
        this.success = false, 
        this.message = messaege
        if(stack){
            this.stack = stack
        }
        else {
            error.captureStackTrace(this, this.constructor)
        }
    }
}

export default ApiError