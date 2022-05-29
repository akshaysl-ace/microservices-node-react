import { useState } from 'react';
import useRequestHook from './../../hooks/use-request';
import Router from 'next/router';

const SignupForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { doRequest, errors } = useRequestHook({
        url: '/api/users/signup',
        body: { email, password },
        method: 'post',
        successCall: () => Router.push('/')
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        await doRequest();
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign Up</h1>
            {errors}
            <div className='form-group'>
                <label>Email :</label>
                <input value={email} onChange={e => setEmail(e.target.value)} className='form-control' />
            </div>
            <div className='form-group'>
                <label>Password :</label>
                <input value={password} onChange={e => setPassword(e.target.value)} type='password' className='form-control' />
            </div>
            <button className='btn btn-primary'>Sign Up</button>
        </form>
    );
}

export default SignupForm;  