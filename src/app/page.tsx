"use client";
import React from 'react';
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';

export default function Home() {
  const params = useSearchParams()
  const code = params?.get('code')



  const handleCreateDB = async () => {
    try {
      const response = await fetch('/api/createDB', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }), // Send title in the request body
      });
      const data = await response.json();
      console.log(data); // Handle success
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  useEffect(() => {
    if (code) {
      handleCreateDB()
    }
  }, [])




  return (
    <main>
      {code}

      <button onClick={handleCreateDB}>Create DB</button>
    </main>
  );
}
