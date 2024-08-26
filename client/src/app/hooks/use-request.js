'use client'
import axios from 'axios';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function useRequest({ url, method, body, onSuccess }) {
    const [errors, setErrors] = useState(null);

    async function doRequest(props = {}) {
        try {
            setErrors(null);

            const requestData = body instanceof FormData ? body : { ...body, ...props };

            const response = await axios({
                method: method,
                url: url,
                data: requestData,
                headers: requestData instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : undefined
            });

            if (onSuccess) {
                onSuccess(response.data);
            }

            return response.data;

        } catch (err) {
            console.log('err', err);
            setErrors(
                <Alert severity="error" sx={{ mt: 2 }}>
                    <AlertTitle>Error</AlertTitle>
                    Ooops... Something went wrong.
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        {err.response?.data?.errors?.map((err) => (
                            <li key={err.message}>{err.message}</li>
                        ))}
                    </ul>
                </Alert>
            );
        }
    };

    return { doRequest, errors };
};
