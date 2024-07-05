"use client";

import Link from "next/link";
import Header from "@/components/Header";
import { auth } from "@/config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [user] = useAuthState(auth);

  return (
    <div>
      {user ? (
        <>
          <Header />
          <main className="container">
            <h1 className="text-center">welcom</h1>
            <p className="text-center">now i am thinking to make my owne documentation about next js</p>
          </main>
        </>
      ) : (
        <>
          <Header />
          <main className="container">
            <h1 className="text-center">hello there!</h1>
            <p className="text-center">now i am thinking to make my owne documentation about next js</p>
            <div className="full-width box center-x">
              <Link href={`/login`} className="btn primary">Login</Link>
            </div>
          </main>
        </>
      )}
    </div>
  );
}

