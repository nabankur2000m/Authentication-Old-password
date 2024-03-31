import React, { createContext, useState, useContext, useEffect } from 'react';

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
    const [logoutTimer, setLogoutTimer] = useState(null);

    useEffect(() => {
        if (token) {
            const remainingTime = calculateRemainingTime(token);
            setLogoutTimer(setTimeout(logoutHandler, remainingTime));
        }

        return () => {
            if (logoutTimer) {
                clearTimeout(logoutTimer);
            }
        };
    }, [token, logoutTimer]);

    const calculateRemainingTime = (token) => {
        const expiryTime = 5 * 60 * 1000; 
        return expiryTime;
    };

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token);

      
        const expiryTime = 5 * 60 * 1000; 
        clearTimeout(logoutTimer);
        setLogoutTimer(setTimeout(logoutHandler, expiryTime));
    };

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    };

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };

    return (
        <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
    );
};

export default AuthContext;
