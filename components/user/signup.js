import { useState } from 'react';

import { createUserProfileDocument, registerWithEmailAndPassword, signInWithGoogle } from '../../firebase/firebase.utils';

function SignUp({ setShowSignin }) {
    const [formInput, setFormInput] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    function handleChange(e) {
        const { value, name } = e.target;

        setFormInput({ ...formInput, [name]: value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const { displayName, email, password, confirmPassword } = formInput;

        if (password !== confirmPassword) {
            alert('passwords do not match');
            return;
        }

        try {
            const { user } = await registerWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, { displayName: displayName });
        } catch (error) {
            console.log('Error registering with email and password.');
            alert('This email is already in use!');
            return;
        }
    }

    async function handleGoogleSignIn() {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.log('Error signing in with Google.');
            alert('Sorry there was an signing in. Please try again later or try a different sign in method.');
        }
    }

    return (
        <div className="flex flex-col items-center w-full">
            <div 
                className="flex flex-col justify-center items-center w-4/5 mt-20 mb-10 pb-5 rounded-md shadow-[1px_3px_3px_3px_rgba(199,199,199)] md:w-2/4 md:mt-[14vh] lg:w-1/3 "
            >
                <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-4/5 mt-8 mb-2">
                    <label className="p-1">Your Display Name</label>
                    <input 
                        className="w-full p-1 mb-1 border border-[#c7c7c7] focus:outline-0 md:w-4/5"
                        name="displayName" 
                        type="text" 
                        value={formInput.displayName}
                        onChange={handleChange}
                        required 
                    />
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
                    <label className="p-1">Confirm Password</label>
                    <input 
                        className="w-full p-1 mb-1 border border-[#c7c7c7] focus:outline-0 md:w-4/5"
                        name="confirmPassword" 
                        type="password" 
                        value={formInput.confirmPassword}
                        onChange={handleChange}
                        required 
                    />
                    <button className="mt-5 mb-0 underline" type="submit">Sign Up</button>
                </form>
                <button className="mt-8" onClick={() => setShowSignin(true)}>Or click here to Login</button>
            </div>

            <p>Or</p>

            <button className="mt-8 underline" onClick={handleGoogleSignIn}>Continue with Google</button>
        </div>
    );
}

export default SignUp;
