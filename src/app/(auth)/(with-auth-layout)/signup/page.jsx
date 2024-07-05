"use client";

import Link from 'next/link';
import { useRef } from 'react';
import { auth } from '@/config/firebase';
import { useRouter } from 'next/navigation';
import { updateProfile } from 'firebase/auth';
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"

const Signup = () => {
    const emailRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();

    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

    const router = useRouter()

    const handleSignup = async (e) => {
        e.preventDefault();

        const userCredentials = {
            email: emailRef.current.value,
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        }

        try {
            const res = await createUserWithEmailAndPassword(userCredentials.email, userCredentials.password);
            if (res?.user) {
                await updateProfile(res.user, { displayName: userCredentials.username });
                console.log("user is logged is seccessfully: ", res.user);
            }

            router.push("/");
        } catch (err) {
            console.log("error logining ing: ", err);
        }
    }

    return (
        <div className='paper transparent outline box column full-width'>
            <h3 className='full-width text-center'>Signup</h3>

            <form onSubmit={handleSignup} className="box column full-width">
                <input ref={emailRef} type="email" name="email" id="email" placeholder='email' autoFocus />
                <input ref={usernameRef} type="text" name="username" id="username" placeholder='username' />
                <input ref={passwordRef} type="password" name="password" id="password" placeholder='password' />
                <input type="submit" name="submit" id="submit" value={"Signup"} className='btn primary' />
            </form>

            <div className="box">
                already have an account? <Link href={"/login"} className='btn'>Login</Link>
            </div>
        </div>
    )
}

export default Signup;

