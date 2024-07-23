import React from 'react';
import Link from 'next/link';
import { auth } from '@/config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Header = () => {
    const [user] = useAuthState(auth);

    const linkList = user ? ["docs", "projects"] : ["login", "signup"];

    return (
        <header className="container transparent" style={{ position: "sticky", top: "0" }}>
            <div className="box">
                <h1>DocuMate</h1>
                <ul className="box hide-in-small btn-group">
                    {linkList.map((link, idx) => (
                        <li className="btn transparent" key={idx}>
                            <Link className='icon' href={link}>{link}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    )
}

export default Header