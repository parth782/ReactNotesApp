import { useHistory } from 'react-router'
import loginSchema from '../utils/validation/LoginSchema'
import { useForm } from 'react-hook-form'


export const Login = (props) => {

    let history = useHistory();
    const { register, handleSubmit, formState: { errors } ,reset} = useForm();


    // const onchange = (e) => {
    //     setcredentials({ ...credentials, [e.target.name]: e.target.value })
    // }
    const handlelogin = async (data) => {

        const response = await fetch(process.env.REACT_APP_BASE_URL + "api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: data.email, password: data.password })
        })
        const json = await response.json();
        if (response.status === 500) {
            props.showalert("Something went wrong.Try After sometime", "danger")
            return;
        }
        else if (response.status === 404 || response.status === 400) {
            props.showalert("Page Not Found", "danger");
            return;
        }
        else if (response.status === 422) {
            props.showalert("Invalid Details in " + json.error[0].param, "danger");
            return;
        }
        reset();
        localStorage.setItem('token', json.authtoken)
        
        history.push('/')
        props.showalert("Logged In", "success")
    }
    return (
        <>
            <h2 className="text-center my-3">Login In Inotebook</h2>
            <form onSubmit={handleSubmit(handlelogin)}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email"  {...register("email", loginSchema.email)} />
                    {errors.email && <span className="text-danger">{errors.email.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" {...register("password", loginSchema.password)} />
                    {errors.password && <span className="text-danger">{errors.password.message}</span>}
                </div>

                <button type="submit" className="btn btn-danger" >Login</button>
            </form>
        </>
    )
}
export default Login
