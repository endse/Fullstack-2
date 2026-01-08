'use client';

import { useState } from 'react';

const IncrementerPage = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(count - 1);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '24px',
          width: '280px',
          border: '1px solid #ccc',
          borderRadius: '6px',
          textAlign: 'center'
        }}
      >
        <h2 style={{ marginBottom: '12px', color: '#333' }}>
          Counter
        </h2>

        <p
          style={{
            fontSize: '28px',
            margin: '16px 0',
            color: '#000'
          }}
        >
          {count}
        </p>

        <div>
          <button
            onClick={handleDecrement}
            style={{
              color: '#333',
              padding: '8px 16px',
              marginRight: '10px',
              border: '1px solid #333',
              backgroundColor: '#fff',
              cursor: 'pointer'
            }}
          >
            Decrement
          </button>

          <button
            onClick={handleIncrement}
            style={{
              color: '#333',
              padding: '8px 16px',
              border: '1px solid #333',
              backgroundColor: '#fff',
              cursor: 'pointer'
            }}
          >
            Increment
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncrementerPage;
