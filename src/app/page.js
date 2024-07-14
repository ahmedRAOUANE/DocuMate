"use client";

import Link from "next/link";
import { useEffect } from "react";
import Header from "@/components/Header";
import useAuth from "@/custom-hooks/useAuth";
import useGetData from "@/custom-hooks/useGetData";

export default function Home() {
  const user = useAuth()
  const getData = useGetData()

  useEffect(() => {
    const fetchData = () => {
      getData();
    }

    fetchData();
  }, [getData]);

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

