"use client"
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// A separate component to handle the search params and the operation that depends on them
const DatabaseCreator = () => {
  const params = useSearchParams();
  const code = params?.get('code');

  const handleCreateDB = async () => {
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

  return (
    <>
      {code}
      <button onClick={handleCreateDB}>Create DB</button>
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
