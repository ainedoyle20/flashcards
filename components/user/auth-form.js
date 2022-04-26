import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import {selectCurrentUser} from '../../redux/user/user.selectors';

import SignUp from "./signup";
import SignIn from "./signin";

function AuthForm() {
    const currentUser = useSelector(selectCurrentUser);
    const [showSignin, setShowSignin] = useState(false);

    const router = useRouter();

    if (currentUser && router.route === '/auth') {
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

export default AuthForm;
