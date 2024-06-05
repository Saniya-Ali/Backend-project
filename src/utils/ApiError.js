// nodejs has an error class

class ApiError extends Error {
    constructor(
        statusCode,
        message= "Something went wrong",
        errors=[],
        stack = ""
    ){
        super(message)
        this.statusCode=statusCode
        this.data=null
        this.message=message
        this.success=false
        this.errors=errors

        if(stack){
            this.stack=stack
        }
        else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}

// Errors are tracked in node js but the response we are working with is not in core js, we are using express for that. Express doesn't give such thing but we can make a class