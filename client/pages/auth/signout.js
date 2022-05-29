import { useEffect } from "react";
import useRequestHook from './../../hooks/use-request';
import Router from 'next/router';

export default () => {

    const { doRequest } = useRequestHook({
        url: '/api/users/signout',
        method: 'post',
        body: {},
        successCall: () => Router.push('/')
    });

    useEffect(() => {
        doRequest();
    }, []);

    return <div>
        Signing you out...
    </div>
}