import { useState } from 'react';
// import { useRouter } from 'next/router';

import { loginWithEmailAndPassword } from '../../firebase/firebase.utils';

import styles from './signin.module.css';

function SignIn({ setShowSignin }) {
    const [formInput, setFormInput] = useState({
        email: '',
        password: '',
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

        const { email, password } = formInput;

        try {
            await loginWithEmailAndPassword(email, password);
            // reroute();
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
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
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
                <button type="submit">Sign In</button>
            </form>
            <button onClick={() => setShowSignin(false)}>Or click here to Sign Up</button>
        </div>
    );
}

export default SignIn;
