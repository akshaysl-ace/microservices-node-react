import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
    return currentUser ? <h1>you are signed in</h1> : <h1>pls do signin / signup </h1>
}

LandingPage.getInitialProps = async (context) => {
    const { data } = await buildClient(context).get('/api/users/currentuser');
    return data;
}

export default LandingPage;