const RegisterSchema = {
    email: {
        required: {
            value: true,
            message: "Email is required"
        },
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid Email"
        }
    },
    password: {
        required: {
            value: true,
            message: "Password is required"
        },
        minLength: {
            value: 8,
            message: "Password must be at least 6 characters"
        },
        pattern:{
            value:/(?:^\s+|\s+$)/,
            message:"Password must not contain any spaces"
        },
    },
    cpassword: {
        required:{
            value:true,
            message:"Confirm Password is required"
        },
        minLength: {
            value: 8,
            message: "Password must be at least 6 characters"
        },
        pattern:{
            value: /^[^\s].*[^\s]$/,
            message:"Confirm Password must not contain any spaces"
        }

    },
    name:{
        required:{
            value:true,
            message:"Name is required"
        },
        pattern:{
            value:/^[^\s].*[^\s]$/,
            message:"Name must not contain any spaces"
        },
        minLength: {
            value: 5,
            message: "Name must be at least 3 characters"
        },
        
    }

}
export default RegisterSchema;