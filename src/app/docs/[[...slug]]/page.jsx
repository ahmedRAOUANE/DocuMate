"use client";

import { auth, db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useEffect } from "react";

const Docs = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const unsub = async () => {
            const user = auth.currentUser;

            const conceptDocRef = doc(db, "concepts", user.uid);
            const conceptDocSnap = await getDoc(conceptDocRef);

            if (conceptDocSnap.exists()) {
                setData(conceptDocSnap.data())
            }
        }

        return unsub
    }, []);

    return (
        <div className="container">
            <h2>Docs</h2>
            <div className="box column transparent paper outine ai-start">
                <Link href={`docs/concept`} className="btn link" >
                    <h2 className="">concept</h2>
                </Link>
                <div className="box jc-start">
                    <Link href={`docs/concept/sub-consept`} className="btn link" >sub concept</Link>
                    <Link href={`docs/concept/sub-concept`} className="btn link" >sub concept</Link>
                </div>
            </div>
        </div>
    );
};

export default Docs;
