import { useState } from 'react';
// import { useRouter } from 'next/router';

import { createUserProfileDocument, registerWithEmailAndPassword } from '../../firebase/firebase.utils';

import styles from './signup.module.css';

function SignUp({ setShowSignin }) {
    const [formInput, setFormInput] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    // const router = useRouter();
    // function reroute() {
    //     setTimeout(() => {
    //         console.log('reroute timer running!');
    //         router.replace('/');
    //     }, 1000);
    // }

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
            // reroute();
            await createUserProfileDocument(user, { displayName: displayName });
            console.log('got here');
        } catch (error) {
            console.log('error: ', error);
            alert('This email is already in use!');
            return;
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label>Your displayName</label>
                    <input 
                        name="displayName" 
                        type="text" 
                        value={formInput.displayName}
                        onChange={handleChange}
                        required 
                    />
                    <label>Your Email</label>
                    <input 
                        name="email" 
                        type="email" 
                        value={formInput.email}
                        onChange={handleChange}
                        required 
                    />
                    <label>Your Password</label>
                    <input 
                        name="password" 
                        type="password" 
                        value={formInput.password}
                        onChange={handleChange}
                        required 
                    />
                    <label>Confirm Password</label>
                    <input 
                        name="confirmPassword" 
                        type="password" 
                        value={formInput.confirmPassword}
                        onChange={handleChange}
                        required 
                    />
                    <button type="submit">Sign Up</button>
                </form>
                <button onClick={() => setShowSignin(true)}>Or click here to Login</button>
            </div>

            <p>Or</p>

            <button className={styles.google}>Continue with Google</button>
        </div>
    );
}

export default SignUp;
