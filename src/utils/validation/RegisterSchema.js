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
            message: "Password must be at least 8 characters"
        },
        // no whitespace anywhere
        pattern: {
            value: /^[^\s].*[^\s]$/,
            message: "Password must not contain spaces"
        }
    },
    cpassword: {
        required: {
            value: true,
            message: "Confirm Password is required"
        },
        minLength: {
            value: 8,
            message: "Confirm Password must be at least 8 characters"
        },
        // no whitespace anywhere
        pattern: {
            value: /^[^\s].*[^\s]$/,
            message: "Confirm Password must not contain spaces"
        }
    },
    name: {
        required: {
            value: true,
            message: "Name is required"
        },
       // leading/trailing use /^[^\s].*[^\s]$/
        pattern: {
            value: /^[^\s].*[^\s]$/,
            message: "Name must not contain spaces"
        },
        minLength: {
            value: 3,
            message: "Name must be at least 3 characters"
        }
    }
}
export default RegisterSchema;