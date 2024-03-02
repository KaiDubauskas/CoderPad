"use client"
import React, { Suspense, useCallback } from 'react';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { TextInput } from '@mantine/core';


// A separate component to handle the search params and the operation that depends on them
const DatabaseCreator = () => {
  const params = useSearchParams();
  const pathname = usePathname()
  const router = useRouter()
  const code = params?.get('code');
  const blockId = params?.get('blockId');
  const [newCode, setNewCode] = useState<string>(code || "No code found");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      if (!params) return
      const updateParams = new URLSearchParams(params.toString())
      updateParams.set(name, value)

      return updateParams.toString()
    },
    [params]
  )

  useEffect(() => {
    setNewCode(code || "No code found");
  }, [])

  const createDB = async () => {
    try {
      const response = await fetch('/api/createDB', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: newCode }), // Send the code in the request body
      });
      const data = await response.json();

      console.log("complete: ", data); // Handle success
      console.log("new query", createQueryString("blockId", data.blockId))
      router.push(pathname + '?' + createQueryString("blockId", data.blockId))
      updateDB()
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  async function updateDB() {
    try {
      const response = await fetch('/api/updateDB', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: newCode, blockId: blockId }), // Send the code in the request body
      });
      const data = await response.json();

      console.log("success: ", data); // Handle success
      router.push(pathname + '?' + createQueryString("blockId", data.blockId))
    } catch (error) {
      console.error(error); // Handle error
    }
  }

  function handleCreateDB() {
    createDB();
  }
  function handleUpdateDB() {
    updateDB();
  }

  return (
    <>
      <div className="bg-black p-5">

        <h1 className="text-white m-2">{code}</h1>

        <TextInput onChange={(e) => setNewCode(e.currentTarget.value)} value={newCode}></TextInput>

        <button className="text-white bg-slate-600 m3" onClick={handleCreateDB}>Create DB</button>
        <button className="text-white bg-slate-600 m3" onClick={handleUpdateDB}>Create DB</button>
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
