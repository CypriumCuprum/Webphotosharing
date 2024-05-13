import React, { useState } from 'react';
import { Button, TextField, Grid, Paper } from '@mui/material';
import { useHistory, useNavigate } from 'react-router-dom';
import { loginuser } from '../../helpers/auth';


const LoginPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ "username": "", "password": "" });
    const history = useHistory();

    const handleLogin = async () => {
        try {
            const response = await fetch('/api/login', {
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
            navigate('/');
        } catch (error) {
            console.error('Failed to login:', error);
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper>
                    <TextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button onClick={handleLogin}>Login</Button>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default LoginPage;