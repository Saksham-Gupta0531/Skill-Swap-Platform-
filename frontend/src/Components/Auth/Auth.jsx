import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Auth = () => {
    const navigate = useNavigate();
    const [authShow, setAuthShow] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const [signupData, setSignupData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        password2: ''
    });

    const [errors, setErrors] = useState({});

    // Validation functions
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const validateName = (name) => {
        return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name);
    };

    const validateLoginForm = () => {
        const newErrors = {};

        if (!loginData.email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(loginData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!loginData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateSignupForm = () => {
        const newErrors = {};

        if (!signupData.email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(signupData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!signupData.first_name) {
            newErrors.first_name = 'First name is required';
        } else if (!validateName(signupData.first_name)) {
            newErrors.first_name = 'First name must be at least 2 characters and contain only letters';
        }

        if (!signupData.last_name) {
            newErrors.last_name = 'Last name is required';
        } else if (!validateName(signupData.last_name)) {
            newErrors.last_name = 'Last name must be at least 2 characters and contain only letters';
        }

        if (!signupData.password) {
            newErrors.password = 'Password is required';
        } else if (!validatePassword(signupData.password)) {
            newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, and number';
        }

        if (!signupData.password2) {
            newErrors.password2 = 'Please confirm your password';
        } else if (signupData.password !== signupData.password2) {
            newErrors.password2 = "Passwords don't match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLoginChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });

        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: ''
            });
        }
    };

    const handleSignupChange = (e) => {
        setSignupData({
            ...signupData,
            [e.target.name]: e.target.value
        });

        // Clear specific error when user starts typing
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: ''
            });
        }
    };

    const handleLoginSubmit = async () => {
        if (!validateLoginForm()) {
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/accounts/auth/login/', loginData);
            localStorage.setItem('access', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            setNotificationMessage('Login successful!');
            setShowSuccessNotification(true);
            setTimeout(() => {
                setShowSuccessNotification(false);
                navigate('/');
            }, 3000);

        } catch (error) {
            alert('Login failed: ' + (error.response?.data?.detail || error.message));
        } finally {
            setIsLoading(false);
        }
    };
    const handleSignupSubmit = async () => {
        if (!validateSignupForm()) {
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/accounts/auth/register/', signupData);

            // Show success notification
            setNotificationMessage('Signup successful! Please check your email to verify your account.');
            setShowSuccessNotification(true);

            // Hide notification after 4 seconds and switch to login
            setTimeout(() => {
                setShowSuccessNotification(false);
                setAuthShow(true);
                setErrors({});
            }, 4000);

        } catch (error) {
            alert('Signup failed: ' + (error.response?.data?.detail || error.message));
        } finally {
            setIsLoading(false);
        }
    };

    const switchToSignup = () => {
        setAuthShow(false);
        setErrors({});
    };

    const switchToLogin = () => {
        setAuthShow(true);
        setErrors({});
    };


    const Loader = () => (
        <div className="loader-overlay">
            <div className="loader-container">
                <div className="loader-spinner"></div>
                <p className="loader-text">Please wait...</p>
            </div>
        </div>
    );

    const SuccessNotification = () => (
        <div className={`success-notification ${showSuccessNotification ? 'show' : ''}`}>
            <div className="success-icon">✓</div>
            <span className="success-message">{notificationMessage}</span>
        </div>
    );

    return (
        <>
            {isLoading && <Loader />}
            <SuccessNotification />
            {authShow ? (
                <div className='LoginMainDiv'>
                    <div className="Loginleft">
                        <div className="CompanyTitle">Skill Swap</div>
                        <div className="logintitle">Login to Your Account</div>
                        <div className="loginDetail">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={loginData.email}
                                onChange={handleLoginChange}
                                className={errors.email ? 'error' : ''}
                            />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                            <br />

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={loginData.password}
                                onChange={handleLoginChange}
                                className={errors.password ? 'error' : ''}
                            />
                            {errors.password && <span className="error-message">{errors.password}</span>}
                            <br />

                            <button
                                onClick={handleLoginSubmit}
                                disabled={isLoading}
                                className={isLoading ? 'loading' : ''}
                            >
                                {isLoading ? 'Logging in...' : 'Submit'}
                            </button>
                        </div>
                    </div>
                    <div className="Loginright">
                        <div className="newhere">New Here?</div>
                        <div className="loginsubtitle">
                            Sign Up and discover a great <br /> amount of new opportunities!
                        </div>
                        <div className="signup-btn">
                            <button onClick={switchToSignup}>Sign Up</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="SingupMainDiv">
                    <div className="signupleft">
                        <div className="Signuptitle">Hello Friends!</div>
                        <div className="singup-slogon">
                            Enter your personal details <br /> and start journey with us
                        </div>
                        <div className="sign-btn">
                            <button onClick={switchToLogin}>Sign In</button>
                        </div>
                    </div>
                    <div className="signupRight">
                        <div className="Signuptitle-2">Create Your Account</div>
                        <div className="signupDetail">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={signupData.email}
                                onChange={handleSignupChange}
                                className={errors.email ? 'error' : ''}
                            />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                            <br />

                            <input
                                type="text"
                                name="first_name"
                                placeholder="First Name"
                                value={signupData.first_name}
                                onChange={handleSignupChange}
                                className={errors.first_name ? 'error' : ''}
                            />
                            {errors.first_name && <span className="error-message">{errors.first_name}</span>}
                            <br />

                            <input
                                type="text"
                                name="last_name"
                                placeholder="Last Name"
                                value={signupData.last_name}
                                onChange={handleSignupChange}
                                className={errors.last_name ? 'error' : ''}
                            />
                            {errors.last_name && <span className="error-message">{errors.last_name}</span>}
                            <br />

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={signupData.password}
                                onChange={handleSignupChange}
                                className={errors.password ? 'error' : ''}
                            />
                            {errors.password && <span className="error-message">{errors.password}</span>}
                            <br />

                            <input
                                type="password"
                                name="password2"
                                placeholder="Confirm Password"
                                value={signupData.password2}
                                onChange={handleSignupChange}
                                className={errors.password2 ? 'error' : ''}
                            />
                            {errors.password2 && <span className="error-message">{errors.password2}</span>}
                            <br />

                            <button
                                onClick={handleSignupSubmit}
                                disabled={isLoading}
                                className={isLoading ? 'loading' : ''}
                            >
                                {isLoading ? 'Creating Account...' : 'Submit'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Auth;