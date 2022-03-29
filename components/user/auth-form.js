import { useState } from "react";

import SignUp from "./signup";
import SignIn from "./signin";

import styles from './auth-form.module.css';

function AuthForm() {
    const [showSignin, setShowSignin] = useState(false);

    return (
        <div className={styles.authContainer}>
            {
                showSignin ? <SignIn setShowSignin={setShowSignin} /> : <SignUp setShowSignin={setShowSignin} /> 
            }
        </div>
    );
}

export default AuthForm;
