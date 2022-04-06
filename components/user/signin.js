import { useState } from 'react';

import { loginWithEmailAndPassword } from '../../firebase/firebase.utils';

function SignIn({ setShowSignin }) {
    const [formInput, setFormInput] = useState({
        email: '',
        password: '',
    });

    function handleChange(e) {
        const { value, name } = e.target;

        setFormInput({ ...formInput, [name]: value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const { email, password } = formInput;

        try {
            await loginWithEmailAndPassword(email, password);
        } catch (error) {
            if (error.message === 'Firebase: Error (auth/wrong-password).') {
                alert('Your password is incorrect. Please try again.');
            } else {
                alert('There is no account with this email. Please go to SignUp and register.');
            }
            return;
        }
    }

    return (
        <div className="flex flex-col justify-center items-center w-4/5 h-2/4 mt-20 pb-5 rounded-md shadow-[1px_3px_3px_3px_rgba(199,199,199)] md:w-2/4 md:mt-[14vh] xl:w-1/4">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-4/5 mt-5 mb-2">
                <label className="p-1">Your Email</label>
                <input 
                    className="w-full p-1 mb-1 border border-[#c7c7c7] focus:outline-0 md:w-4/5"
                    name="email" 
                    type="email" 
                    value={formInput.email}
                    onChange={handleChange}
                    required 
                />
                <label className="p-1">Your Password</label>
                <input 
                    className="w-full p-1 mb-1 border border-[#c7c7c7] focus:outline-0 md:w-4/5"
                    name="password" 
                    type="password" 
                    value={formInput.password}
                    onChange={handleChange}
                    required 
                />
                <button className="mt-5 underline" type="submit">Sign In</button>
            </form>
            <button className="mt-5" onClick={() => setShowSignin(false)}>Or click here to Sign Up</button>
        </div>
    );
}

export default SignIn;
