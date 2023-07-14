import { useHistory } from 'react-router-dom'
import RegisterSchema from '../utils/validation/RegisterSchema'
import { useForm } from 'react-hook-form'

export const Signup = (props) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    let history = useHistory();

    const handlesubmit = async (data) => {

        if (data.password !== data.cpassword) {
            props.showalert("Password and Confirm Password both must be same", "danger");

            return;
        }
        const response = await fetch(process.env.REACT_APP_BASE_URL + "api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: data.name, email: data.email, password: data.password })
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
        props.showalert("Account Created Successfully", "success")


    }

    return (
        <>
            <h2 className="text-center my-3">Signup In Inotebook</h2>
            <form onSubmit={handleSubmit(handlesubmit)}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email"  {...register("email", RegisterSchema.email)} />
                    {errors.email && <span className="text-danger">{errors.email.message}</span>}

                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" {...register("name", RegisterSchema.name)} />
                    {errors.name && <span className="text-danger">{errors.name.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" {...register("password", RegisterSchema.password)} />
                    {errors.password && <span className="text-danger">{errors.password.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" {...register("cpassword", RegisterSchema.cpassword)} />
                    {errors.cpassword && <span className="text-danger">{errors.cpassword.message}</span>}
                </div>

                <button type="submit" className="btn btn-danger"  >Signup</button>
            </form>
        </>
    )
}
export default Signup
