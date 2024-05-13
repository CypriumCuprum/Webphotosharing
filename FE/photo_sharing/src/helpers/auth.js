const auth = () => {
    return localStorage.getItem('token');
}

const loginuser = (token) => {
    localStorage.setItem('token', token);
}

const logout = () => {
    localStorage.removeItem('token');
}

export { auth, loginuser, logout };