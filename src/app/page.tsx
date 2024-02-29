"use client";
import { useEffect, useState } from 'react';
// Adjusted Home component
import React from 'react';

export default function Home() {
  const [title, setTitle] = useState('');

  const handleCreateDB = async () => {
    try {
      const response = await fetch('/api/createDB', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }), // Send title in the request body
      });
      const data = await response.json();
      console.log(data); // Handle success
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <main>
      <h1>Notion API Test</h1>
      <input
        type="text"
        placeholder="DB Title"
        value={title}
        onChange={handleTitleChange}
      />
      <button onClick={handleCreateDB}>Create DB</button>
    </main>
  );
}
