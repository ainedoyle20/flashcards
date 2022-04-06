import { useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import SignUp from "./signup";
import SignIn from "./signin";

import styles from './auth-form.module.css';

function AuthForm({ currentUser }) {
    const [showSignin, setShowSignin] = useState(false);

    const router = useRouter();

    if (currentUser && router.route === '/auth') {
        console.log('there IS a user in authForm!!');
        router.push('/');
    }

    return (
        <div className="w-screen h-screen flex justify-center">
            {
                showSignin ? <SignIn setShowSignin={setShowSignin} /> : <SignUp setShowSignin={setShowSignin} /> 
            }
        </div>
    );
}

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser,
});

export default connect(mapStateToProps)(AuthForm);
