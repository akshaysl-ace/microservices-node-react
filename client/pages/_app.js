import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {

    return (
        <>
            <Header currentUser={currentUser} />
            <Component {...pageProps} />
        </>
    );
}

AppComponent.getInitialProps = async (appContext) => {
    //Unlike pages, Custom App components have req property nested inside 'ctx' in NextJS world.
    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentuser');
    let pageProps = {};

    // as _app is the wrapper component to index.js, we need to call getInitialProps method for inner child components as well.
    // In NextJS it needs to be done as following (PLEASE DO NOT REMOVE BELOW CODE !!)
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }

    return {
        pageProps, ...data
    };
}

export default AppComponent;