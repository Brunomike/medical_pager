import React, { ChangeEvent, ChangeEventHandler, useState } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'

import signInImage from '../assets/signup.jpg'

interface AuthState {
    fullName: string
    userName: string
    password: string
    confirmPassword: string
    phoneNumber: string
    avatarURL: string
}

const initialState = {
    fullName: '',
    userName: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: ''
}

const Auth = () => {
    const [form, setForm] = useState<AuthState>(initialState);
    const [isSignup, setIsSignup] = useState(true);

    const { fullName, userName, password, confirmPassword, phoneNumber, avatarURL } = form;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target?.name]: e.target?.value
        })
    }

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault()
        console.log(form);
        
        if (isSignup) {

        } else {

        }
    }

    const switchMode = () => {
        setIsSignup((prev) => !prev);
    }

    return (
        <div className='auth__form-container'>
            <div className='auth__form-container_fields'>
                <div className='auth__form-container_fields-content'>
                    <p>{isSignup ? "Sign Up" : "Sign In"}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor="fullName">Full Name</label>
                                <input name='fullName' type="text" placeholder='Full Name' onChange={handleChange} required value={fullName} />
                            </div>
                        )}
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor="userName">Username</label>
                            <input name='userName' type="text" placeholder='Username' onChange={handleChange} required value={userName} />
                        </div>
                        {isSignup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input name='phoneNumber' type="text" placeholder='Phone Number' onChange={handleChange} required value={phoneNumber} />
                            </div>
                        )}
                        {isSignup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor="avatarURL">Avatar URL</label>
                                <input name='avatarURL' type="text" placeholder='Avatar URL' onChange={handleChange} required value={avatarURL} />
                            </div>
                        )}
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor="password">Password</label>
                            <input name='password' type="password" placeholder='Password' onChange={handleChange} required value={password} />
                        </div>
                        {isSignup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input name='confirmPassword' type="password" placeholder='Confirm Password' onChange={handleChange} required value={confirmPassword} />
                            </div>
                        )}
                        <div className='auth__form-container_fields-content_button'>
                            <button >{isSignup ? "Sign Up" : "Sign In"}</button>
                        </div>
                    </form>
                    <div className='auth__form-container_fields-account'>
                        <p>{isSignup ? "Already have an account? " : "Don't have an account? "}
                            <span onClick={switchMode}>
                                {isSignup ? "Sign In" : "Sign Up"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className='auth__form-container_image'>
                <img src={signInImage} alt="Sign In" />
            </div>
        </div>
    )
}

export default Auth
