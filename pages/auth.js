import { Fragment } from "react";
import Head from "next/head";
import AuthForm from "../components/user/auth-form";

function Auth() {
    return (
        <Fragment>
            <Head>
                <title>SignIn</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <AuthForm />
        </Fragment>
        
    );
}

export async function getServerSideProps(context) {
    const currentUser = context.req.cookies.currentUser;

    if (currentUser === 'true') {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {currentUser}
    };
}

export default Auth;
