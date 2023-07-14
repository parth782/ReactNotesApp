const loginSchema = {
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
        pattern: {
            value: /^[^\s].*[^\s]$/,
            message: "Name must not contain any spaces"
        },
        minLength: {
            value: 8,
            message: "Password must be at least 6 characters"
        }
    }

}
export default loginSchema;