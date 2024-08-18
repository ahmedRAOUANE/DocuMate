import React from 'react';
import Link from 'next/link';
import useAuth from '@/custom-hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { useDispatch } from 'react-redux';
import { setProjectsList, setSelectedProject } from '@/store/projectsSlice';

const Header = () => {
    const user = useAuth();
    const dispatch = useDispatch();

    const linkList = user ? ["docs", "projects", "logout"] : ["login", "signup"];

    const handleLogout = async () => {
        await signOut(auth).then(() => {
            dispatch(setSelectedProject(null));
            dispatch(setProjectsList([]));
            localStorage.removeItem("projectID");
        }, (res) => {
            console.log("Error Logginning Out: ", res);
        })
    }

    return (
        <header className="container transparent" style={{ position: "sticky", top: "0" }}>
            <div className="box">
                <h1>DocuMate</h1>
                <ul className="box hide-in-small btn-group">
                    {linkList.map((link, idx) => (
                        <li className="btn transparent" key={idx}>
                            {link === "logout" ? <button className='icon' onClick={handleLogout}>{link}</button> : <Link className='icon' href={link}>{link}</Link>}
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    )
}

export default Header