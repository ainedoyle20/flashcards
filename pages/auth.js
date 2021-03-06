import { Fragment } from "react";
import Head from "next/head";
import AuthForm from "../components/user/auth-form";

function Auth() {
    return (
        <Fragment>
            <Head>
                <title>Sign In</title>
                <meta name="content" content="Sign up or sign in page." />
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
        props: {currentUser: null}
    };
}

export default Auth;
