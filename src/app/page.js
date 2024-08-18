"use client";

import Link from "next/link";
import { useEffect } from "react";
import Header from "@/components/Header";
import { useDispatch } from "react-redux";
import useAuth from "@/custom-hooks/useAuth";
import { setIsLoading } from "@/store/statesSlice";

export default function Home() {
  const user = useAuth();
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, user])

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

