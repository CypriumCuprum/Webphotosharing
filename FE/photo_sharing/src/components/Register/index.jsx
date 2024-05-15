import './styles.css';
import React, { useEffect, useState } from 'react';
import { Button, TextField, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginuser } from '../../helpers/auth';
import { auth } from '../../helpers/auth';
import { databaseURL } from '../../helpers/config';
import { Link } from '@mui/material';
const Register = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        location: '',
        description: '',
        occupation: '',
        loginName: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();
    const checkAuth = auth();
    useEffect(() => {
        if (checkAuth) {
            navigate(`/user/${checkAuth.userId}`);
        }
    }, [checkAuth, navigate]);
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // handle form submission here
        if (form.password !== form.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        if (!form.firstName || !form.lastName || !form.loginName || !form.password || !form.confirmPassword) {
            alert('Please fill out all fields');
            return;
        }

        const namePattern = /^[a-zA-Z]+$/;
        const loginNamePattern = /^[a-zA-Z0-9]+$/;
        const passwordPattern = /^[a-zA-Z0-9]+$/;
        if (!namePattern.test(form.firstName) || !namePattern.test(form.lastName)) {
            alert('First and last name must be alphabetic');
            return;
        }
        if (!loginNamePattern.test(form.loginName)) {
            alert('Login name must be alphanumeric');
            return;
        }

        if (!passwordPattern.test(form.password)) {
            alert('Password must be alphanumeric');
            return;
        }

        const fetchData = async () => {
            const formrequest = {
                first_name: form.firstName,
                last_name: form.lastName,
                location: form.location,
                description: form.description,
                occupation: form.occupation,
                login_name: form.loginName,
                password: form.password,
            };
            const response = await fetch(`${databaseURL}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formrequest),
            });
            if (response.ok) {
                console.log('** Register: user successfully registered **');
                const data = await response.json();
                // loginuser(data);
                navigate(`/login`);
            }
            else if (response.status === 409) {
                alert('Login name already exists');
            }
            else {
                alert('Error: user registration error');
            }
        };
        fetchData();
        console.log(form);
    };

    return (
        <Paper component="form" onSubmit={handleSubmit} className='FormRegister'>
            <Typography variant="h6">Register</Typography>
            <Typography>Enter your information below</Typography>

            <TextField
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className='TextField'
            />

            <TextField
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className='TextField'
            />
            <TextField
                label="Location"
                name="location"
                value={form.location}
                onChange={handleChange}
                className='TextField'
            />

            <TextField
                label="Occupation"
                name="occupation"
                value={form.occupation}
                onChange={handleChange}
                className='TextField'
            />
            <TextField
                label="Login Name"
                name="loginName"
                value={form.loginName}
                onChange={handleChange}
                className='TextField'
            />
            <TextField
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className='TextField'
            />
            <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                className='TextField'
            />
            <TextField
                label="Description"
                name="description"
                value={form.description}
                onChange={handleChange}
                className='TextField'
                multiline
                rows={2}
            />
            <Link href="/login">Already have an account?</Link>
            <Button type="submit">Register</Button>
        </Paper>
    );
}

export default Register;