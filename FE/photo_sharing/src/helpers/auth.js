const auth = () => {
    return JSON.parse(localStorage.getItem('user'));
}

const loginuser = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
}

const logout = () => {
    localStorage.removeItem('user');
}

export { auth, loginuser, logout };