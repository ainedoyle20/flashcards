import AuthForm from "../components/user/auth-form";

function Auth(props) {
    return (
        <AuthForm />
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
