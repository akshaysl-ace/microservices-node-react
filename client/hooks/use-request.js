import axios from "axios";
import { useState } from 'react';

const useRequestHook = ({ url, method, body, successCall }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        setErrors(null);
        try {
            const response = await axios[method](url, body);

            if (successCall) {
                successCall(response.data);
            }
            return response.data;

        } catch (err) {
            setErrors(
                <div className="alert alert-danger">
                    <h4>Ooopss...</h4>
                    <ul className='my-0'>
                        {err.response.data.errors.map(er => <li key={er.message}> {er.message} </li>)}
                    </ul>
                </div>
            );
        }
    }

    return { doRequest, errors };
}

export default useRequestHook;