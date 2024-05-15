import './styles.css';
import React, { useEffect, useState } from 'react';
import { Button, TextField, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginuser } from '../../helpers/auth';
import { auth } from '../../helpers/auth';
import { databaseURL } from '../../helpers/config';
const LoginPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ "login_name": "", "password": "" });
    const checkAuth = auth();
    useEffect(() => {
        if (checkAuth) {
            navigate(`/user/${checkAuth.userId}`);
        }
    }, [checkAuth, navigate]);
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            const response = await fetch(`${databaseURL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            loginuser(data); // loginuser function has token as parameter
            console.log('Login successful:', data.token);
            navigate(`/user/${data.userId}`);
        } catch (error) {
            console.error('Failed to login:', error);
        }
    };

    return (

        <Paper component="form" className='FormLogin'>
            <Typography variant="h4">Login</Typography>
            <TextField
                label="Login Name"
                name="login_name"
                // value={user.login_name}
                onChange={handleChange}
            />
            <TextField
                label="Password"
                name="password"
                // value={user.password}
                onChange={handleChange}
            />
            <Button variant="contained"
                color="primary"
                onClick={handleLogin}
            >Login</Button>
        </Paper>

    );
};

export default LoginPage;