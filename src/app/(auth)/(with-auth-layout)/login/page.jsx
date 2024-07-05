"use client";

import Link from 'next/link';
import React, { useRef } from 'react';
import { auth } from '@/config/firebase';
import { useRouter } from 'next/navigation';
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();

    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        const userCredentials = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        try {
            await signInWithEmailAndPassword(userCredentials.email, userCredentials.password);
            router.push("/");
        } catch (err) {
            console.log("Error logining in: ", err);
        }
    }

    return (
        <div className='paper transparent outline box column full-width'>
            <h3 className='full-width text-center'>Login</h3>

            <form onSubmit={handleLogin} className="box column full-width">
                <input ref={emailRef} type="email" name="email" id="email" placeholder='email' />
                <input ref={passwordRef} type="password" name="password" id="password" placeholder='password' />
                <input type="submit" name="submit" id="submit" value={"Login"} className='btn primary' />
            </form>

            <div className="box">
                <Link className='btn link' href={"/forgot-password"}>forgot password</Link>
                <Link className='btn link' href={"/signup"}>create new account</Link>
            </div>
        </div>
    )
}

export default Login