"use client"
import React, { Suspense } from 'react';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

// A separate component to handle the search params and the operation that depends on them
const DatabaseCreator = () => {
  const params = useSearchParams();
  const code = params?.get('code');
  useEffect(() => {

    console.log("code", code)
  }, [])

  const createDB = async () => {
    try {
      const response = await fetch('/api/createDB', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }), // Send the code in the request body
      });
      const data = await response.json();
      console.log(data); // Handle success
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  function handleCreateDB() {
    createDB();
  }

  return (
    <>
      <div className="bg-black p-5">

        <h1 className="text-white m-2">{code}</h1>

        <button className="text-white bg-slate-600" onClick={handleCreateDB}>Create DB</button>
      </div>

    </>
  );
};

// The main component that uses Suspense to wrap the part of your component that requires it
export default function Home() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <DatabaseCreator />
      </Suspense>
    </main>
  );
}
