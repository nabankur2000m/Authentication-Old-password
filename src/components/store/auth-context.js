import React, { createContext, useState, useContext } from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}
});

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');

    const [token, setToken] = useState(initialToken);


    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {

        setToken(token);
        localStorage.setItem('token', token);

    };

    const logoutHandler = () => {
       setToken(null);
       localStorage.removeItem('token');
    };

    const contextValue = {
        token: token,
        c: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };

    return (
    <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
    );
};

export default AuthContext;
